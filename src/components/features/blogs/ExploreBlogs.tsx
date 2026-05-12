
import { Separator } from '@/components/ui/separator';
import BlogFeatured from './components/BlogFeatured';
import BlogRest from './components/BlogRest';
import { PaginationUI } from '../series/components/PaginationUi';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getBlogs } from '@/services/blog.service';
import { BlogListError } from './error/BlogsListError';
import { getSeries } from '@/services/series.service';
import TopSeries from '../series/components/series-list/TopSeries';
import { Blog } from '@/types/frontend/blog';
import { EmptyState } from './components/EmptyState';
import { BlogsGridSkeleton } from './loader/BlogsGridSkeleton';
import { SeriesSkeleton } from './loader/SeriesSkeleton';



const ExploreBlogs = () => {
    const [page, setPage] = useState(1);
    const limit = 10;

    // Article Query
    const { 
        data: blogsData, 
        isLoading: isBlogsLoading, // Use isLoading for initial fetch
        isError: isBlogsError, 
        refetch: refetchBlogs 
    } = useQuery({
        queryKey: ['blogs', { page }],
        queryFn: () => getBlogs({ page, limit: page === 1 ? 11 : limit }),
    });

    // Series Query
    const { 
        data: seriesData, 
        isLoading: isSeriesLoading, 
        isError: isSeriesError, 
        refetch: refetchSeries 
    } = useQuery({
        queryKey: ['series'],
        queryFn: () => getSeries(),
    });

    const isInitialPage = page === 1;
    const seriesList = seriesData?.data || [];
    const allBlogs = blogsData?.blogs || [];
    const featuredBlog = isInitialPage ? blogsData?.featuredBlog : null;

    const restBlogs = isInitialPage
        ? allBlogs.filter((blog: Blog) => blog._id !== featuredBlog?._id)
        : allBlogs;

    return (
        <div className="max-w-7xl mx-auto px-6 py-5">
            {/* --- HEADER SECTION --- */}
            <header className="flex flex-col gap-5">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                    <div className="max-w-3xl space-y-2">
                        <h1 className="text-3xl md:text-5xl font-serif font-bold leading-tight text-foreground">
                            {isInitialPage ? "Series of the Week" : "Index Collection"}
                        </h1>
                        <p className="text-sm font-serif md:text-base text-muted-foreground/80 leading-relaxed max-w-xl">
                            {isInitialPage
                                ? "A curated selection of architectural deep-dives and engineering principles worth mastering this week."
                                : `Systematic overview of all published works. Currently viewing page ${page}.`}
                        </p>
                    </div>
                </div>
            </header>

            {/* --- 1. FEATURED SERIES SECTION --- */}
            <div className="mb-20 mt-10 transition-all duration-500 ease-in-out">
                {isSeriesLoading ? (
                    <SeriesSkeleton /> // Specific Loader for Series
                ) : isSeriesError ? (
                    <BlogListError reset={refetchSeries}  />
                ) : (
                    <TopSeries isInitialPage={isInitialPage} featuredSeries={seriesList} />
                )}
            </div>

            {/* --- 2. FEATURED BLOG & GRID SECTION --- */}
            <section className="space-y-10">
                <div className="flex items-baseline justify-between border-b pb-4">
                    <h3 className="text-xl font-bold tracking-tight uppercase">
                        {isInitialPage ? "Recent Publications" : "All Articles"}
                    </h3>
                </div>

                <div className="min-h-100">
                    {isBlogsLoading ? (
                        <BlogsGridSkeleton /> // Specific Loader for Blogs
                    ) : isBlogsError ? (
                        <BlogListError reset={refetchBlogs} />
                    ) : (
                        <>
                            {/* Featured Blog Logic */}
                            {isInitialPage && featuredBlog && (
                                <div className="group mb-20">
                                    <BlogFeatured featured={featuredBlog} />
                                    <Separator className="my-20 opacity-30" />
                                </div>
                            )}

                            {/* Grid Logic */}
                            {restBlogs.length > 0 ? (
                                <BlogRest rest={restBlogs} />
                            ) : (
                                <EmptyState message="No articles found in this collection." />
                            )}
                        </>
                    )}
                </div>
            </section>

            {/* --- 4. PAGINATION --- */}
            {!isBlogsLoading && !isBlogsError && blogsData?.pagination?.totalPages > 1 && (
                <footer className="flex justify-center pt-12 border-t mt-24">
                    <PaginationUI
                        page={page}
                        totalPages={blogsData?.pagination?.totalPages || 1}
                        onPageChange={(newPage) => {
                            setPage(newPage);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                    />
                </footer>
            )}
        </div>
    );
};

export default ExploreBlogs