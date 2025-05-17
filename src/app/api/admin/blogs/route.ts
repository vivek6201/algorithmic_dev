import { Blog, BlogCategory } from '@/generated/prisma';
import cache from '@/lib/cache';
import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

type BlogWithExtras = Blog & {
  category: BlogCategory;
  _count: {
    [key: string]: number;
  };
};

export async function GET() {
  try {
    let res = await cache.get<BlogWithExtras[]>('blogs', []);

    if (!res) {
      res = await prisma.blog.findMany({
        include: {
          category: true,
          _count: true,
        },
      });
      cache.set('blogs', [], res);
    }

    return NextResponse.json({ blogs: res }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blogs', details: error }, { status: 500 });
  }
}
