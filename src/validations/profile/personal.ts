import { PersonType } from '@/generated/prisma';
import { z } from 'zod';

const personalValidation = z.object({
  name: z.string().min(3),
  bio: z.string().min(10),
  dob: z.date(),
  personType: z.nativeEnum(PersonType),
  phoneNo: z.string(),
});

export default personalValidation;
