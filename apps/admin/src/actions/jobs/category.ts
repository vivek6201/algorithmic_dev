'use server';

import { prisma } from '@repo/db';
import { jobCategorySchema } from '@repo/shared/validations';
import { z } from '@repo/ui';

export const handleJobCategory = async (
  values: z.infer<typeof jobCategorySchema>,
  categoryId?: string,
) => {
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
        id: categoryId ?? '-1',
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

export const deleteJobCategory = async (id: string) => {
  try {
    await prisma.jobCategory.delete({
      where: {
        id,
      },
    });

    return {
      success: true,
      message: 'Job Category Deleted Successfully!',
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Error while deleting job category!',
    };
  }
};
