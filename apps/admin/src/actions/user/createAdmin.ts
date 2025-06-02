'use server';

import { prisma } from '@repo/db';
import { adminValidation } from '@repo/shared/validations';
import { z } from '@repo/ui';
import bcrypt from 'bcryptjs';

export const createAdmin = async (values: z.infer<typeof adminValidation>) => {
  try {
    const { success, data, error } = await adminValidation.safeParseAsync(values);

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
        email: data.email,
      },
    });

    if (admin) {
      return {
        success: false,
        message: 'Admin with this email already exists!',
      };
    }

    const hashPass = await bcrypt.hash(data.password, 10);

    await prisma.admin.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashPass,
        role: data.role,
      },
    });

    return {
      success: true,
      message: 'Admin created Successfully!',
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'internal Server Error',
    };
  }
};
