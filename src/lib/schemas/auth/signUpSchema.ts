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

const emailSchema = z.string().email("Invalid email format");
const usernameSchema = z.string().min(2, "Username must be at least 2 characters");

export const signInSchema = z.object({
  identifier: z.string()
    .min(1, "Email or Username is required")
    .refine((value) => {
      // Return true if it's a valid email OR a valid username
      const isEmail = emailSchema.safeParse(value).success;
      const isUsername = usernameSchema.safeParse(value).success;
      return isEmail || isUsername;
    }, "Please enter a valid email or username"),

  password: passwordValidation,
});

export const emailOnlySchema = z.object({
  email: emailValidation,
})

const ImageSchema = z.object({
  url: z.string().url(),
  id: z.string().optional(),
  name: z.string().optional()
});

export const updateUserSchema = z.object({
  username: z.string()
    .min(2, { message: 'Minimum 2 characters required in Username' })
    .max(20, { message: 'Max 20 characters allowed in the Username' })
    .regex(/^[a-zA-Z0-9_]+$/, { message: 'Special characters are not allowed' })
    .optional(),

  email: z
    .string()
    .optional(),

  profileImage: ImageSchema.nullable().optional(),
})
