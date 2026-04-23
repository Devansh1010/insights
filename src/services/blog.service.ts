import blogApi from "@/lib/blogAxios";
// import { OutputData } from "@editorjs/editorjs";
import { JSONContent } from "@tiptap/react";

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
        console.error("Failed to create blog", error);
        throw new Error("Failed to create blog");
    }
};

export const deleteBlog = async (blogId: string) => {
    try {
        const res = await blogApi.delete(`/${blogId}`)

        if (res.data.success) {
            return res.data
        }

    } catch (error) {
        throw new Error("Failed to create blog")
    }
}

export const updateBlog = async (data: CreateBlogVariables, blogId?: string) => {
    try {
        const res = await blogApi.patch(`/${blogId}`, data)

        if (res.data.success) {
            return res.data
        }
    } catch (error) {
        console.error("Failed to create blog", error)
        throw new Error("Failed to create blog")
    }
}

export const getBlog = async (blogId: string) => {
    try {
        const response = await blogApi.get(`/${blogId}`)
        if (response.status === 200) {
            return response.data.data;
        } else {
            return {};
        }
    } catch (error) {
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
        console.error("Error fetching blogs:", error);
        return [];
    }
}

export const getUserBlogs = async () => {
    try {
        const response = await blogApi.get('/get-user-blogs');
        if (response.status === 200) {
            return response.data.data;
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return [];
    }
}