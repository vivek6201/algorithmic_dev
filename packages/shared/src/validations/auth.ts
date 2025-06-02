import { Role } from '@repo/db';
import { z } from 'zod';

export const loginValidation = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(16),
});

export const signupValidation = z
  .object({
    name: z.string().min(6).max(20),
    password: z.string().min(6).max(16),
    confirmPassword: z.string().min(6).max(16),
    email: z.string().email(),
    role: z.nativeEnum(Role),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

export const resetPassValidation = z
  .object({
    oldPassword: z.string().min(1),
    newPassword: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });
