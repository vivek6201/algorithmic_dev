import { z } from 'zod';

const projectValidation = z
  .object({
    projectName: z.string(),
    description: z.string(),
    startDate: z.date(),
    endDate: z.date(),
    projectLink: z.string(),
    githubLink: z.string(),
  })
  .refine((data) => data.startDate < data.endDate, {
    message: 'Start date must be earlier than end date',
    path: ['startDate'],
  });

export default projectValidation;
