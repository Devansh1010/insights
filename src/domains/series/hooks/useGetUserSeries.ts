import { getUserSeries } from "@/services/series.service"
import { useQuery } from "@tanstack/react-query"


export const useGetUserSeries = () => {

    const { data, isPending, isError } = useQuery({
        queryKey: ['user-series'],
        queryFn: getUserSeries,
    })

    return {
        data,
        isPending,
        isError
    }
}
