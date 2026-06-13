import { createResponse, StatusCode } from "@/lib/createResponse";
import { dbConnect } from "@/lib/db";
import { generateSlug } from "@/lib/slug-generater";
import { VerifyUser } from "@/lib/verifyUser/userVerification";
import Blog from "@/models/blog_modles/blog.model";
import SeriesBlog from "@/models/series_models/series-blog.model";
import User from "@/models/user_models/user.model";
import { NextRequest } from "next/server";
import Series from "@/models/series_models/series.model";
// import { OutputBlockData } from "@editorjs/editorjs";
import { JSONContent } from "@tiptap/react";
import { TiptapContent, TiptapNode } from "@/types/blog";
// import { TiptapContent, TiptapNode } from "@/types/blog";


interface BlogFilter {
    isPublished: boolean;
    tags?: string | { $in: string[] } | { $regex: string, $options: string };
    $or?: Array<{ [key: string]: { $regex: string; $options: string } }>;
}


const hasValidText = (nodes?: JSONContent[]): boolean => {
    if (!nodes) return false;

    return nodes.some(node => {
        if (node.text && node.text.trim().length > 0) return true;
        if (node.content) return hasValidText(node.content);
        return false;
    });
};

export const validateContent = (content: JSONContent): boolean => {
    if (!content?.content || content.content.length === 0) {
        return false;
    }

    return hasValidText(content.content);
};

function extractTextFromTiptap(node: TiptapNode): string {

    const words = node.content?.reduce((acc, node) => (acc += node.text || ''), '')

    return words || ''

}

export function calculateReadTime(content: TiptapContent): number {

    const fullText = content.content
        .map((node) => extractTextFromTiptap(node))
        .join(" ");

    const words = fullText.trim().split(/\s+/).filter(Boolean).length;

    const wordsPerMinute = 130;

    return Math.max(1, Math.ceil(words / wordsPerMinute));
}

export async function POST(req: Request) {
    try {

        // ================= AUTH =================
        const auth = await VerifyUser();

        if (!auth.success || !auth.user?._id) {
            return createResponse(
                { success: false, message: "Unauthorized" },
                StatusCode.UNAUTHORIZED
            );
        }

        const userId = auth.user._id;

        // ================= BODY =================
        const body = await req.json();

        const {
            title,
            content,
            tags = [],
            isPublished,
            coverImage,
            seriesId,
            hook,
            insights,
            level
        } = body;

        // ================= VALIDATION =================
        if (!title?.trim()) {
            return createResponse(
                { success: false, message: "Title is required" },
                StatusCode.BAD_REQUEST
            );
        }

        if (!validateContent(content)) {
            return createResponse(
                { success: false, message: "Content cannot be empty" },
                StatusCode.BAD_REQUEST
            );
        }

        await dbConnect();

        // ================= PRE-CHECKS =================
        const existingBlog = await Blog.findOne({
            title: title.trim(),
            author: userId
        });

        if (existingBlog) {
            return createResponse(
                { success: false, message: "Blog with same title already exists" },
                StatusCode.BAD_REQUEST
            );
        }

        const user = await User.findById(userId).select("username").lean();
        if (!user) {
            return createResponse({ success: false, message: "User not found" }, StatusCode.NOT_FOUND);
        }

        // ================= SLUG =================
        const slug = generateSlug(title);

        // ================= EXCERPT =================

        const firstTextBlock = content.content?.find(
            (block: JSONContent) =>
                (block.type === "paragraph" || block.type === "heading") &&
                block.content
        );

        const rawText =
            firstTextBlock?.content
                ?.map((node: JSONContent) => node.text || "")
                .join("") || "";


        const excerpt = rawText.replace(/<[^>]*>/g, "").slice(0, 150);


        const readTime = calculateReadTime(content);

        // ================= CREATE BLOG =================
        const newBlog = await Blog.create({
            title: title.trim(),
            hook: hook?.trim() || '',
            content,
            slug,
            excerpt,
            seriesPartOf: seriesId,
            author: userId,
            username: user.username,
            tags: Array.isArray(tags) ? tags : [],
            coverImage: coverImage || "",
            level,
            readTime,
            isPublished,
            insights,
            publishedAt: isPublished ? new Date() : undefined,
        });

        // ================= SERIES =================
        if (seriesId) {
            const seriesExists = await Series.findById(seriesId);

            if (seriesExists) {
                const lastBlog = await SeriesBlog
                    .findOne({ series: seriesId })
                    .sort({ order: -1 });

                const order = lastBlog ? lastBlog.order + 1 : 1;

                await SeriesBlog.create({
                    series: seriesId,
                    blog: newBlog._id,
                    order,
                });
            }
        }

        // ================= RESPONSE =================
        return createResponse(
            {
                success: true,
                message: "Blog Created Successfully",
                data: newBlog
            },
            StatusCode.CREATED
        );

    } catch (error) {

        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        return createResponse(
            { success: false, message: errorMessage || "Internal Server Error" },
            StatusCode.INTERNAL_ERROR
        );
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

        const filter: BlogFilter = {
            isPublished: true,
        };

        // 2. Handle tags safely
        if (tag && tag !== 'null' && tag !== 'undefined') {
            filter.tags = { $in: [tag] };
        }

        // 3. Handle search query safely
        if (q && q.trim() !== '' && q !== 'null' && q !== 'undefined') {
            const escapedQuery = q.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');

            filter.$or = [
                { title: { $regex: escapedQuery, $options: "i" } },
                { excerpt: { $regex: escapedQuery, $options: "i" } },
                { hook: { $regex: escapedQuery, $options: "i" } }
            ];
        }

        const blogs = await Blog.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .select(
                "username title slug excerpt coverImage tags publishedAt hook insights level readTime views likes"
            )
            .lean();

        const total = await Blog.countDocuments({ isPublished: true });

        //logic to get one featured blog by its maximum views

        const featuredBlog = blogs.length > 0 ? blogs.reduce(
            (prev, current) => (prev.views > current.views) ? prev : current) : null;

        return createResponse(
            {
                success: true, message: "Blogs retrieved successfully", data: {
                    blogs,
                    featuredBlog,
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