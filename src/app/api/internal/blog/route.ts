import { createResponse, StatusCode } from "@/lib/createResponse";
import Blog from "@/models/blog_modles/blog.model";
import SeriesBlog from "@/models/series_models/series-blog.model";
import Series from "@/models/series_models/series.model";
import { NextRequest } from "next/server";
import { calculateReadTime, validateContent } from "../../blog/route";
import { JSONContent } from "@tiptap/react";
import { dbConnect } from "@/lib/db";
import User from "@/models/user_models/user.model";
import { generateSlug } from "@/lib/slug-generater";

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

    // ================= PRE-CHECKS =================
    const existingBlog = await Blog.findOne({
      title: title.trim(),
      author: aiUser._id
    });

    if (existingBlog) {
      return createResponse(
        { success: false, message: "Blog with same title already exists" },
        StatusCode.BAD_REQUEST
      );
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
      author: aiUser._id,
      username: aiUser.username,
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