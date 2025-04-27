import { prisma } from "@/lib/db";

export const getBlogBySlug = async (slug: string) => {
  try {
    if (!slug) return { success: false, message: "Slug is required" };
    const blog = await prisma.blog.findUnique({
      where: {
        slug,
      },
    });

    return { success: true, blog };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Internal server error" };
  }
};

export const getTutorialChaptersWithTopics = async (slug: string) => {
  if (!slug) {
    return {
      success: false,
      message: "Slug is Required!",
    };
  }
  try {
    const data = await prisma.tutorial.findUnique({
      where: {
        slug,
      },
      select: {
        chapters: {
          include: {
            _count: true,
            topics: {
              orderBy: {
                order: "asc",
              },
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    if (!data) {
      return {
        success: false,
        message: "Chapters not found!",
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Internal server error" };
  }
};

export const getJobBySlug = async (slug: string) => {
  try {
    const decodedSlug = decodeURIComponent(slug);
    const data = await prisma.jobs.findUnique({
      where: { slug: decodedSlug },
      include: {
        jobCategories: true,
      },
    });
    return { success: true, data };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to find data ",
    };
  }
};
