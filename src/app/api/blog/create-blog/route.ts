import { createResponse, StatusCode } from "@/lib/createResponse";
import { dbConnect } from "@/lib/db";
import { generateSlug } from "@/lib/slug-generater";
import { VerifyUser } from "@/lib/verifyUser/userVerification";
import Blog from "@/models/blog_modles/blog.model";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const auth = await VerifyUser();

        console.log("Auth in Create: ", auth)

        if (!auth.success || !auth.user?._id) {
            return createResponse(
                { success: false, message: "Unauthorized" },
                StatusCode.UNAUTHORIZED
            );
        }
        const userId = auth.user._id;

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

        const newBlog = new Blog({
            title,
            content,
            slug,
            excerpt,
            author: userId,
            tags: safeTags,
            coverImage,
            isPublished,
            publishedAt,
        })

        await newBlog.save()

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