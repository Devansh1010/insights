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
    const res = await impactApi.post('/', { articleId, authorId, eventType, metadata })

    if (res.data.success) {
        toast.success(res.data.message || "Event Saved Successfully")
    }
}

export const getUserEvents = async (articleId: string) => {
    const res = await impactApi.get(`?articleId=${articleId}`,)
    if (res.data.success) {
        return res.data.data
    } else {
        return {}
    }

}

