'use server';
import { BugFormData, FeedbackFormData } from '@/types/main';
import { prisma } from '@repo/db';
import { safeAction } from '@repo/shared/utils';
import { bugSchema, feedbackSchema } from '@repo/shared/validations';

const feedbackHandler = async (values: FeedbackFormData) => {
  await prisma.feedback.create({
    data: values,
  });

  return {
    message: 'Feedback Submitted Successfully',
  };
};

const bugHandler = async (values: BugFormData) => {
  await prisma.bug.create({
    data: values,
  });

  return {
    message: 'Bug Reported Successfully',
  };
};

export const feedbackAction = safeAction({ schema: feedbackSchema, handler: feedbackHandler });
export const bugAction = safeAction({ schema: bugSchema, handler: bugHandler });
