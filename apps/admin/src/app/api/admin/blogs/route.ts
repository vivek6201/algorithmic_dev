import { Blog, BlogCategory } from '@repo/db';
import cache from '@repo/shared/cache';
import { prisma } from '@repo/db';
import { NextResponse } from 'next/server';
import { nextAuthResult } from '@/lib/auth';

type BlogWithExtras = Blog & {
  category: BlogCategory;
  _count: {
    [key: string]: number;
  };
};

export async function GET() {
  try {
    const session = await nextAuthResult.auth();

    if (!session?.user) {
      return NextResponse.json(
        {
          success: false,
          message: 'Unauthorized Access',
        },
        { status: 403 },
      );
    }

    let res = await cache.get<BlogWithExtras[]>('blogs', []);

    if (!res) {
      res = await prisma.blog.findMany({
        include: {
          category: true,
          _count: true,
        },
      });
      cache.set('blogs', [], res, 10);
    }

    return NextResponse.json({ blogs: res }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blogs', details: error }, { status: 500 });
  }
}
