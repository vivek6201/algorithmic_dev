'use server';

import { prisma } from '@repo/db';
import { tutorialTopicSchema } from '@repo/shared/validations';
import { z } from '@repo/ui';

export const createTopic = async (
  chapterSlug: string,
  values: z.infer<typeof tutorialTopicSchema>,
) => {
  try {
    const { success, data, error } = await tutorialTopicSchema.safeParseAsync(values);

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
      const isExists = await prisma.topic.findUnique({
        where: {
          slug: data.slug,
        },
      });

      if (isExists)
        return {
          success: false,
          message: 'topic with this slug already exists.',
        };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: 'Failed to check topic',
      };
    }

    const topic = await prisma.$transaction(async (tx) => {
      const chapter = await tx.chapter.findUnique({
        where: {
          slug: chapterSlug,
        },
      });

      if (!chapter) {
        return null;
      }

      const newTopic = await tx.topic.create({
        data: {
          chapterId: chapter.id,
          content: data.content,
          order: data.order,
          slug: data.slug,
          title: data.title,
        },
      });

      return newTopic;
    });

    if (topic) {
      return {
        success: success,
        message: 'Topic created successfully!',
      };
    } else {
      return {
        success: false,
        message: 'Failed to create new topic',
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

export const updateTopic = async (
  topicSlug: string,
  values: z.infer<typeof tutorialTopicSchema>,
) => {
  try {
    if (!topicSlug) {
      return {
        success: false,
        message: 'Topic Slug is required for updating.',
      };
    }

    const existingTopic = await prisma.topic.findUnique({
      where: { slug: topicSlug },
    });

    if (!existingTopic) {
      return {
        success: false,
        message: 'Topic not found.',
      };
    }

    await prisma.topic.update({
      where: { slug: topicSlug },
      data: {
        order: values.order,
        slug: values.slug,
        content: values.content,
        title: values.title,
      },
    });

    return {
      success: true,
      message: 'Topic Updated Successfully!',
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Failed to update topic!',
    };
  }
};
