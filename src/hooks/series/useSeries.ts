// hooks/useSeries.ts

import { getSeries } from "@/services/series.service";
import { useQuery } from "@tanstack/react-query";

export function useSeries({
    tag,
    q,
}: {
    tag: string | null;
    q: string | null;
}) {
    return useQuery({
        queryKey: ["series", { tag, q }],
        queryFn: () =>
            getSeries({
                tag,
                q,
            }),
    });
}