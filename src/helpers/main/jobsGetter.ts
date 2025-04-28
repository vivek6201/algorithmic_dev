import { prisma } from "@/lib/db";

export const getClientJobBySlug = async (slug: string) => {
  try {
    const decodedSlug = decodeURIComponent(slug);
    const data = await prisma.jobs.findUnique({
      where: { slug: decodedSlug, published: true },
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

export const getClientJobCategories = async () => {
  try {
    const data = await prisma.jobCategory.findMany({});
    return { success: true, data };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to find data ",
    };
  }
};
