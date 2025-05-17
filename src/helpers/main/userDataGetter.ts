import { prisma } from '@/lib/db';

export const getUserData = async (email: string) => {
  try {
    const data = await prisma.user.findUnique({
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

    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Internal Server error' };
  }
};

export type UserDataResponseType = Awaited<ReturnType<typeof getUserData>>;
export type UserDataType = Awaited<ReturnType<typeof getUserData>>['data'];
