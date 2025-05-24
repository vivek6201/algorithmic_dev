import { prisma, Prisma } from '@repo/db';
import cache from '@repo/shared/cache';
import { NextRequest, NextResponse } from 'next/server';

type BlogWithCategoryAndReactions = Prisma.BlogGetPayload<{
  include: {
    category: true;
    reactions: true;
  };
}>;
export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  const rawCategory = searchParams.getAll('category');
  const categories = rawCategory.flatMap((item) => item.split(',')).filter(Boolean);

  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);

  // Create args for cache key
  const cacheArgs = [`page=${page}`, `limit=${limit}`, ...categories.map((c) => `cat=${c}`)];

  try {
    let blogs = await cache.get<BlogWithCategoryAndReactions[]>('blogs', cacheArgs);

    if (!blogs) {
      blogs = await prisma.blog.findMany({
        where: {
          published: true,
          ...(categories.length > 0
            ? {
                category: {
                  slug: {
                    in: categories,
                  },
                },
              }
            : {}),
        },
        take: limit,
        skip: (page - 1) * limit,
        include: {
          category: true,
          reactions: true,
        },
      });

      cache.set('blogs', cacheArgs, blogs);
    }

    return NextResponse.json({ success: true, data: blogs }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Failed to fetch blogs' }, { status: 500 });
  }
};
