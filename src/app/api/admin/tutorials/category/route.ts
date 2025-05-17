import { TutorialCategory } from '@/generated/prisma';
import cache from '@/lib/cache';
import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    let res = await cache.get<TutorialCategory[]>('admin-tutorial-categories', []);

    if (!res) {
      res = await prisma.tutorialCategory.findMany();
      if (res) cache.set('admin-tutorial-categories', [], res);
    }
    return NextResponse.json({ categories: res }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch blog categories', details: error },
      { status: 500 },
    );
  }
}
