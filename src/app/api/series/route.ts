import { createResponse, StatusCode } from "@/lib/createResponse";
import { dbConnect } from "@/lib/db";
import { SeriesSchema } from "@/lib/schemas/series/series.schema";
import { generateSlug } from "@/lib/slug-generater";
import { VerifyUser } from "@/lib/verifyUser/userVerification";
import Series from "@/models/series_models/series.model";
import { NextRequest } from "next/server";


export async function POST(req: NextRequest) {
    try {
        const auth = await VerifyUser();

        if (!auth.success || !auth.user?._id) {
            return createResponse(
                { success: false, message: "Unauthorized" },
                StatusCode.UNAUTHORIZED
            );
        }

        const userId = auth.user._id;

        const body = await req.json()

        //validate the data
        const validatedData = SeriesSchema.parse(body);

        const { title, desc, blogs, coverImage, tags, isPublished } = validatedData

        const slug = generateSlug(title)

        let isPublishAt: Date | null = null

        if (isPublished) {
            isPublishAt = new Date()
        }

        await dbConnect()

        const createdSeries = await Series.create({
            author: userId,
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
            { success: true, message: "Series Created Successfully" },
            StatusCode.OK
        );

    } catch (error) {
        console.error("Error while creating Series:", error)

        return createResponse(
            {
                success: false,
                message: "Internal Server Error",
            },
            StatusCode.INTERNAL_ERROR
        )
    }
}

export async function GET(req: NextRequest) {
    try {
        const auth = await VerifyUser();

        if (!auth.success || !auth.user?._id) {
            return createResponse(
                { success: false, message: "Unauthorized" },
                StatusCode.UNAUTHORIZED
            );
        }

        const { searchParams } = new URL(req.url);

        const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
        const limit = Math.min(20, parseInt(searchParams.get("limit") || "10"));

        const skip = (page - 1) * limit;

        await dbConnect()

        const series = await Series.find({ isPublished: true })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .select('title slug desc coverImage tags createdAt')
            .populate({
                path: 'author',
                select: 'username -_id'
            })
            .lean()

        const total = await Series.countDocuments({ isPublished: true });

        if (!series) {
            createResponse(
                {
                    success: false,
                    message: "No Series Found",
                },
                StatusCode.NOT_FOUND
            )
        }

        return createResponse(
            {
                success: true,
                message: "Found Series",
                data: {
                    series,
                    pagination: {
                        total,
                        page,
                        limit,
                        totalPages: Math.ceil(total / limit),
                    },
                }
            },
            StatusCode.OK
        )


    } catch (error) {
        console.error("Error while getting series:", error)

        return createResponse(
            {
                success: false,
                message: "Internal Server Error",
            },
            StatusCode.INTERNAL_ERROR
        )

    }
}