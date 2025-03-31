import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({ message: "Incorrect email address" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .refine((value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value), {
      message: "Must be 8+ chars, incl. uppercase & number.",
    }),
  rememberMe: z.boolean().optional(),
  captcha: z.string().optional(),
})

export type Inputs = z.infer<typeof loginSchema>
