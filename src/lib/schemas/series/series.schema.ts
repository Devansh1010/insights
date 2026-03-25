import { Types } from "mongoose";
import z from "zod";

export const SeriesSchema = z.object({
    title: z
        .string()
        .min(5, "Title must be at least 5 characters")
        .max(100),
    desc: z
        .string()
        .min(10, "Description is too short"),
    blogs: z
        .array(
            z
                .string()
                .refine((val) => Types.ObjectId.isValid(val),
                    {
                        message: "Invalid Blog ID format",
                    })
        ),
    coverImage: z
        .string()
        .url("Invalid image URL")
        .optional(),
    tags: z
        .array(z
            .string())
        .nonempty("Select at least one tag"),
    isPublished: z
        .boolean()
        .default(false),
});