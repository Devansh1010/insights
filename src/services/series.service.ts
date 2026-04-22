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

export const getSeriesById = async ({ id, page, limit }: { id: string, page: number, limit: number }) => {
    try {
        const res = await seriesApi.get(`/${id}?${page}&${limit}`);

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

export const getSeriesFormData = async ({ id }: { id: string }) => {
    try {
        const res = await seriesApi.get(`/get-series-form-data?id=${id}`);

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


