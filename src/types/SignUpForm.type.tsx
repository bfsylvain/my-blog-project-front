import { z } from "zod";

export const signUpSchema = z.object({
  pseudo: z.string().min(8),
  email: z.string().email(),
  password: z.string().min(8),
  checkPassword: z.string().min(8),
});

export type SignUpForm = z.infer<typeof signUpSchema>;
