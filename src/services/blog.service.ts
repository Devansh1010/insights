import blogApi from "@/lib/axios/blogAxios";
// import { OutputData } from "@editorjs/editorjs";
import { JSONContent } from "@tiptap/react";
import { toast } from "sonner";

export interface CreateBlogVariables {
    blogId?: string
    title?: string;
    hook?: string
    content?: JSONContent;
    level?: string,
    insights?: string[],
    isPublished?: boolean;
    seriesId?: string;
    coverImage?: string;
    tags?: string[];
    seriesPartOf: string
}

export const deleteBlog = async (slug: string) => {
    try {
        const res = await blogApi.delete(`/${slug}`)

        if (res.data.success) {
            return res.data
        }

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to fetch blog";
        toast.error(errorMessage);
        throw new Error("Failed to create blog")
    }
}

export const updateBlog = async (data: CreateBlogVariables, slug?: string) => {
    try {
        const res = await blogApi.patch(`/${slug}`, data)

        if (res.data.success) {
            return res.data
        }
    } catch (error) {
        console.error("Failed to create blog", error)
        throw new Error("Failed to create blog")
    }
}

export async function getBlog(slug: string) {
    const response = await blogApi.get(`/${slug}`);

    return response.data.data;
}

export const getBlogs = async ({
    page,
    limit,
    tag,
    q,
}: {
    page: number;
    limit: number;
    tag?: string | null;
    q?: string | null;
}) => {
    try {

        const response = await blogApi.get(`?page=${page}&limit=${limit}&tag=${tag}&q=${q}`);
        if (response.status === 200) {

            return response.data.data;
        } else {
            return [];
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to fetch blog";
        toast.error(errorMessage);
        return [];
    }
}

export const getUserBlogs = async ({ page, limit, search }: { page: number, limit: number, search: string }) => {
    try {
        const response = await blogApi.get(`/get-user-blogs?page=${page}&limit=${limit}&search=${search}`);
        if (response.status === 200) {
            return response.data.data;
        } else {
            return [];
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to fetch blog";
        toast.error(errorMessage);
        return [];
    }
}