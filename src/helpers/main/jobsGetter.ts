import { JobCategory, Jobs } from '@/generated/prisma';
import cache from '@/lib/cache';
import { prisma } from '@/lib/db';

export const getClientJobBySlug = async (slug: string) => {
  try {
    const decodedSlug = decodeURIComponent(slug);

    let data = await cache.get<Jobs>('client-job-by-slug', [decodedSlug]);

    if (!data) {
      data = await prisma.jobs.findUnique({
        where: { slug: decodedSlug, published: true },
      });

      cache.set('client-job-by-slug', [decodedSlug], data);
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
