import { JobCategory } from '@repo/db';
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

    let data = await cache.get<JobCategory[]>('admin-job-category', []);

    if (!data) {
      data = await prisma.jobCategory.findMany();
      if (data) cache.set('admin-job-category', [], data, 10);
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: 'Internal Server error',
    });
  }
};
