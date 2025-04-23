import * as z from "zod"

export const loginValidation = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(16),
});

export const signupValidation = z
  .object({
    name: z.string().min(6).max(16),
    password: z.string().min(6).max(16),
    confirmPassword: z.string().min(6).max(16),
    email: z.string().email(),
    role: z.enum(["User", "Employer", "Admin"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });
