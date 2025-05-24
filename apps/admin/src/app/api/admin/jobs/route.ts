import { Jobs } from '@repo/db';
import cache from '@repo/shared/cache';
import { prisma } from '@repo/db';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    let data = await cache.get<Jobs[]>('admin-jobs', []);
    if (!data) {
      data = await prisma.jobs.findMany({
        include: {
          jobCategories: true,
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
