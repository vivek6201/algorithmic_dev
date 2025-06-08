import { z } from 'zod';

const projectValidation = z
  .object({
    projectName: z.string(),
    description: z.string(),
    startDate: z.date(),
    endDate: z.date().optional(),
    projectLink: z.string().url().optional(),
    githubLink: z.string().url().optional(),
    inProgress: z.boolean(),
  })
  .refine((data) => data.inProgress || data.endDate !== undefined, {
    message: 'End date is required if not in progress',
    path: ['endDate'],
  })
  .refine((data) => !data.endDate || data.startDate < data.endDate, {
    message: 'Start date must be earlier than end date',
    path: ['startDate'],
  });

export default projectValidation;
