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

      await prisma.colaborator.delete({
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
