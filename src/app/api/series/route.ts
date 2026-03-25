import { createResponse, StatusCode } from "@/lib/createResponse";
import { dbConnect } from "@/lib/db";
import { SeriesSchema } from "@/lib/schemas/series/series.schema";
import { generateSlug } from "@/lib/slug-generater";
import { VerifyUser } from "@/lib/verifyUser/userVerification";
import Series from "@/models/series_models/series.model";
import { NextRequest } from "next/server";
import valkey from '@/lib/valkey'


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

export async function GET() {
    try {
        const auth = await VerifyUser();

        if (!auth.success || !auth.user?._id) {
            return createResponse(
                { success: false, message: "Unauthorized" },
                StatusCode.UNAUTHORIZED
            );
        }

        const cachedSeries = await valkey.get('all-series')

        if (cachedSeries) {
            return createResponse(
                {
                    success: true,
                    message: 'Series found (cached)',
                    data: JSON.parse(cachedSeries),
                },
                StatusCode.OK
            )
        }

        await dbConnect()

        const allSeries = await Series.find({})
            .select('title slug desc coverImage tags')
            .populate({
                path: 'author',
                select: 'username -_id'
            })

        if (!allSeries) {
            createResponse(
                {
                    success: false,
                    message: "No Series Found",
                },
                StatusCode.NOT_FOUND
            )
        }

        await valkey.setEx('all-series', 600, JSON.stringify(allSeries))

        createResponse(
            {
                success: true,
                message: "Found Series",
                data: allSeries
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