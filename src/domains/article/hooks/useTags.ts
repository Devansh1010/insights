import { getTags } from "@/services/series.service";
import { useQuery } from "@tanstack/react-query"


export const useTags = () => {

    const { data: Tags, isPending: isTagPendding, error: tagsError, refetch: tagsRefetch  } = useQuery({
        queryKey: ['tags'],
        queryFn: () => getTags(),
    });

    return {
        Tags,
        isTagPendding,
        tagsError,
        tagsRefetch
    }
}