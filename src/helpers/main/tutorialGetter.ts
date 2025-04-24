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
    const data = await prisma.topic.findUnique({
      where: {
        slug,
      },
    });

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to fetch data",
    };
  }
};
