import { getBlog } from "@/services/blog.service"
import { useQuery } from "@tanstack/react-query"

export const useArticle = (slug: string) => {

    const { data, isPending, isError, refetch } = useQuery({
        queryKey: ['blog', { slug }],
        queryFn: () => getBlog(slug),
        staleTime: 1000 * 60 * 5,
    })

    return {
        article: data,
        isArticleFetching: isPending,
        isErrorOccured: isError,
        refetchArticles: refetch
    }
}