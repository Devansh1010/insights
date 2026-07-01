import axios from "axios"
import { ImpactEventType } from "../constants"
import { toast } from "sonner"

const impactApi = axios.create({
    baseURL: "/api/impact",
    withCredentials: true
})

type CreateRequestData = {
    articleId: string,
    authorId: string
    eventType: ImpactEventType,
    metadata?: Record<string, unknown>
}

export const createImpact = async ({ articleId, authorId, eventType, metadata }: CreateRequestData) => {
    try {
     await impactApi.post('/', { articleId, authorId, eventType, metadata })

    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        if(errorMessage === 'Request failed with status code 429')
        toast.error("Too many requests")
    }

}

export const getUserEvents = async (articleId: string) => {
    const res = await impactApi.get(`?articleId=${articleId}`,)
    if (res.data.success) {
        return res.data.data
    } else {
        return []
    }

}

