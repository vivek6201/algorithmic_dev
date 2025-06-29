import { nextAuthResult } from '@/lib/auth';
import { prisma } from '@repo/db';
import { NextResponse } from 'next/server';

export const GET = async () => {
  const session = await nextAuthResult.auth();

  if (!session?.user) {
    return NextResponse.json({
      success: false,
      message: 'UnAuthorized!',
    });
  }

  const { profileId } = session.user;

  try {
    const bookmarks = await prisma.bookmark.findMany({
      where: {
        profileId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        blog: {
          include: {
            category: true,
            reactions: true,
          },
        },
        job: {
          include: {
            jobCategories: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Bookmarks fetched successfully!',
      data: bookmarks,
    });
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    return NextResponse.json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};
