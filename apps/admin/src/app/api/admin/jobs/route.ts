import { Jobs } from '@repo/db';
import cache from '@repo/shared/cache';
import { prisma } from '@repo/db';
import { NextResponse } from 'next/server';
import { nextAuthResult } from '@/lib/auth';

export const GET = async () => {
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

    let data = await cache.get<Jobs[]>('admin-jobs', []);
    if (!data) {
      data = await prisma.jobs.findMany({
        include: {
          jobCategories: true,
        },
        orderBy: {
          updatedAt: 'desc',
        },
      });
      if (data) cache.set('admin-jobs', [], data, 10);
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
      },
      { status: 500 },
    );
  }
};
