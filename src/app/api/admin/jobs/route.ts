import { Jobs } from '@/generated/prisma';
import cache from '@/lib/cache';
import { prisma } from '@/lib/db';
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
      cache.set('admin-jobs', [], data);
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
