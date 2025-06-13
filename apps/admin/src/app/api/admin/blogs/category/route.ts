import { BlogCategory } from '@repo/db';
import cache from '@repo/shared/cache';
import { prisma } from '@repo/db';
import { NextResponse } from 'next/server';
import { nextAuthResult } from '@/lib/auth';

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

    let res = await cache.get<BlogCategory[]>('blog-category', []);

    if (!res) {
      res = await prisma.blogCategory.findMany({
        orderBy: {
          updatedAt: 'desc',
        },
      });
      cache.set('blog-category', [], res, 10);
    }

    return NextResponse.json({ categories: res }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch blog categories', details: error },
      { status: 500 },
    );
  }
}
