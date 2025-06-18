import { FeedbackType } from '@repo/db';
import { z } from 'zod';

export const feedbackSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address').optional(),
  type: z.nativeEnum(FeedbackType, {
    required_error: 'Please select a feedback type',
  }),
  rating: z.number().min(1).max(5),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});
