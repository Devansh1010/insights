import z from "zod";

const objectIdRegex = /^[a-f\d]{24}$/i;

export const SeriesSchema = z.object({
    title: z.string().min(5).max(100),

    desc: z.string().min(10),

    blogs: z.array(
        z.string().regex(objectIdRegex, "Invalid Blog ID format")
    ).optional(),

    coverImage: z.string().url().optional(),

    tags: z.array(z.string()).nonempty(),

    isPublished: z.boolean().default(false),
});

export const seriesFormSchema = z.object({
    title: z
        .string()
        .min(3, "Title must be at least 3 characters")
        .max(100, "Title is too long"),

    desc: z
        .string()
        .min(10, "Description must be at least 10 characters"),

    coverImage: z.string().url().optional(),
    
    tags: z
        .array(z
            .string())
        .nonempty("Select at least one tag"),

    isPublished: z.boolean(),
});