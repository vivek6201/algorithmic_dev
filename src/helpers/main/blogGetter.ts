import { prisma } from "@/lib/db";

export const getClientBlogsCategories = async () => {
  try {
    const data = await prisma.blogCategory.findMany({
      where: { published: true },
    });
    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error getting data" };
  }
};

export const getClientBlogBySlug = async (slug: string) => {
  try {
    const data = await prisma.blog.findUnique({
      where: {
        slug: slug,
      },
      include: {
        category: true,
        reactions: true,
      },
    });

    let relatedPosts = await prisma.blog.findMany({
      where: {
        category: {
          slug: data?.category.slug,
        },
      },  
    });

    relatedPosts = relatedPosts.filter(item => item.id != data?.id)

    return { success: true, data, relatedPosts };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to fetch data",
    };
  }
};
