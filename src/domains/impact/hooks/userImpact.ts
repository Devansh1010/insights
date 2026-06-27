import { useQuery } from "@tanstack/react-query"
import { getUserEvents } from "../axios/impact.axios"

export const useImpact = (articleId: string) => {
    const { data: userEvents, isPending: isLoadingEvents } = useQuery({
        queryKey: ['impact', articleId],
        queryFn: () => getUserEvents(articleId),
    })

    return {
        userEvents,
        isLoadingEvents
    }
}