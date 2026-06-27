import adminApi from "@/lib/axios/adminAxios";
import { CreateBlogVariables } from "@/services/blog.service";
import axios from "axios"

const blogApi = axios.create({
    baseURL: "/api/blog",
    withCredentials: true
})

export default blogApi

// Fetch Tags
export const getTags = async () => {

    const res = await adminApi.get(``);

    return res.data.data.categories;

}

export async function getBlog(slug: string) {
    const response = await blogApi.get(`/${slug}`);

    return response.data.data;
}

export const updateArticle = async (data: CreateBlogVariables, slug?: string) => {

    const res = await blogApi.patch(`/${slug}`, data)

    return res.data

}