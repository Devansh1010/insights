import blogApi from "@/lib/blogAxios";
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
}

export const createBlog = async (data: CreateBlogVariables) => {
    try {

        const res = await blogApi.post("", data);

        if (res.data.success) {
            return res.data;
        }
        console.log(res.data)
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to fetch blog";
        toast.error(errorMessage);
        throw new Error("Failed to create blog");
    }
};

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

export const getBlog = async (slug: string) => {
    try {
        const response = await blogApi.get(`/${slug}`)
        if (response.status === 200) {
            return response.data.data;
        } else {
            toast.error(response.data.message || "Failed to fetch blog")
            return {};
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to fetch blog";
        toast.error(errorMessage);
        console.error("Error fetching blogs:", error);
        return {};
    }
}

export const getBlogs = async ({ page, limit }: { page: number, limit: number }) => {
    try {

        const response = await blogApi.get(`?page=${page}&limit=${limit}`);
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