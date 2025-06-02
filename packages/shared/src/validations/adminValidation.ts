import { AdminRole } from '@repo/db';
import { z } from 'zod';

export const adminValidation = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(1),
  role: z.nativeEnum(AdminRole),
});
