import { z } from "zod";

export const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const forgotPassSchema = z.object({
  email: z.string().email("Enter a valid email"),
});

export const mailerInputSchema = z.object({
  to: z.string().email(),
  subject: z.string().min(1),
  template: z.enum(["verification"]),
  payload: z.record(z.string(), z.any()).optional(),
});
