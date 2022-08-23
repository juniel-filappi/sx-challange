import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "../../../../services/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    try {
      const session = await getSession({ req });
      const { id } = req.query;
      const user = await prisma.user.findFirst({
        where: { email: session?.user?.email! },
      });

      if (!user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const company = await prisma.company.findFirst({
        where: { id: Number(id) },
        include: {
          colaborators: true,
        },
      });

      if (company?.colaborators && company.colaborators.length > 0) {
        return res.status(400).json({
          message: "Não é possível excluir uma empresa com colaboradores",
        });
      }

      await prisma.company.delete({
        where: {
          id: Number(id),
        },
      });

      return res.status(200).json({ message: "Company deleted successfully" });
    } catch (err) {
      await prisma.$disconnect();
      return res.status(500).json(err);
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
