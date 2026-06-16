// hooks/useBlogs.ts

import { getBlogs } from "@/services/blog.service";
import { useQuery } from "@tanstack/react-query";

export function useBlogs({
    page,
    tag,
    q,
}: {
    page: number;
    tag: string | null;
    q: string | null;
}) {
    return useQuery({
        queryKey: ["blogs", { page, tag, q }],
        queryFn: () =>
            getBlogs({
                page,
                limit: page === 1 ? 11 : 10,
                tag,
                q,
            }),
    });
}