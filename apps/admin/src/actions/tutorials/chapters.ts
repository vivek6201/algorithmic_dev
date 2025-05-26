'use server';

import { Prisma } from '@repo/db';
import { prisma } from '@repo/db';
import { tutorialChapterSchema } from '@repo/shared/validations';
import { z } from '@repo/ui';

export const createChapter = async (
  tutorialSlug: string,
  values: z.infer<typeof tutorialChapterSchema>,
) => {
  const { success, data, error } = await tutorialChapterSchema.safeParseAsync(values);

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
    const isExists = await prisma.chapter.findUnique({
      where: {
        slug: data.slug,
      },
    });

    if (isExists)
      return {
        success: false,
        message: 'Chapter with this slug already exists.',
      };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Failed to check chapter',
    };
  }

  try {
    const chapter = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const tutorial = await tx.tutorial.findUnique({
        where: {
          slug: tutorialSlug,
        },
      });

      if (!tutorial) {
        return null;
      }

      const newChapter = await tx.chapter.create({
        data: {
          tutorialId: tutorial.id,
          slug: data.slug,
          title: data.title,
          description: data.description,
          order: data.order,
        },
      });

      return newChapter;
    });

    if (chapter) {
      return {
        success: false,
        message: 'Chapter created successfully!',
      };
    } else {
      return {
        success: false,
        message: 'Failed to create new chapter',
      };
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Internal server error',
    };
  }
};

export const deleteTutorialChapter = async (id: string) => {
  try {
    await prisma.chapter.delete({
      where: {
        id,
      },
    });

    return {
      success: true,
      message: 'Chapter deleted successfully!',
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Failed to delete chapter',
    };
  }
};
