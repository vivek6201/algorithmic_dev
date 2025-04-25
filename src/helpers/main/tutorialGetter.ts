import { prisma } from "@/lib/db";

export const getClientTutorialsCategories = async () => {
  try {
    const data = await prisma.tutorialCategory.findMany({
      where: { published: true },
    });
    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error getting data" };
  }
};

export const getClientTutorialChapters = async (tutorialSlug: string) => {
  try {
    const data = await prisma.chapter.findMany({
      where: {
        tutorial: {
          slug: tutorialSlug,
        },
      },
      include: {
        topics: true,
      },
    });

    return { success: true, data };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to fetch data",
    };
  }
};

export const getClientTutorialBySlug = async (slug: string) => {
  try {
    const data = await prisma.tutorial.findUnique({
      where: { slug },
      include: {
        chapters: {
          include: {
            topics: {
              orderBy: {
                order: "asc",
              },
            },
          },
        },
      },
    });

    return { success: true, data };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to fetch data",
    };
  }
};

export const getClientTutorialTopicBySlug = async (slug: string) => {
  try {
    // Fetch the current topic
    const currentTopic = await prisma.topic.findUnique({
      where: { slug },
      include: {
        chapter: {
          include: {
            tutorial: true, // Include tutorial info for chapter navigation
          },
        },
      },
    });

    if (!currentTopic) {
      return {
        success: false,
        message: "Topic not found",
      };
    }

    const { chapter } = currentTopic;

    // Find the next topic in the same chapter
    let nextTopic = await prisma.topic.findFirst({
      where: {
        chapterId: chapter.id,
        order: {
          gt: currentTopic.order, // Find the topic with order greater than the current one
        },
      },
      orderBy: {
        order: "asc", // Sort ascending by order
      },
    });

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
          order: "asc", // Ascending order to get the next chapter
        },
        include: {
          topics: {
            orderBy: {
              order: "asc", // Get the first topic in the next chapter
            },
            take: 1, // Only take the first topic
          },
        },
      });

      nextTopic = nextChapter?.topics[0] || null;
    }

    // Find the previous topic in the same chapter
    let prevTopic = await prisma.topic.findFirst({
      where: {
        chapterId: chapter.id,
        order: {
          lt: currentTopic.order, // Find the topic with order less than the current one
        },
      },
      orderBy: {
        order: "desc", // Sort descending to get the previous topic
      },
    });

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
          order: "desc", // Sort descending to get the previous chapter
        },
        include: {
          topics: {
            orderBy: {
              order: "desc", // Get the last topic in the previous chapter
            },
            take: 1, // Only take the last topic
          },
        },
      });

      prevTopic = prevChapter?.topics[0] || null;
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
      message: "Failed to fetch data",
    };
  }
};
