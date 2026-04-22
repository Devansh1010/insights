'use client';
import { Layers, PlusCircle } from "lucide-react";
import { ExploreBlogsLoader } from "../blogs/loader/ExploreBlogsLoader";
import { useQuery } from "@tanstack/react-query";
import { getUserSeries } from "@/services/series.service";
import { BlogListError } from "../blogs/error/BlogsListError";
import { Series } from "@/types/frontend/series";
import { SeriesCard } from "./components/series-list/SeriesCard";
import SeriesForm from "./components/SeriesForm";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const SeriesList = () => {
    const [openCreate, setOpenCreate] = useState(false);

    const { data: seriesData, isPending, isError, refetch } = useQuery({
        queryKey: ['series'],
        queryFn: () => getUserSeries(),
    });

    if (isPending) return <ExploreBlogsLoader />;
    if (isError) return <BlogListError reset={refetch} />;


    return (
        <div className="max-w-7xl min-h-screen mx-auto px-6 py-20 flex flex-col justify-center">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Your Collections</h2>
                    <p className="text-muted-foreground mt-1">Manage and organize your curated learning paths.</p>
                </div>
                <div>
                    <SeriesForm
                        open={openCreate}
                        setOpen={setOpenCreate}
                        trigger={
                            <Button variant="outline">
                                <PlusCircle className="mr-2 h-4 w-4" />
                                New Series
                            </Button>
                        }
                    />
                </div>
            </div>

            {seriesData?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {seriesData?.map((series: Series) => (
                        <SeriesCard key={series._id} series={series} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 border-2 border-dashed rounded-[3rem]">
                    <Layers className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No series yet</h3>
                    <p className="text-muted-foreground">Start grouping your articles into a series.</p>
                </div>
            )}
        </div>
    );
};

export default SeriesList;