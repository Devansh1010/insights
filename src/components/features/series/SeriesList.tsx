'use client'

import { getSeries } from "@/services/series"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react";
import { PaginationUI } from "./PaginationUi";
import { SeriesSkeleton } from "./loader/SeriesListLoader";
import { SeriesError } from "./error/SeriesError";
import { useSeriesFilters } from "@/hooks/series/useServiceFilter";
import SeriesFeatured from "./SeriesFeatured";
import SeriesRest from "./SeriesRest";
import SeriesHeader from "./SeriesHeader";


export type Series = {
    _id: string,
    author: { username: string },
    title: string,
    slug: string,
    desc: string,
    tags: string[],
    coverImage: string,
    createdAt: Date
}

const SeriesList = () => {
    const [page, setPage] = useState(1);
    const limit = 10;

    // Tanstack Query
    const queryClient = useQueryClient();

    const { data, isPending, isError, refetch } = useQuery({
        queryKey: ['series', { page }],
        queryFn: () => getSeries(page, limit),
    })

    useEffect(() => {
        if (!data || page >= data.data.pagination.totalPages) return;
        queryClient.prefetchQuery({
            queryKey: ["series", { page: page + 1 }],
            queryFn: () => getSeries(page + 1, limit),
        });
    }, [page, data, queryClient]);

    const {
        featured, rest
    } = useSeriesFilters(data?.data?.series || []);


    if (isPending) return <SeriesSkeleton />; 
    if (isError) return <SeriesError reset={refetch} />;

    const { pagination } = data.data;

    return (
        <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="container mx-auto">
                {/* 1. Header & Search - Centered Layout */}
                <SeriesHeader page={page} limit={limit}/>

                <div className="space-y-4">
                    <SeriesFeatured series={featured} page={page} />

                    <SeriesRest series={rest} />

                    <footer className="flex justify-center pt-16 border-t border-slate-100">
                        <PaginationUI
                            page={page}
                            totalPages={pagination.totalPages}
                            onPageChange={setPage}
                        />
                    </footer>
                </div>
            </div>
        </div>
    );
}

export default SeriesList