'use server';

import { prisma } from '@/lib/db';
// import { ProfileFormType } from '@/types/main';
import personalValidation from '@/validations/profile/personal';
import { z } from 'zod';

export const updatePersonalInfo = async (
  id: string,
  values: z.infer<typeof personalValidation>,
) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return {
        success: false,
        message: 'Invalid Id!',
      };
    }

    const { data, success, error } = await personalValidation.partial().safeParseAsync(values);

    if (!success) {
      return {
        success: false,
        error: error.issues.map((issue) => {
          return {
            path: issue.path[0],
            message: issue.message,
          };
        }),
      };
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: data.name,
        profile: {
          update: {
            bio: data.bio,
            dateOfBirth: data.dob,
            personType: data.personType,
            phoneNumber: data.phoneNo,
          },
        },
      },
    });
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Internal server error',
    };
  }
};

// export const updateProfile = async (id: string, formType: ProfileFormType) => {
//   try {
//     const profile = await prisma.profile.findUnique({
//       where: {
//         userId: id,
//       },
//     });

//     // const profile = await prisma.profile.upsert({
//     //   where: {
//     //     userId: user.id,
//     //   },
//     //   create: {

//     //   },
//     // });
//   } catch (error) {
//     console.error(error);
//     return {
//       success: false,
//       message: 'Internal server error',
//     };
//   }
// };
