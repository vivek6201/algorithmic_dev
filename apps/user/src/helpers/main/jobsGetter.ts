import { JobCategory, Jobs, Prisma } from '@repo/db';
import cache from '@repo/shared/cache';
import { prisma } from '@repo/db';
import { JobWithCategories } from '@/types/main';

export const getClientJobBySlug = async (slug: string) => {
  try {
    const decodedSlug = decodeURIComponent(slug);

    let data = await cache.get<JobWithCategories>('client-job-by-slug', [decodedSlug]);
    let relatedPosts = await cache.get<Jobs[]>('client-related-job-posts', [decodedSlug]);

    if (!data) {
      data = await prisma.jobs.findUnique({
        where: { slug: decodedSlug, published: true },
        include: {
          jobCategories: true,
        },
      });

      const categoryIds = data?.jobCategories?.map((cat) => cat.id);

      relatedPosts = await prisma.jobs.findMany({
        where: {
          id: { not: data?.id },
          published: true,
          jobCategories: {
            some: {
              id: { in: categoryIds },
            },
          },
        },
        orderBy: {
          createdAt: 'desc', // Sort by latest
        },
        take: 5,
      });

      cache.set('client-job-by-slug', [decodedSlug], data);
      cache.set('client-related-job-posts', [decodedSlug], relatedPosts);
    }

    return { success: true, data, relatedPosts };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Failed to find data ',
    };
  }
};

export const getClientJobCategories = async () => {
  try {
    let data = await cache.get<JobCategory[]>('client-job-category', []);

    if (!data) {
      data = await prisma.jobCategory.findMany({});
      cache.set('client-job-category', [], data);
    }

    return { success: true, data };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Failed to find data ',
    };
  }
};
