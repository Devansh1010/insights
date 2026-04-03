import { createResponse, StatusCode } from "@/lib/createResponse";
import { dbConnect } from "@/lib/db";
import { generateSlug } from "@/lib/slug-generater";
import { VerifyUser } from "@/lib/verifyUser/userVerification";
import Blog from "@/models/blog_modles/blog.model";
import SeriesBlog from "@/models/series_models/series-blog.model";
import User from "@/models/user_models/user.model";
import { NextRequest } from "next/server";
import Series from "@/models/series_models/series.model";
import { OutputBlockData } from "@editorjs/editorjs";



export async function POST(req: Request) {
    try {
        const auth = await VerifyUser();

        if (!auth.success || !auth.user?._id) {
            return createResponse(
                { success: false, message: "Unauthorized" },
                StatusCode.UNAUTHORIZED
            );
        }

        const userId = auth.user._id;
        const body = await req.json();
        console.log(body)
        const { title, content, tags, isPublished, coverImage, seriesId } = body;

        // 1. VALIDATION
        if (!title?.trim()) {
            return createResponse({ success: false, message: "Title is required" }, StatusCode.BAD_REQUEST);
        }

        if (!content || !Array.isArray(content.blocks) || content.blocks.length === 0) {
            return createResponse({ success: false, message: "Content cannot be empty" }, StatusCode.BAD_REQUEST);
        }

        await dbConnect();

        // 2. PRE-CHECKS
        const existingBlog = await Blog.findOne({ title: title.trim(), author: userId });
        if (existingBlog) {
            return createResponse({ success: false, message: "Blog with same title already exists" }, StatusCode.BAD_REQUEST);
        }

        const user = await User.findById(userId).select("username").lean();
        if (!user) {
            return createResponse({ success: false, message: "User not found" }, StatusCode.NOT_FOUND);
        }

        // 3. METADATA PREP
        let slug = generateSlug(title);
        const slugExists = await Blog.exists({ slug });
        if (slugExists) slug = `${slug}-${Date.now()}`;

        const firstTextBlock = content.blocks.find((b: OutputBlockData) => b.type === 'paragraph' || b.type === 'header');
        const excerpt = firstTextBlock?.data?.text?.replace(/<[^>]*>/g, '').slice(0, 150) || "";

        // 4. CREATE BLOG (Direct approach)
        const newBlog = await Blog.create({
            title: title.trim(),
            content,
            slug,
            excerpt,
            author: userId,
            username: user.username,
            tags: Array.isArray(tags) ? tags : [],
            coverImage: coverImage.url,
            isPublished,
            publishedAt: isPublished ? new Date() : undefined,
        });

        // 5. HANDLE SERIES LINKING
        if (seriesId) {
            const seriesExists = await Series.findById(seriesId);

            if (!seriesExists) {
                // Since we aren't using transactions, we manually handle the "orphan" blog 
                // if the series check fails, or just proceed. 
                return createResponse({ success: true, message: "Blog created but series not found", data: newBlog }, StatusCode.CREATED);
            }

            const lastBlogInSeries = await SeriesBlog.findOne({ series: seriesId }).sort({ order: -1 });
            const newOrder = lastBlogInSeries ? lastBlogInSeries.order + 1 : 1;

            await SeriesBlog.create({
                series: seriesId,
                blog: newBlog._id,
                order: newOrder,
            });
        }

        return createResponse(
            { success: true, message: "Blog Created Successfully", data: newBlog },
            StatusCode.CREATED
        );

    } catch (error) {
        console.error("Critical Error:", error);

        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        return createResponse(
            { success: false, message: errorMessage || "Internal Server Error" },
            StatusCode.INTERNAL_ERROR
        );
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
        const userId = auth.user._id;

        if (!userId) {
            return createResponse(
                { success: false, message: "User ID not found" },
                StatusCode.NOT_FOUND
            )
        }

        const { searchParams } = new URL(req.url);

        const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
        const limit = Math.min(20, parseInt(searchParams.get("limit") || "10"));

        const skip = (page - 1) * limit;

        await dbConnect()

        const blogs = await Blog.find({ isPublished: true })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .select('username title slug excerpt coverImage tags publishedAt')
            .lean()

        const total = await Blog.countDocuments({ isPublished: true });

        return createResponse(
            {
                success: true, message: "Blogs retrieved successfully", data: {
                    blogs,
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
        console.error("Error getting blogs:", error)

        return createResponse(
            {
                success: false,
                message: "Internal Server Error",
            },
            StatusCode.INTERNAL_ERROR
        )
    }
}