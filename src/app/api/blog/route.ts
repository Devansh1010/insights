import { createResponse, StatusCode } from "@/lib/createResponse";
import { dbConnect } from "@/lib/db";
import { generateSlug } from "@/lib/slug-generater";
import { VerifyUser } from "@/lib/verifyUser/userVerification";
import Blog from "@/models/blog_modles/blog.model";
import User from "@/models/user_models/user.model";
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

        if (!userId) {
            return createResponse(
                { success: false, message: "User ID not found" },
                StatusCode.NOT_FOUND
            )
        }

        const { title, content, tags, isPublished, coverImage } = await req.json();

        //validate the data
        if (!title) {
            return createResponse({
                success: false,
                message: "Please Provide Title"
            },
                StatusCode.BAD_REQUEST
            )
        }

        if (!content?.blocks?.length) {
            return createResponse(
                { success: false, message: "Content cannot be empty" },
                StatusCode.BAD_REQUEST
            )
        }

        // if (!coverImage) {
        //     return createResponse(
        //         { success: false, message: "Cover image is required" },
        //         StatusCode.BAD_REQUEST
        //     )
        // }

        const safeTags = Array.isArray(tags) ? tags : []

        await dbConnect()

        const existingBlog = await Blog.findOne({
            title,
            author: userId
        })

        //if blog exist then return error
        if (existingBlog) {
            return createResponse({
                success: false,
                message: "Blog with the same title already exists"
            },
                StatusCode.BAD_REQUEST
            )
        }

        //generate slug
        const slug = generateSlug(title)

        //if isPublished is true then set publishedAt to current date
        let publishedAt = undefined
        if (isPublished) {
            publishedAt = new Date()
        }

        //generate excerpt
        const excerpt =
            content?.blocks?.[0]?.data?.text?.slice(0, 150) || ""

        const user = await User.findById(userId).select("username").lean();

        if (!user) {
            return createResponse(
                { success: false, message: "User not found" },
                StatusCode.NOT_FOUND
            )
        }

        const newBlog = await Blog.create({
            title,
            content,
            slug,
            excerpt,
            author: userId,
            username: user?.username,
            tags: safeTags,
            coverImage,
            isPublished,
            publishedAt,
        })

        return createResponse({
            success: true,
            message: "Blog Created Successfully",
            data: newBlog
        },
            StatusCode.CREATED
        )

    } catch (error: unknown) {
        console.error("Error while creating post:", error)

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