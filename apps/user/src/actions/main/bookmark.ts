'use server';

import { nextAuthResult } from '@/lib/auth';
import { prisma } from '@repo/db';

export const toggleJobBookmarkAction = async (id: string) => {
  try {
    const session = await nextAuthResult.auth();
    const profileId = session?.user?.profileId;

    if (!profileId) {
      return { success: false, message: 'User not authenticated' };
    }

    const job = await prisma.jobs.findUnique({
      where: { id },
      select: { id: true }, // only fetch what's needed
    });

    if (!job) {
      return { success: false, message: 'Job not found' };
    }

    // Check for existing bookmark
    const existing = await prisma.bookmark.findUnique({
      where: {
        profileId_jobId: {
          profileId,
          jobId: job.id,
        },
      },
      select: { id: true },
    });

    if (existing) {
      // Delete if already bookmarked
      await prisma.bookmark.delete({
        where: { id: existing.id },
      });

      return { success: true, message: 'Bookmark removed!' };
    }

    // Create new bookmark
    await prisma.bookmark.create({
      data: {
        type: 'Jobs',
        profileId,
        jobId: job.id,
      },
    });

    return { success: true, message: 'Job bookmarked!' };
  } catch (error) {
    console.error('[TOGGLE_JOB_BOOKMARK]', error);
    return { success: false, message: 'Something went wrong.' };
  }
};

export const toggleBlogBookmarkAction = async (slug: string) => {
  try {
    const session = await nextAuthResult.auth();
    const profileId = session?.user?.profileId;

    if (!profileId) {
      return { success: false, message: 'User not authenticated' };
    }

    const blog = await prisma.blog.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!blog) {
      return { success: false, message: 'Blog not found' };
    }

    const existing = await prisma.bookmark.findUnique({
      where: {
        profileId_blogId: {
          profileId,
          blogId: blog.id,
        },
      },
      select: { id: true },
    });

    if (existing) {
      await prisma.bookmark.delete({
        where: { id: existing.id },
      });

      return { success: true, message: 'Bookmark removed!' };
    }

    await prisma.bookmark.create({
      data: {
        type: 'Blogs', // Ensure this matches your BookmarkType enum
        profileId,
        blogId: blog.id,
      },
    });

    return { success: true, message: 'Blog bookmarked!' };
  } catch (error) {
    console.error('[TOGGLE_BLOG_BOOKMARK]', error);
    return { success: false, message: 'Something went wrong.' };
  }
};
