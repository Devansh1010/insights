import { createResponse, StatusCode } from "@/lib/createResponse";
import { dbConnect } from "@/lib/db";
import { generateSlug } from "@/lib/slug-generater";
import { VerifyUser } from "@/lib/verifyUser/userVerification";
import Blog from "@/models/blog_modles/blog.model";
import SeriesBlog from "@/models/series_models/series-blog.model";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { blogId: string } }) {
    try {
        const { blogId } = await params

        const auth = await VerifyUser()

        // if (!auth.success) {
        //     return createResponse(
        //         { success: false, message: "Unauthorized" },
        //         StatusCode.UNAUTHORIZED
        //     )
        // }

        await dbConnect()

        const blog = await Blog.findById(blogId).lean()

        if (!blog) {
            return createResponse(
                { success: false, message: "Blog not found" },
                StatusCode.NOT_FOUND
            )
        }

        if (!blog.author.equals(auth.user?._id) || !auth.user) {
            await Blog.findByIdAndUpdate(blogId, { $inc: { views: 1 } });
        }


        return createResponse(
            {
                success: true,
                message: "Blog found",
                data: blog
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

export async function PATCH(req: NextRequest, { params }: { params: { blogId: string } }) {
    try {
        const { blogId } = await params

        const { title, content, tags, isPublished, coverImage, seriesId } =
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

        const blog = await Blog.findById(blogId)

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

export async function DELETE(req: NextRequest, { params }: { params: { blogId: string } }) {
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

        const { blogId } = await params

        const deletedBlog = await Blog.findOneAndDelete({ _id: blogId, author: userId }).lean()


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