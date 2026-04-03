import blogApi from "@/lib/blogAxios";
import { OutputData } from "@editorjs/editorjs";

export interface CreateBlogVariables {
    title: string;
    content: OutputData;
    isPublished: boolean;
    seriesId: string;
    coverImage: string;
    tags: string[];
}

export const createBlog = async (data: CreateBlogVariables) => {
    try {

        const res = await blogApi.post("", data);

        if (res.data.success) {
            return res.data;
        }
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
        console.error("Failed to create blog", error)
        throw new Error("Failed to create blog")
    }
}

export const updateBlog = async (blogId: string, title: string, content: OutputData, isPublished: boolean) => {
    try {
        const res = await blogApi.patch(`/${blogId}`, {
            title,
            content,
            isPublished,
        })

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
        const response = await blogApi.get(`?${page}&${limit}`);
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