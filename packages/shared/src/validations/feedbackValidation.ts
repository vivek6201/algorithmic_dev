import { z } from 'zod';

export const bugSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address').optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export const feedbackSchema = z.object({
  rating: z.number().min(1).max(5),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});
