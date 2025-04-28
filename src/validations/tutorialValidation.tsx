import { z } from 'zod';

export const tutorialCategorySchema = z.object({
  name: z.string().min(3, 'Minimum 3 characters are required'),
  slug: z.string().min(3, 'Minimum 3 characters are required'),
});

export const tutorialSchema = z.object({
  title: z.string().min(3, 'Minimum 3 characters are required'),
  slug: z.string().min(3, 'Minimum 3 characters are required'),
  description: z.string().min(3, 'Minimum 3 characters are required'),
  categoryId: z.array(z.string()),
});

export const tutorialChapterSchema = z.object({
  title: z.string().min(3, 'Minimum 3 characters are required'),
  slug: z.string().min(3, 'Minimum 3 characters are required'),
  description: z.string().min(3, 'Minimum 3 characters are required'),
  order: z.number().min(1),
});

export const tutorialTopicSchema = z.object({
  title: z.string().min(3, 'Minimum 3 characters are required'),
  slug: z.string().min(3, 'Minimum 3 characters are required'),
  content: z.string().min(10, 'Minimum 3 characters are required'),
  order: z.number().min(1),
});
