import { z } from 'zod';

const educationValidation = z
  .object({
    schoolName: z.string(),
    degree: z.string(),
    fieldOfStudy: z.string(),
    startDate: z.date(),
    endDate: z.date(),
    grade: z.string(),
  })
  .refine((data) => data.startDate < data.endDate, {
    message: 'Start date must be earlier than end date',
    path: ['startDate'],
  });

export default educationValidation;
