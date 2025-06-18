'use server';
import { FeedbackFormData } from '@/types/main';
import { prisma } from '@repo/db';
import { safeAction } from '@repo/shared/utils';
import { feedbackSchema } from '@repo/shared/validations';

const feedbackHandler = async (values: FeedbackFormData) => {
  await prisma.feedback.create({
    data: values,
  });

  return {
    message: 'Feedback Submitted Successfully',
  };
};

export const feedbackAction = safeAction({ schema: feedbackSchema, handler: feedbackHandler });
