'use server';
import { prisma } from '@repo/db';
import { resetPassValidation } from '@repo/shared/validations';
import { z } from '@repo/ui';
import bcrypt from 'bcryptjs';

export const resetPass = async (email: string, values: z.infer<typeof resetPassValidation>) => {
  const { data, success, error } = await resetPassValidation.safeParseAsync(values);

  if (!success) {
    return {
      success: false,
      error: error.issues.map((issue) => ({
        path: issue.path[0],
        message: issue.message,
      })),
    };
  }

  const admin = await prisma.admin.findUnique({
    where: {
      email,
    },
  });

  if (!admin) {
    return {
      success: false,
      message: 'Admin not found!',
    };
  }

  const isValidPass = await bcrypt.compare(data.oldPassword, admin.password);

  if (!isValidPass) {
    return {
      success: false,
      message: 'Invalid password!',
    };
  }

  const hashPass = await bcrypt.hash(data.newPassword, 10);

  try {
    await prisma.admin.update({
      where: {
        email,
      },
      data: {
        password: hashPass,
      },
    });

    return {
      success: true,
      message: 'Password updated successfully!',
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Internal server error',
    };
  }
};
