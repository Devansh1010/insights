import { useQuery } from "@tanstack/react-query"
import { getBlog } from "../axios/article.axios"

export const useArticle = (slug?: string) => {

    const { data, isPending, isError, refetch } = useQuery({
        queryKey: ['blog', { slug }],
        queryFn: () => getBlog(slug!),
        staleTime: 1000 * 60 * 5,
        enabled: !!slug
    })

    return {
        article: data,
        isArticleFetching: isPending,
        isErrorOccured: isError,
        refetchArticles: refetch
    }
}