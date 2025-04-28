'use server';

import { prisma } from '@/lib/db';
import { blogCategorySchema } from '@/validations/blogValidations';
import { z } from 'zod';

const createCategory = async (values: z.infer<typeof blogCategorySchema>) => {
  const { success, data, error } = await blogCategorySchema.safeParseAsync(values);

  if (!success) {
    return {
      success,
      error: error.issues.map((issue) => {
        return {
          path: issue.path[0],
          message: issue.message,
        };
      }),
    };
  }

  try {
    const slugExists = await prisma.blogCategory.findUnique({
      where: { slug: values.slug },
    });

    if (slugExists) {
      return {
        success: false,
        message: 'Slug Already exists',
      };
    }

    const newCategory = await prisma.blogCategory.create({
      data: {
        name: data.name,
        slug: data.slug,
      },
    });

    return { success, newCategory };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Failed to create category!',
    };
  }
};

export default createCategory;

export const editCategory = async (
  id: string,
  values: z.infer<ReturnType<(typeof blogCategorySchema)['partial']>>,
) => {
  const { success, error } = await blogCategorySchema.partial().safeParseAsync(values);

  if (!success) {
    return {
      success,
      error: error.issues.map((issue) => {
        return {
          path: issue.path[0],
          message: issue.message,
        };
      }),
    };
  }

  try {
    let category = await prisma.blogCategory.findUnique({
      where: {
        id,
      },
    });

    if (!category) {
      return {
        success: false,
        message: 'Invalid Category Id',
      };
    }

    category = await prisma.blogCategory.update({
      where: { id },
      data: {
        ...values,
      },
    });
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Error while editing category!',
    };
  }
};
