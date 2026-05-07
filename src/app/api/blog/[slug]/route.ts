import { createResponse, StatusCode } from "@/lib/createResponse";
import { dbConnect } from "@/lib/db";
import { generateSlug } from "@/lib/slug-generater";
import { VerifyUser } from "@/lib/verifyUser/userVerification";
import Blog from "@/models/blog_modles/blog.model";
import SeriesBlog from "@/models/series_models/series-blog.model";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
    try {
        const { slug } = await params

        const auth = await VerifyUser()

        // if (!auth.success) {
        //     return createResponse(
        //         { success: false, message: "Unauthorized" },
        //         StatusCode.UNAUTHORIZED
        //     )
        // }

        await dbConnect()

        const result = await Blog.aggregate([
            // 1. Get the current blog
            { $match: { slug: slug } },

            // 2. Join with the Users collection to get author details
            {
                $lookup: {
                    from: "users",
                    localField: "author",
                    foreignField: "_id",
                    as: "author"
                }
            },
            { $unwind: "$author" },

            // 2. Look up the "Current" entry in seriesblogs to find the order
            {
                $lookup: {
                    from: "seriesblogs",
                    localField: "_id",
                    foreignField: "blog",
                    as: "currentSeriesEntry"
                }
            },

            { $unwind: { path: "$currentSeriesEntry", preserveNullAndEmptyArrays: true } },

            // 3. Look up the "Next" entry using the order we just found
            {
                $lookup: {
                    from: "seriesblogs",
                    let: {
                        seriesId: "$currentSeriesEntry.series",
                        currentOrder: "$currentSeriesEntry.order"
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$series", "$$seriesId"] },
                                        { $eq: ["$order", { $add: ["$$currentOrder", 1] }] }
                                    ]
                                }
                            }
                        },
                        // Join with the Blogs collection to get the Title/Image of the next blog
                        {
                            $lookup: {
                                from: "blogs",
                                localField: "blog",
                                foreignField: "_id",
                                as: "blogDetails"
                            }
                        },
                        { $unwind: "$blogDetails" },
                        {
                            $project: {
                                _id: "$blogDetails._id",
                                title: "$blogDetails.title",
                                coverImage: "$blogDetails.coverImage",
                                desc: "$blogDetails.excerpt",
                                slug: "$blogDetails.slug"
                            }
                        }
                    ],
                    as: "nextBlog"
                }
            },

            // 4. Final Cleanup
            {
                $project: {
                    title: 1,
                    content: 1,
                    coverImage: 1,
                    author: {
                        _id: 1,
                        avatar: 1
                    },
                    hook: 1,
                    insights: 1,
                    level: 1,
                    slug: 1,
                    excerpt: 1,
                    tags: 1,
                    seriesPartOf: 1,
                    nextBlog: { $arrayElemAt: ["$nextBlog", 0] }
                }
            }
        ]);

        // Since aggregate returns an array, take the first element
        const blogData = result[0] || null;

        // 

        if (!blogData) {
            return createResponse(
                { success: false, message: "Blog not found" },
                StatusCode.NOT_FOUND
            )
        }


        if (!blogData.author._id.equals(auth.user?._id) || !auth.user) {
            await Blog.findByIdAndUpdate(slug, { $inc: { views: 1 } });
        }


        return createResponse(
            {
                success: true,
                message: "Blog found",
                data: blogData
            },
            StatusCode.OK
        )
    } catch (error: unknown) {
        console.error("Error getting blog:", error)

        return createResponse(
            {
                success: false,
                message: "Internal Server Error",
            },
            StatusCode.INTERNAL_ERROR
        )
    }
}

export async function PATCH(req: NextRequest, { params }: { params: { slug: string } }) {
    try {
        const { slug } = await params

        const { title, content, tags, isPublished, coverImage, seriesId, hook, insights, level } =
            await req.json()

        const auth = await VerifyUser()

        if (!auth.success) {
            return createResponse(
                { success: false, message: "Unauthorized" },
                StatusCode.UNAUTHORIZED
            )
        }

        const userId = auth.user?._id


        await dbConnect()

        const blog = await Blog.findOne({ slug: slug, author: userId })

        if (!blog) {
            return createResponse(
                { success: false, message: "Blog not found" },
                StatusCode.NOT_FOUND
            )
        }

        // ownership check
        if (blog.author.toString() !== userId) {
            return createResponse(
                { success: false, message: "Forbidden" },
                StatusCode.FORBIDDEN
            )
        }

        // update title
        if (title && title !== blog.title) {
            blog.title = title
            blog.slug = generateSlug(title)
        }

        // update content
        if (content?.blocks?.length) {
            blog.content = content

            const firstBlock = content.blocks.find(
                (b: { type: string }) => b.type === "paragraph"
            )

            blog.excerpt = firstBlock?.data?.text?.slice(0, 150) ?? ""
        }

        // update cover image
        if (coverImage) {
            blog.coverImage = coverImage
        }

        // update tags
        if (tags) {
            blog.tags = Array.isArray(tags) ? tags : []
        }

        // publishing logic
        if (typeof isPublished === "boolean") {
            blog.isPublished = isPublished

            if (isPublished && !blog.publishedAt) {
                blog.publishedAt = new Date()
            }

            if (!isPublished) {
                blog.publishedAt = undefined
            }
        }

        if (seriesId) {

            if (blog.seriesPartOf?.toString() !== seriesId) {

                const oldSeriesId = blog.seriesPartOf

                // Remove from old series if exists
                if (oldSeriesId) {
                    await SeriesBlog.findOneAndUpdate(
                        { series: oldSeriesId, blog: blog._id },
                        { $set: { series: seriesId } }
                    )
                }

                blog.seriesPartOf = seriesId

            }
        }

        if (typeof hook === "string") {
            blog.hook = hook.trim();
        }

        const validLevels = ['Beginner', 'Intermediate', 'Advanced'];
        if (level && validLevels.includes(level)) {
            blog.level = level;
        }


        if (insights) {
            // Ensure it's an array and clean up empty strings or non-string values
            blog.insights = Array.isArray(insights)
                ? insights.filter((i: string) => typeof i === "string" && i.trim() !== "")
                : [];
        }

        await blog.save()

        return createResponse(
            {
                success: true,
                message: "Blog Updated Successfully",
                data: blog
            },
            StatusCode.OK
        )
    } catch (error: unknown) {
        console.error("Error updating blog:", error)

        return createResponse(
            {
                success: false,
                message: "Internal Server Error",
            },
            StatusCode.INTERNAL_ERROR
        )
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { slug: string } }) {
    try {
        //Add verify  User
        const auth = await VerifyUser();

        if (!auth.success || !auth.user?._id) {
            return createResponse(
                { success: false, message: "Unauthorized" },
                StatusCode.UNAUTHORIZED
            );
        }
        const userId = auth.user._id;

        await dbConnect()

        const { slug } = await params

        const deletedBlog = await Blog.findOneAndDelete({ slug: slug, author: userId }).lean()


        if (!deletedBlog) {
            return createResponse({ success: false, message: 'Blog not found' }, StatusCode.NOT_FOUND)
        }

        return createResponse({ success: true, message: 'Blog deleted successfully' }, StatusCode.OK)
    } catch (error) {
        console.error("Error while deleting post:", error)

        return createResponse(
            {
                success: false,
                message: "Internal Server Error",
            },

            StatusCode.INTERNAL_ERROR
        )
    }
}