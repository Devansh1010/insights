import seriesApi from "@/lib/seriesAxios"
import axios from "axios";

type FormData = {
    title: string;
    desc: string;
    tags: string[];
    isPublished: boolean;
};

export const getSeries = async () => {
    try {

        const res = await seriesApi.get("");

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

export const updateSeries = async (id: string, data: FormData) => {
    try {
        const res = await seriesApi.patch(`/${id}`, data)
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

export const deleteSeries = async (slug: string) => {
    try {
        const res = await seriesApi.delete(`/${slug}`)
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

export const getSeriesBySlug = async ({ slug, page, limit, search }: { slug: string, page: number, limit: number, search?: string }) => {
    try {
        const res = await seriesApi.get(`/${slug}?page=${page}&limit=${limit}&search=${search}`);

        return res.data.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                error.response?.data?.message || "Failed to fetch series"
            );
        }

        throw new Error("Something went wrong");
    }
}

export const getUserSeries = async () => {
    try {
        const res = await axios.get('/api/user/get-user-series');

        return res.data.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                error.response?.data?.message || "Failed to fetch series"
            );
        }

        throw new Error("Something went wrong");
    }
}

export const getSeriesFormData = async ({ slug }: { slug: string }) => {
    try {
        const res = await seriesApi.get(`/get-series-form-data?slug=${slug}`);

        return res.data.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                error.response?.data?.message || "Failed to fetch series"
            );
        }

        throw new Error("Something went wrong");
    }
}


