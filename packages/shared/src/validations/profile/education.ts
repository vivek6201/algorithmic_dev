import { z } from 'zod';

const educationValidation = z
  .object({
    schoolName: z.string().min(1),
    degree: z.string().min(1),
    fieldOfStudy: z.string().min(1),
    startDate: z.date().refine((date) => date <= new Date(), {
      message: 'Start date cannot be in the future',
    }),
    endDate: z
      .date()
      .optional()
      .refine((date) => !date || date >= new Date(), {
        message: 'End date must not be in the past',
      }),
    grade: z.string().min(1),
    currentlyEnrolled: z.boolean(),
  })
  .refine((data) => data.currentlyEnrolled || data.endDate !== undefined, {
    message: 'End date is required if not currently enrolled',
    path: ['endDate'],
  })
  .refine((data) => !data.endDate || data.startDate < data.endDate, {
    message: 'Start date must be earlier than end date',
    path: ['startDate'],
  });

export default educationValidation;
