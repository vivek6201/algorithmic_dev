'use server';

import { prisma } from '@repo/db';

export const updateTutorialCategoryStatus = async (id: string, status: boolean) => {
  try {
    await prisma.tutorialCategory.update({
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

export const updateTutorialStatus = async (id: string, status: boolean) => {
  try {
    await prisma.tutorial.update({
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

export const updateTutorialTopicStatus = async (id: string, status: boolean) => {
  try {
    await prisma.topic.update({
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
