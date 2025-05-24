'use server';

import { prisma } from '@repo/db';
import { tutorialSchema } from '@repo/shared/validations';
import { z } from '@repo/ui';

export const createTutorial = async (values: z.infer<typeof tutorialSchema>) => {
  const { success, error, data } = await tutorialSchema.safeParseAsync(values);

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
    const slugExists = await prisma.tutorial.findUnique({
      where: {
        slug: data.slug,
      },
    });

    if (slugExists) {
      return {
        success: false,
        message: 'Slug already exists!',
      };
    }

    await prisma.tutorial.create({
      data: {
        description: data.description,
        slug: data.slug,
        title: data.title,
        categories: {
          create: data.categoryId.map((id) => {
            return { category: { connect: { id } } };
          }),
        },
      },
    });

    return {
      success: true,
      message: 'Tutorial created Successfully!',
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Failed to create tutorial',
    };
  }
};

export const updateTutorial = async (
  slug: string,
  values: z.infer<ReturnType<(typeof tutorialSchema)['partial']>>,
) => {
  const { success, error, data } = await tutorialSchema.partial().safeParseAsync(values);

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
    await prisma.tutorial.update({
      where: {
        slug,
      },
      data,
    });

    return {
      success: true,
      message: 'tutorial updated successfully!',
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Failed to update tutorial',
    };
  }
};

export const deleteTutorial = async (id: string) => {
  try {
    if (!id)
      return {
        success: false,
        message: 'id is required',
      };

    const tutExists = await prisma.tutorial.findUnique({ where: { id } });

    if (tutExists)
      return {
        success: false,
        message: 'Tutorial does not exist',
      };

    await prisma.tutorial.delete({ where: { id } });

    return {
      success: true,
      message: 'Tutorial deleted successfully!',
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Failed to delete tutorial',
    };
  }
};
