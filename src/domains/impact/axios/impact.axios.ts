import axios from "axios"
import { ImpactEventType } from "../constants"

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
    await impactApi.post('/', { articleId, authorId, eventType, metadata })
}

export const getUserEvents = async (articleId: string) => {
    const res = await impactApi.get(`?articleId=${articleId}`,)
    if (res.data.success) {
        return res.data.data
    } else {
        return []
    }

}

