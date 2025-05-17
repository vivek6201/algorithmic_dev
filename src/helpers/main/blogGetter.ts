import { Blog, BlogCategory } from '@/generated/prisma';
import cache from '@/lib/cache';
import { prisma } from '@/lib/db';

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

type BlogWithCategoryAndReactions = Blog & {
  category: BlogCategory;
  reactions: any[];
};

export const getClientBlogBySlug = async (slug: string) => {
  try {
    const decodedSlug = decodeURIComponent(slug);
    let data = await cache.get<BlogWithCategoryAndReactions>('client-blog-by-slug', [decodedSlug]);
    let relatedPosts = await cache.get<Blog[]>('client-related-posts', [decodedSlug]);

    console.log({ data });

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
          category: {
            slug: data?.category.slug,
          },
        },
      });

      cache.set('client-blog-by-slug', [decodedSlug], data);
      cache.set('client-related-posts', [decodedSlug], relatedPosts);
    }

    relatedPosts = relatedPosts?.filter((item) => item.id != data?.id) || null;

    return { success: true, data, relatedPosts };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Failed to fetch data',
    };
  }
};
