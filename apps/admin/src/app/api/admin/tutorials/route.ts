import { Tutorial } from '@repo/db';
import cache from '@repo/shared/cache';
import { prisma } from '@repo/db';
import { NextResponse } from 'next/server';
import { nextAuthResult } from '@/lib/auth';
import { TutorialDataType } from '@/types/tutorials';

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

    let tutorials = await cache.get<TutorialDataType[]>('admin-tutorials', []);

    if (!tutorials) {
      tutorials = await prisma.tutorial.findMany({
        include: {
          chapters: true,
          categories: true,
          _count: true,
        },
        orderBy: {
          updatedAt: 'desc',
        },
      });

      if (tutorials) cache.set('admin-tutorials', [], tutorials, 10);
    }

    return NextResponse.json({ tutorials }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
};
