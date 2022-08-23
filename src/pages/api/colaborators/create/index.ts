import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "../../../../services/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const session = await getSession({ req });
      const user = await prisma.user.findFirst({
        where: { email: session?.user?.email! },
      });

      if (!user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const company = await prisma.colaborator.create({
        data: {
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          address: req.body.address,
          cpf: req.body.cpf,
          code: req.body.code,
          createdAt: new Date(),
          updatedAt: new Date(),
          user: { connect: { id: user.id } },
          company: { connect: { id: req.body.companyId } },
        },
      });

      return res.json(company);
    } catch (err) {
      await prisma.$disconnect();
      return res.status(500).json(err);
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
