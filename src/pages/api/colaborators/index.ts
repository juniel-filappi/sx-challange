import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "../../../services/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getSession({ req });
    const user = await prisma.user.findFirst({
      where: { email: session?.user?.email! },
    });

    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const companies = await prisma.colaborator.findMany({
      where: {
        userId: user?.id,
      },
      include: {
        company: true,
      },
    });

    return res.json(companies);
  } catch (err) {
    console.log(err)
    await prisma.$disconnect();

    return res.status(500).json(err);
  }
}
