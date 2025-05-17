import { Tutorial } from '@/generated/prisma';
import cache from '@/lib/cache';
import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    let tutorials = await cache.get<Tutorial[]>('admin-tutorials', []);

    if (!tutorials) {
      tutorials = await prisma.tutorial.findMany({
        include: {
          chapters: true,
          _count: true,
        },
      });

      if (tutorials) cache.set('admin-tutorials', [], tutorials);
    }

    return NextResponse.json({ tutorials }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
};
