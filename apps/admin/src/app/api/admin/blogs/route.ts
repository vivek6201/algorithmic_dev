import { Blog, BlogCategory } from '@repo/db';
import cache from '@repo/shared/cache';
import { prisma } from '@repo/db';
import { NextResponse } from 'next/server';

type BlogWithExtras = Blog & {
  category: BlogCategory;
  _count: {
    [key: string]: number;
  };
};

export async function GET() {
  try {
    let res = await cache.get<BlogWithExtras[]>('blogs', []);

    if (!res) {
      res = await prisma.blog.findMany({
        include: {
          category: true,
          _count: true,
        },
        orderBy: {
          updatedAt: 'desc',
        },
      });
      cache.set('blogs', [], res, 10);
    }

    return NextResponse.json({ blogs: res }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blogs', details: error }, { status: 500 });
  }
}
