import { Blog, Chapter, JobCategory, Jobs, Topic } from '@repo/db';
import cache from '@repo/shared/cache';
import { prisma } from '@repo/db';

export const getBlogBySlug = async (slug: string) => {
  try {
    if (!slug) return { success: false, message: 'Slug is required' };

    const decodedSlug = decodeURIComponent(slug);

    let blog = await cache.get<Blog>('admin-blog', [decodedSlug]);

    if (!blog) {
      blog = await prisma.blog.findUnique({
        where: {
          slug: decodedSlug,
        },
      });

      if (blog) cache.set('admin-blog', [decodedSlug], blog, 10);
    }

    return { success: true, blog };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Internal server error' };
  }
};

// TUTORIAL FUNCTION
type TopicWithOrder = Topic;
type ChapterWithTopics = Chapter & {
  topics: TopicWithOrder[];
  _count: {
    topics: number;
  };
};

export const getTutorialChaptersWithTopics = async (
  slug: string,
): Promise<{
  success: boolean;
  data?: {
    chapters: ChapterWithTopics[];
  } | null;
  message?: string;
}> => {
  if (!slug) {
    return {
      success: false,
      message: 'Slug is Required!',
    };
  }

  try {
    let data = await cache.get<{
      chapters: ChapterWithTopics[];
    }>('admin-tutorial-chapters-with-topics', [slug]);

    if (!data) {
      data = await prisma.tutorial.findUnique({
        where: {
          slug,
        },
        select: {
          chapters: {
            include: {
              _count: true,
              topics: {
                orderBy: {
                  order: 'asc',
                },
              },
            },
            orderBy: {
              createdAt: 'asc',
            },
          },
        },
      });

      if (data) cache.set('admin-tutorial-chapters-with-topics', [slug], data, 10);
    }

    if (!data) {
      return {
        success: false,
        message: 'Chapters not found!',
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Internal server error' };
  }
};

type JobWithCategories = Jobs & {
  jobCategories: JobCategory[];
};

export const getJobBySlug = async (
  slug: string,
): Promise<{
  success: boolean;
  data?: JobWithCategories | null;
  message?: string;
}> => {
  try {
    const decodedSlug = decodeURIComponent(slug);

    let data = await cache.get<JobWithCategories>('admin-job', [decodedSlug]);

    if (!data) {
      data = await prisma.jobs.findUnique({
        where: { slug: decodedSlug },
        include: {
          jobCategories: true,
        },
      });

      if (data) cache.set('admin-job', [decodedSlug], data, 10);
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
