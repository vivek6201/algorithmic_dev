import { z } from 'zod';

const experienceValidation = z
  .object({
    companyName: z.string(),
    jobTitle: z.string(),
    startDate: z.date(),
    endDate: z.date(),
    jobDescription: z.string(),
  })
  .refine((data) => data.startDate < data.endDate, {
    message: 'Start date must be earlier than end date',
    path: ['startDate'],
  });

export default experienceValidation;
