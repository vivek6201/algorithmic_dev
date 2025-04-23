import NextAuth from "next-auth";
import { prisma } from "./db";
import Credentials from "next-auth/providers/credentials";
import { loginValidation } from "@/validations/auth";
import bcrypt from "bcryptjs";
import crypto from "crypto";

declare module "next-auth" {
  interface User {
    role?: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { success, data } = await loginValidation.safeParseAsync(
          credentials
        );

        if (!success) return null;

        const user = await prisma.user.findUnique({
          where: { email: data.email },
        });

        if (!user) throw new Error("User not found!");

        const matchPass =
          user.password && (await bcrypt.compare(data.password, user.password));

        if (!matchPass) throw new Error("Invalid credentials.");

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  events: {
    async signIn({ user }) {
      // 🔥 Manually create a session in the database
      if (!user.id) {
        throw new Error("User ID is undefined.");
      }

      await prisma.session.create({
        data: {
          userId: user.id,
          sessionToken: crypto.randomUUID(),
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        },
      });
    },
    async signOut(data) {
      // Extract userId from token or session safely
      const userId = "token" in data ? data.token?.id : data.session?.userId;

      if (userId) {
        // Delete session from database if it exists
        await prisma.session.deleteMany({
          where: { userId },
        });
      }
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  debug: true,
});
