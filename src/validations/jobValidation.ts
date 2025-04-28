import { ExperienceLevel, JobType } from "@/generated/prisma";
import { z } from "zod";

export const jobCategorySchema = z.object({
  name: z.string().min(3, "Minimum 3 characters are required"),
  slug: z.string().min(3, "Minimum 3 characters are required"),
  description: z.string().min(10).optional(),
});

export const jobSchema = z.object({
  title: z.string().min(3),
  shortDescription: z.string().min(10),
  description: z.string().min(20),
  slug: z.string().min(3),
  experienceLevel: z.nativeEnum(ExperienceLevel),
  salaryRange: z.string().min(3),
  type: z.nativeEnum(JobType),
  link: z.string().min(3),
  image: z.any().optional(),
  categories: z.array(z.string()),
});
