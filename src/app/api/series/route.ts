import { createResponse, StatusCode } from "@/lib/createResponse";
import { dbConnect } from "@/lib/db";
import { SeriesSchema } from "@/lib/schemas/series/series.schema";
import { generateSlug } from "@/lib/slug-generater";
import { VerifyUser } from "@/lib/verifyUser/userVerification";
import Series from "@/models/series_models/series.model";
import { NextRequest } from "next/server";


interface SeriesFilter {
    isPublished: boolean;
    tags?: string | { $in: string[] } | { $regex: string, $options: string };
    $or?: Array<{ [key: string]: { $regex: string; $options: string } }>;
}

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

        const { searchParams } = new URL(req.url);

        const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
        const limit = Math.min(20, parseInt(searchParams.get("limit") || "10"));
        const tag = searchParams.get("tag");
        const q = searchParams.get("q");

        const skip = (page - 1) * limit;

        await dbConnect()

        const filter: SeriesFilter = {
            isPublished: true,
        };

        if (tag && tag !== 'null' && tag !== 'undefined') {
            filter.tags = { $in: [tag] };
        }

        // 3. Handle search query safely
        if (q && q.trim() !== '' && q !== 'null' && q !== 'undefined') {
            const escapedQuery = q.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');

            filter.$or = [
                {
                    title: {
                        $regex: escapedQuery,
                        $options: "i",
                    },
                },
                {
                    desc: {
                        $regex: escapedQuery,
                        $options: "i",
                    },
                },
            ];
        }

        if (tag || q) {
            const filteredSeries = await Series.find(filter)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean();

            if (filteredSeries) {
                return createResponse(
                    {
                        success: true,
                        message: "Found Series",
                        data: filteredSeries
                    },
                    StatusCode.OK
                )
            }
        }

        const topSeries = await Series.aggregate([
            { $match: { isPublished: true } },
            // 1. Join with the Users collection
            {
                $lookup: {
                    from: "users",
                    localField: "author",
                    foreignField: "_id",
                    as: "authorDetails"
                }
            },
            { $unwind: "$authorDetails" },
            // 2. Calculate the number of followers
            {
                $addFields: {
                    followerCount: { $size: { $ifNull: ["$authorDetails.followers", []] } }
                }
            },
            // 3. Sort by views first, then by follower count
            {
                $sort: {
                    views: -1,
                    followerCount: -1
                }
            },
            // 4. Limit to top 3 and project only what you need
            { $limit: 3 },
            {
                $project: {
                    title: 1,
                    slug: 1,
                    desc: 1,
                    coverImage: 1,
                    tags: 1,
                    views: 1,
                    createdAt: 1,
                    author: {
                        username: "$authorDetails.username",
                        avatar: "$authorDetails.avatar"
                    }
                }
            }
        ]);


        if (!topSeries) {
            return createResponse(
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
                data: topSeries
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

