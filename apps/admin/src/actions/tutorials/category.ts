'use server';

import { prisma } from '@repo/db';
import { tutorialCategorySchema } from '@repo/shared/validations';
import { z } from '@repo/ui';

const createTutorialCategory = async (values: z.infer<typeof tutorialCategorySchema>) => {
  const { success, data, error } = await tutorialCategorySchema.safeParseAsync(values);

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
    const slugExists = await prisma.tutorialCategory.findUnique({
      where: { slug: values.slug },
    });

    if (slugExists) {
      return {
        success: false,
        message: 'Slug Already exists',
      };
    }

    const newCategory = await prisma.tutorialCategory.create({
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

export default createTutorialCategory;

export const editTutorialCategory = async (
  values: z.infer<ReturnType<(typeof tutorialCategorySchema)['partial']>>,
  id: string,
) => {
  const { success, error } = await tutorialCategorySchema.partial().safeParseAsync(values);

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
    let category = await prisma.tutorialCategory.findUnique({
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

    category = await prisma.$transaction(async (tx) => {
      const checkNewSlug = await tx.tutorialCategory.findUnique({
        where: {
          slug: values.slug,
        },
      });

      if (checkNewSlug) throw new Error('New slug already exists!');

      const updatedCategory = await tx.tutorialCategory.update({
        where: { id },
        data: {
          ...values,
        },
      });

      return updatedCategory;
    });

    return {
      success: true,
      message: 'Category updated successfully!',
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Error while editing category!',
    };
  }
};

export const deleteTutorialCategory = async (id: string) => {
  try {
    await prisma.tutorialCategory.delete({
      where: {
        id,
      },
    });

    return {
      success: true,
      message: 'Category Deleted Successfully',
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Failed to delete category!',
    };
  }
};
