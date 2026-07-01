
import BlogFeatured from './components/BlogFeatured';
import BlogRest from './components/BlogRest';
import { PaginationUI } from '../series/components/PaginationUi';
import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ArticleListError } from '@/domains/article/components/blog_page/_components/error/ArticleListError';
import { getTags } from '@/services/series.service';
import TopSeries from '../series/components/series-list/TopSeries';
import { EmptyState } from './components/EmptyState';
import { BlogsGridSkeleton } from './loader/BlogsGridSkeleton';
import { SeriesSkeleton } from './loader/SeriesSkeleton';
import { useSearchParams } from "next/navigation";
import { useExploreSearch } from '@/hooks/useExploreSearch';
import { useBlogs } from '@/hooks/blogs/useBlogs';
import { useSeries } from '@/hooks/series/useSeries';
import { ExploreSearch } from './components/explore/ExploreSearch';
import FilterSearch from './components/explore/FilterSearch';
import ActiveFilter from './components/explore/ActiveFilter';


const ExploreBlogs = () => {

    const [page, setPage] = useState(1);
    const [tagSearch, setTagSearch] = useState("");
    const searchParams = useSearchParams();
    const tag = searchParams.get("tag");

    const {
        search,
        setSearch,
        q,
    } = useExploreSearch();

    // Article Query
    const {
        data: blogsData,
        isLoading: isBlogsLoading,
        isError: isBlogsError,
        refetch: refetchBlogs,
    } = useBlogs({ page, tag, q });

    // Series Query
    const {
        data: seriesData,
        isLoading: isSeriesLoading,
        isError: isSeriesError,
        refetch: refetchSeries
    } = useSeries({ tag, q })

    const { data: tags, isPending: isTagPending } = useQuery({
        queryKey: ["tags"],
        queryFn: getTags,
    });

    const filteredTags = useMemo(() => {
        return (
            tags?.filter((tag: { _id: string, name: string }) =>
                tag.name
                    .toLowerCase()
                    .includes(tagSearch.toLowerCase())
            ) || []
        );
    }, [tags, tagSearch]);

    const isInitialPage = page === 1;
    const seriesList = seriesData?.data || [];

    const blogs = blogsData?.blogs || [];

    const restBlogs =
        blogsData?.featuredBlog
            ? blogs.filter(
                (blog: { _id: string }) =>
                    blog._id !== blogsData.featuredBlog._id
            )
            : blogs;


    return (
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">

            {/* HEADER */}
            <section className="mb-20">

                <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                    {/* Left */}
                    <div>
                        <h2 className="text-2xl font-semibold tracking-tight">
                            {tag || q
                                ? "Related Series"
                                : "Trending Series"}
                        </h2>
                    </div>

                    {/* Right */}
                    <div className="flex flex-col items-end gap-3">

                        <div className='flex items-center gap-3'>
                            {/* Search */}
                            <ExploreSearch
                                value={search}
                                onChange={setSearch}
                            />

                            {/* Filter */}
                            <FilterSearch
                                tagSearch={tagSearch}
                                setTagSearch={setTagSearch}
                                isTagPending={isTagPending}
                                filteredTags={filteredTags}

                            />
                        </div>

                        <ActiveFilter tag={tag} />
                    </div>
                </div>

                {isSeriesLoading ? (
                    <SeriesSkeleton />
                ) : isSeriesError ? (
                    <ArticleListError reset={refetchSeries} />
                ) : (
                    <TopSeries
                        isInitialPage={isInitialPage}
                        featuredSeries={seriesList}
                    />
                )}

            </section>


            {/* ARTICLES */}
            <section className="space-y-10">

                <div className="flex items-center justify-between pb-1">

                    <h2 className="text-xl font-semibold">
                        {tag || q
                            ? "Results"
                            : "Latest Articles"}
                    </h2>

                    <span className="text-sm text-muted-foreground">
                        {blogsData?.pagination?.total || 0} articles
                    </span>

                </div>

                <div className="min-h-125">

                    {isBlogsLoading ? (
                        <BlogsGridSkeleton />
                    ) : isBlogsError ? (
                        <ArticleListError reset={refetchBlogs} />
                    ) : (
                        <>
                            {/* Featured Blog */}
                            {isInitialPage &&
                                blogsData?.featuredBlog && (
                                    <div className="mb-20">
                                        <BlogFeatured
                                            featured={blogsData.featuredBlog}
                                        />
                                    </div>
                                )}

                            {/* Rest Blogs */}
                            {restBlogs.length > 0 ? (
                                <BlogRest rest={restBlogs} />
                            ) : (
                                !blogsData?.featuredBlog && (
                                    <EmptyState
                                        message={
                                            tag
                                                ? `No articles found for #${tag}`
                                                : q
                                                    ? `No results found for "${q}"`
                                                    : "No articles found."
                                        }
                                    />
                                )
                            )}
                        </>
                    )}

                </div>

            </section>

            {/* PAGINATION */}
            {!isBlogsLoading &&
                !isBlogsError &&
                blogsData?.pagination?.totalPages > 1 && (

                    <footer className="mt-24 border-t pt-12">

                        <PaginationUI
                            page={page}
                            totalPages={
                                blogsData?.pagination?.totalPages || 1
                            }
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