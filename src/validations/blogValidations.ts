import { z } from "zod";

export const blogCategorySchema = z.object({
  name: z.string().min(3, "Minimum 3 characters are required"),
  slug: z.string().min(3, "Minimum 3 characters are required"),
});

export const blogFormSchema = z.object({
  title: z.string().min(3, "Minimum 3 characters are required"),
  categoryId: z.string(),
  author: z.string().min(3, "Minimum 3 characters are required"),
  content: z.string().min(10, "Minimum 10 characters are required"),
  coverImage: z.string().optional(),
  description: z.string().min(3, "Minimum 3 characters are required"),
});
