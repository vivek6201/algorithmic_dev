import { Chapter, Topic, Tutorial, TutorialCategory } from '@/generated/prisma';
import cache from '@/lib/cache';
import { prisma } from '@/lib/db';

export const getClientTutorialsCategories = async () => {
  try {
    let data = await cache.get<TutorialCategory[]>('client-tutorial-categories', []);
    if (!data) {
      data = await prisma.tutorialCategory.findMany({
        where: { published: true },
      });
      cache.set('client-tutorial-categories', [], data);
    }
    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Error getting data' };
  }
};

type ChapterWithTopic = Chapter & {
  topics: Topic[];
};

export const getClientTutorialChapters = async (tutorialSlug: string) => {
  try {
    let data = await cache.get<ChapterWithTopic[]>('client-tutorial-chapters', [tutorialSlug]);

    if (!data) {
      data = await prisma.chapter.findMany({
        where: {
          tutorial: {
            slug: tutorialSlug,
          },
        },
        include: {
          topics: {
            orderBy: {
              order: 'asc',
            },
          },
        },
        orderBy: {
          order: 'asc',
        },
      });

      cache.set('client-tutorial-chapters', [tutorialSlug], data);
    }

    return { success: true, data };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Failed to fetch data',
    };
  }
};

type TutorialWithChapters = Tutorial & {
  chapters: (Chapter & {
    topics: Topic[];
  })[];
};

export const getClientTutorialBySlug = async (slug: string) => {
  try {
    let data = await cache.get<TutorialWithChapters>('tutorial-with-chapters', [slug]);

    if (!data) {
      data = await prisma.tutorial.findUnique({
        where: { slug, published: true },
        include: {
          chapters: {
            include: {
              topics: {
                orderBy: {
                  order: 'asc',
                },
              },
            },
          },
        },
      });

      if (data) {
        cache.set('tutorial-with-chapters', [slug], data);
      }
    }

    return { success: true, data };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Failed to fetch data',
    };
  }
};

type CurrentTopicType = Topic & {
  chapter: Chapter & {
    tutorial: Tutorial;
  };
};

export const getClientTutorialTopicBySlug = async (slug: string) => {
  try {
    // Fetch the current topic
    let currentTopic = await cache.get<CurrentTopicType>('client-topic-by-slug', [slug]);
    if (!currentTopic === undefined) {
      currentTopic = await prisma.topic.findUnique({
        where: { slug, published: true },
        include: {
          chapter: {
            include: {
              tutorial: true, // Include tutorial info for chapter navigation
            },
          },
        },
      });

      if (currentTopic) cache.set('client-topic-by-slug', [slug], currentTopic);
    }

    if (!currentTopic) {
      return {
        success: false,
        message: 'Topic not found',
      };
    }

    const { chapter } = currentTopic;

    // Find the next topic in the same chapter
    let nextTopic = await cache.get<Topic | null>('client-topic-next', [slug]);

    if (!nextTopic === undefined) {
      nextTopic = await prisma.topic.findFirst({
        where: {
          chapterId: chapter.id,
          order: {
            gt: currentTopic.order, // Find the topic with order greater than the current one
          },
        },
        orderBy: {
          order: 'asc', // Sort ascending by order
        },
      });

      cache.set('client-topic-next', [slug], nextTopic ?? null);
    }

    // If no next topic in the current chapter, move to the next chapter's first topic
    if (!nextTopic) {
      const nextChapter = await prisma.chapter.findFirst({
        where: {
          tutorialId: chapter.tutorialId,
          order: {
            gt: chapter.order, // Find the chapter after the current one
          },
        },
        orderBy: {
          order: 'asc', // Ascending order to get the next chapter
        },
        include: {
          topics: {
            orderBy: {
              order: 'asc', // Get the first topic in the next chapter
            },
            take: 1, // Only take the first topic
          },
        },
      });

      nextTopic = nextChapter?.topics[0] || null;
      cache.set('client-topic-next', [slug], nextTopic ?? null);
    }

    // Find the previous topic in the same chapter
    let prevTopic = await cache.get<Topic | null>('client-topic-prev', [slug]);

    if (!prevTopic === undefined) {
      prevTopic = await prisma.topic.findFirst({
        where: {
          chapterId: chapter.id,
          order: {
            lt: currentTopic.order, // Find the topic with order less than the current one
          },
        },
        orderBy: {
          order: 'desc', // Sort descending to get the previous topic
        },
      });

      cache.set('client-topic-prev', [slug], prevTopic ?? null);
    }

    // If no previous topic in the current chapter, move to the previous chapter's last topic
    if (!prevTopic) {
      const prevChapter = await prisma.chapter.findFirst({
        where: {
          tutorialId: chapter.tutorialId,
          order: {
            lt: chapter.order, // Find the previous chapter
          },
        },
        orderBy: {
          order: 'desc', // Sort descending to get the previous chapter
        },
        include: {
          topics: {
            orderBy: {
              order: 'desc', // Get the last topic in the previous chapter
            },
            take: 1, // Only take the last topic
          },
        },
      });

      prevTopic = prevChapter?.topics[0] || null;
      cache.set('client-topic-prev', [slug], prevTopic ?? null);
    }

    return {
      success: true,
      data: currentTopic,
      nextTopic: nextTopic || null, // Return null if there's no next topic
      prevTopic: prevTopic || null, // Return null if there's no previous topic
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Failed to fetch data',
    };
  }
};
