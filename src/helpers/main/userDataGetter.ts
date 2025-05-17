import { Prisma } from '@/generated/prisma';
import cache from '@/lib/cache';
import { prisma } from '@/lib/db';

type UserWithProfile = Prisma.UserGetPayload<{
  include: {
    profile: {
      include: {
        address: true;
        educationDetails: true;
        experienceDetails: true;
        projects: true;
      };
    };
  };
}>;

export const getUserData = async (email: string) => {
  try {
    let data = await cache.get<UserWithProfile>('user-data', [email]);

    if (!data) {
      data = await prisma.user.findUnique({
        where: { email },
        include: {
          profile: {
            include: {
              address: true,
              educationDetails: true,
              experienceDetails: true,
              projects: true,
            },
          },
        },
      });

      cache.set('user-email', [email], data);
    }

    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Internal Server error' };
  }
};

export type UserDataResponseType = Awaited<ReturnType<typeof getUserData>>;
export type UserDataType = Awaited<ReturnType<typeof getUserData>>['data'];
