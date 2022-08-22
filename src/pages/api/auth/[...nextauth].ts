import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { prisma } from "../../../services/prisma";

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const { email, name } = user;
      try {
        const userFind = await prisma.user.findFirst({
          where: { email: email! },
        });

        if (!userFind) {
          await prisma.user.create({
            data: {
              email: email!,
              name: name!,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});
