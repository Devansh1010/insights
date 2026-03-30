import seriesApi from "@/lib/seriesAxios"
import axios from "axios";

type FormData = {
    title: string;
    desc: string;
    tags: string[];
    isPublished: boolean;
};

export const getSeries = async (page: number, limit: number) => {
    try {
        const res = await seriesApi.get("", {
            params: { page, limit }
        });

        return res.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                error.response?.data?.message || "Failed to fetch series"
            );
        }

        throw new Error("Something went wrong");
    }
}

export const createSeries = async (data: FormData) => {
    try {
        const res = await seriesApi.post('', data)
        return res.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                error.response?.data?.message || "Failed to create series"
            );
        }

        throw new Error("Something went wrong");
    }
}

export const deleteSeries = async (id: string) => {
    try {
        const res = await seriesApi.delete(`/${id}`)
        return res.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                error.response?.data?.message || "Failed to delete series"
            );
        }

        throw new Error("Something went wrong");
    }
}