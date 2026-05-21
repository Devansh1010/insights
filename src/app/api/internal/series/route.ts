import { createResponse, StatusCode } from "@/lib/createResponse";
import { dbConnect } from "@/lib/db";
import { SeriesSchema } from "@/lib/schemas/series/series.schema";
import { generateSlug } from "@/lib/slug-generater";
import Series from "@/models/series_models/series.model";
import User from "@/models/user_models/user.model";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {

    try {
        const authHeader = req.headers.get("authorization");

        if (!authHeader) {
            return createResponse(
                { success: false, message: "Missing authorization header" },
                StatusCode.UNAUTHORIZED
            );
        }

        const token = authHeader.replace("Bearer ", "");

        if (token !== process.env.INTERNAL_API_SECRET) {

            return createResponse(
                { success: false, message: "Invalid secret key" },
                StatusCode.UNAUTHORIZED
            );
        }

        const body = await req.json();

        const validatedData = SeriesSchema.parse(body);

        const { title, desc, blogs, coverImage, tags, isPublished } = validatedData

        const slug = generateSlug(title)

        let isPublishAt: Date | null = null

        if (isPublished) {
            isPublishAt = new Date()
        }

        await dbConnect()

        const aiUser = await User.findOne({
            email: "ai@insightsarticle.in"
        })
            .select('_id username')
            .lean();
        ;

        if (!aiUser) {
            return createResponse(
                { success: false, message: "AI user not found" },
                StatusCode.NOT_FOUND
            );
        }

        const createdSeries = await Series.create({
            author: aiUser._id,
            title,
            slug,
            desc,
            blogs: blogs,
            coverImage,
            tags,
            isPublished,
            publishedAt: isPublishAt
        })

        if (!createdSeries) {
            return createResponse(
                { success: false, message: "Series Not Created" },
                StatusCode.CONFLICT
            );
        }

        return createResponse(
            {
                success: true,
                message: "Series Created Successfully",
                data: createdSeries
            },
            StatusCode.OK
        );

    } catch (error) {
        return createResponse(
            {
                success: false,
                message: "Internal Server Error",
            },
            StatusCode.INTERNAL_ERROR
        )
    }
}