import { BlogWithCategoryAndReactions } from '@/types/main';
import { BlogCategory, prisma } from '@repo/db';
import cache from '@repo/shared/cache';

export const getClientBlogsCategories = async () => {
  try {
    let data = await cache.get<BlogCategory[]>('client-blogs-categories', []);

    if (!data) {
      data = await prisma.blogCategory.findMany({
        where: { published: true },
      });
      cache.set<BlogCategory[]>('client-blogs-categories', [], data);
    }

    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Error getting data' };
  }
};

export const getClientBlogBySlug = async (slug: string) => {
  try {
    const decodedSlug = decodeURIComponent(slug);
    let data = await cache.get<BlogWithCategoryAndReactions>('client-blog-by-slug', [decodedSlug]);
    let relatedPosts = await cache.get<BlogWithCategoryAndReactions[]>(
      'client-related-blog-posts',
      [decodedSlug],
    );

    if (!data) {
      data = await prisma.blog.findUnique({
        where: {
          slug: decodedSlug,
          published: true,
        },
        include: {
          category: true,
          reactions: true,
        },
      });

      relatedPosts = await prisma.blog.findMany({
        where: {
          id: { not: data?.id },
          category: {
            slug: data?.category.slug,
          },
        },
        include: {
          category: true,
          reactions: true,
        },
        orderBy: {
          createdAt: 'desc', // Sort by latest
        },
        take: 5,
      });

      cache.set('client-blog-by-slug', [decodedSlug], data);
      cache.set('client-related-blog-posts', [decodedSlug], relatedPosts);
    }

    return { success: true, data, relatedPosts };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Failed to fetch data',
    };
  }
};
