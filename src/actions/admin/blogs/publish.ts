'use server';

import { prisma } from '@/lib/db';

export const updateBlogCategoryStatus = async (id: string, status: boolean) => {
  try {
    await prisma.blogCategory.update({
      where: { id },
      data: {
        published: status,
      },
    });

    return { success: true, message: 'Status Changed Successfully!' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Internal Server Error' };
  }
};

export const updateBlogStatus = async (id: string, status: boolean) => {
  try {
    await prisma.blog.update({
      where: { id },
      data: {
        published: status,
      },
    });

    return { success: true, message: 'Status Changed Successfully!' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Internal Server Error' };
  }
};
