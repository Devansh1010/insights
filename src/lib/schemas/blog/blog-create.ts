import { z } from "zod";

export const createBlogSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters"),

  hook: z
    .string()
    .min(10, "Hook must be at least 10 characters")
    .max(120, "Hook must be under 120 characters")
    .refine(
      (val) =>
        !val.toLowerCase().includes("this article") &&
        !val.toLowerCase().includes("in this blog"),
      {
        message: "Hook should be engaging, avoid generic phrases",
      }
    )
    .optional(),

  insights: z
    .array(
      z
        .string()
        .min(10, "Insight too short")
        .max(120, "Insight too long")
        .refine((val) => val.trim().length > 0, {
          message: "Insight cannot be empty",
        })
    )
    .max(5, "Maximum 5 insights allowed")
    .optional(),


  level: z
    .enum(["Beginner", "Intermediate", "Advanced"])
    .default("Beginner"),

  content: z.object({}).passthrough().optional(),

  isPublished: z.boolean().default(false),

  seriesId: z.string().optional().or(z.literal("")),

  // If the UI only sends the URL string to the API
  coverImage: z
    .string()
    .url("Invalid image URL")
    .nullable()
    .optional(),

  tags: z.array(z.string()).default([]),
});