'use server';

import { prisma } from '@/lib/db';
import { jobCategorySchema } from '@/validations/jobValidation';
import { z } from 'zod';

export const handleJobCategory = async (values: z.infer<typeof jobCategorySchema>) => {
  try {
    const { data, success, error } = await jobCategorySchema.safeParseAsync(values);

    if (!success) {
      console.error(error);
      return {
        success: false,
        error: error.issues.map((issue) => ({
          path: issue.path[0],
          message: issue.message,
        })),
      };
    }

    const category = await prisma.jobCategory.upsert({
      where: {
        slug: values.slug,
      },
      update: {
        slug: data.slug,
        description: data.description,
        name: data.name,
      },
      create: {
        slug: data.slug,
        description: data.description,
        name: data.name,
      },
    });

    return {
      success: true,
      message: 'Category action performed successfully',
      data: category,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Failed to handle Job Category',
    };
  }
};
