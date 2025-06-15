'use server';

import { prisma } from '@repo/db';
import { hashPass } from '@/lib/utils';
import { signupValidation } from '@repo/shared/validations';
import { z } from '@repo/ui';
import { v4 as uuidv4 } from 'uuid';
import { addHours } from '@repo/ui';
import { sendEmail } from '@repo/shared/utils';
import { VerifyEmail } from '@repo/shared/email-templates';

const signupAction = async (data: z.infer<typeof signupValidation>) => {
  try {
    let user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (user) {
      return {
        success: false,
        message: 'User already exists',
      };
    }

    user = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashPass(data.password),
        role: data.role,
        profile: {
          create: {
            bio: '',
            dateOfBirth: new Date(),
            image: '',
          },
        },
      },
    });

    const token = uuidv4();
    const expires = addHours(new Date(), 24);

    //delete prev token if exists
    await prisma.$transaction(async (tx) => {
      await tx.verificationToken.deleteMany({
        where: {
          userId: user.id,
        },
      });

      await tx.verificationToken.create({
        data: {
          identifier: user.email,
          token,
          expires,
          userId: user.id,
        },
      });
    });

    await sendEmail({
      Template: VerifyEmail,
      props: {
        name: user.name ?? '',
        email: user.email,
        token,
      },
      subject: 'Verify your email',
      to: user.email,
    });

    return {
      success: true,
      message: 'User created successfully!',
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        role: user.role,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Internal Server Error',
    };
  }
};

export default signupAction;
