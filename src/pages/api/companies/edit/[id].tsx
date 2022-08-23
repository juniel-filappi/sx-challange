import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "../../../../services/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  const user = await prisma.user.findFirst({
    where: { email: session?.user?.email! },
  });

  const { id } = req.query;

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.method === "PUT") {
    try {
      await prisma.company.update({
        where: {
          id: Number(id),
        },
        data: {
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          address: req.body.address,
          cnpj: req.body.cnpj,
          code: req.body.code,
        },
      });

      return res.status(200).json({ message: "Company updated successfully" });
    } catch (err) {
      await prisma.$disconnect();
      return res.status(500).json(err);
    }
  }

  if (req.method === "GET") {
    try {
      const company = await prisma.company.findFirst({
        where: {
          id: Number(id),
          userId: user.id,
        },
        include: {
          colaborators: true
        },
      });
      return res.status(200).json(company);
    } catch (err) {
      await prisma.$disconnect();
      return res.status(500).json(err);
    }
  }
}
