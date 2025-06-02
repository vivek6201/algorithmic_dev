import { BlogCategory } from '@repo/db';
import cache from '@repo/shared/cache';
import { prisma } from '@repo/db';
import { NextRequest, NextResponse } from 'next/server';
import { nextAuthResult } from '@/lib/auth';

export const GET = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

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

    let category = await cache.get<BlogCategory>('blog-category-with-id', [id]);

    if (!category) {
      category = await prisma.blogCategory.findUnique({
        where: {
          id,
        },
      });

      cache.set('blog-category-with-id', [id], category, 10);
    }

    if (!category) {
      return NextResponse.json({ category: null, message: 'Category not found' }, { status: 200 });
    }

    return NextResponse.json({ category }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Failed to fetch blog category', details: err },
      { status: 500 },
    );
  }
};
