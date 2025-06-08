import { z } from 'zod';

const experienceValidation = z
  .object({
    companyName: z.string(),
    jobTitle: z.string(),
    startDate: z.date(),
    endDate: z
      .date()
      .optional()
      .refine((date) => !date || date >= new Date(), {
        message: 'End date must not be in the past',
      }),
    jobDescription: z.string(),
    currentlyWorking: z.boolean(),
  })
  .refine((data) => data.currentlyWorking || data.endDate !== undefined, {
    message: 'End date is required if not currently working',
    path: ['endDate'],
  })
  .refine((data) => !data.endDate || data.startDate < data.endDate, {
    message: 'Start date must be earlier than end date',
    path: ['startDate'],
  });

export default experienceValidation;
