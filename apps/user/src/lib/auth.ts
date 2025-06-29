import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import bcrypt from 'bcryptjs';
import GitHub from 'next-auth/providers/github';
import { prisma } from '@repo/db';
import { loginValidation } from '@repo/shared/validations';

declare module 'next-auth' {
  interface User {
    role?: string;
    profileId: string;
  }
}

export const runtime = 'nodejs';

const isProd = process.env.NODE_ENV === 'production';

export const nextAuthResult = NextAuth({
  providers: [
    GitHub,
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { success, data } = await loginValidation.safeParseAsync(credentials);

        if (!success) return null;

        const user = await prisma.user.findUnique({
          where: { email: data.email },
          include: {
            profile: {
              select: {
                id: true,
              },
            },
          },
        });

        if (!user) throw new Error('User not found!');

        if (!user.emailVerified) {
          throw new Error('Please verify your email before logging in.');
        }

        const matchPass = user.password && (await bcrypt.compare(data.password, user.password));

        if (!matchPass) throw new Error('Invalid credentials.');

        return {
          ...user,
          profileId: user.profile?.id || '',
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.profileId = user.profileId;
      }
      // Handle Google sign-in
      if (account && (account?.provider === 'google' || account?.provider === 'github')) {
        // Check if user exists, if not, create new user
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email ?? '' },
          include: {
            profile: {
              select: {
                id: true,
              },
            },
          },
        });

        if (!existingUser) {
          // Create new user if they don't exist
          const newUser = await prisma.user.create({
            data: {
              email: user?.email ?? '',
              name: user?.name ?? '',
              image: user?.image ?? '',
              emailVerified: new Date(),
              role: 'User',
              profile: {
                create: {
                  bio: '',
                  dateOfBirth: new Date(),
                  image: user.image ?? '',
                },
              },
            },
            include: {
              profile: {
                select: {
                  id: true,
                },
              },
            },
          });
          token.id = newUser.id;
          token.role = newUser.role;
          token.profileId = newUser.profile?.id;
        } else {
          // Existing user
          token.id = existingUser.id;
          token.role = existingUser.role;
          token.profileId = existingUser.profile?.id;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.profileId = token.profileId as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login', // Custom sign-in page if needed
    error: '/login', // Error handling page
  },
  cookies: {
    sessionToken: {
      name: 'next-auth.user-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: isProd,
        ...(isProd ? { domain: 'algorithmicdev.in' } : {}),
      },
    },
  },
  debug: !isProd,
});
