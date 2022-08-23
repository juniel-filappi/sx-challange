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
      const findCompany = await prisma.colaborator.findFirst({
        where: {
          id: Number(id),
          userId: user?.id!,
        },
      });

      if (!findCompany) {
        return res.status(404).json({ message: "Company not found" });
      }

      await prisma.colaborator.update({
        where: {
          id: Number(id),
        },
        data: {
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          address: req.body.address,
          cpf: req.body.cpf,
          code: req.body.code,
          updatedAt: new Date(),
          company: {
            connect: {
              id: req.body.companyId,
            },
          },
          user: {
            connect: {
              id: user.id!,
            },
          },
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
      const company = await prisma.colaborator.findFirst({
        where: {
          id: Number(id),
          userId: user.id,
        },
        include: {
          company: true,
        },
      });
      return res.status(200).json(company);
    } catch (err) {
      console.log(err);
      await prisma.$disconnect();
      return res.status(500).json(err);
    }
  }
}
