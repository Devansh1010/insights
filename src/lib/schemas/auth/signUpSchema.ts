import { z } from 'zod'

export const userValidation = z
  .string()
  .min(2, { message: 'Minimum 2 characters required in Username' })
  .max(20, { message: 'Max 20 characters allowed in the Username' })
  .regex(/^[a-zA-Z0-9_]+$/, { message: 'Special characters are not allowed' })

export const emailValidation = z.string().email({ message: 'Enter valid Email Address' })

export const passwordValidation = z
  .string()
  .min(6, { message: 'Password must contain at least 6 characters' })


export const signUpSchema = z.object({
  username: userValidation,
  email: emailValidation,
  password: passwordValidation,
})

export const signInSchema = z.object({
  email: emailValidation,
  password: passwordValidation,
})

export const emailOnlySchema = z.object({
  email: emailValidation,
})

export const updateUserSchema = z.object({
  username: z.string()
    .min(2, { message: 'Minimum 2 characters required in Username' })
    .max(20, { message: 'Max 20 characters allowed in the Username' })
    .regex(/^[a-zA-Z0-9_]+$/, { message: 'Special characters are not allowed' })
    .optional(),

  email: z
    .string()
    // .email({ message: 'Enter valid Email Address' })
    .optional(),

  profileImage: z.object({
    url: z.string(),
  }).nullable().optional()
})
