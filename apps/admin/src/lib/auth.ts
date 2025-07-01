import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { prisma } from '@repo/db';
import { loginValidation } from '@repo/shared/validations';

declare module 'next-auth' {
  interface User {
    role?: string;
  }
}

const isProd = process.env.NODE_ENV === 'production';

export const nextAuthResult = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { success, data } = await loginValidation.safeParseAsync(credentials);

        if (!success) return null;

        const user = await prisma.admin.findUnique({
          where: { email: data.email },
        });

        if (!user) throw new Error('User not found!');

        const matchPass = user.password && (await bcrypt.compare(data.password, user.password));

        if (!matchPass) throw new Error('Invalid credentials.');

        return user;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 5 * 60,
    updateAge: 2 * 60,
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
  pages: {
    signIn: '/',
    error: '/',
  },
  cookies: {
    sessionToken: {
      name: 'next-auth.admin-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: isProd,
        ...(isProd ? { domain: 'admin.algorithmicdev.in' } : {}),
      },
    },
  },
  debug: !isProd, // Enable debug mode in dev
});

export const { handlers, auth } = nextAuthResult;
