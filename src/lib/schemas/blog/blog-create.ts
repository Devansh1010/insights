import { z } from "zod";

export const createBlogSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters"),

    content: z.object({}).passthrough().optional(),

    isPublished: z.boolean().default(false),

    seriesId: z.string().optional().or(z.literal("")),

    coverImage: z.object({
        url: z.string().url(),
        name: z.string(),
        id: z.string()
    }).nullable().optional(),

    tags: z.array(z.string()).default([]),
});