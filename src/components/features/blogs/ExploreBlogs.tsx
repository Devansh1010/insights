
import BlogFeatured from './components/BlogFeatured';
import BlogRest from './components/BlogRest';
import { PaginationUI } from '../series/components/PaginationUi';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getBlogs } from '@/services/blog.service';
import { BlogListError } from './error/BlogsListError';
import { getSeries, getTags } from '@/services/series.service';
import TopSeries from '../series/components/series-list/TopSeries';
import { EmptyState } from './components/EmptyState';
import { BlogsGridSkeleton } from './loader/BlogsGridSkeleton';
import { SeriesSkeleton } from './loader/SeriesSkeleton';
import { useRouter, useSearchParams } from "next/navigation";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/helpers/useDebounce';


const ExploreBlogs = () => {

    const [page, setPage] = useState(1);
    const [tagSearch, setTagSearch] = useState("");

    const limit = 10;

    const searchParams = useSearchParams();
    const tag = searchParams.get("tag");
    const q = searchParams.get("q");


    const router = useRouter()

    const debouncedQ = useDebounce(q, 500);

    // Article Query
    const {
        data: blogsData,
        isLoading: isBlogsLoading, // Use isLoading for initial fetch
        isError: isBlogsError,
        refetch: refetchBlogs
    } = useQuery({
        queryKey: [
            "blogs",
            {
                page,
                tag,
                q: debouncedQ,
            },
        ],
        queryFn: () =>
            getBlogs({
                page,
                limit: page === 1 ? 11 : limit,
                tag,
                q: debouncedQ,
            })
    });

    const [search, setSearch] = useState(q ?? "");
    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());

        if (debouncedSearch.trim()) {
            params.set("q", debouncedSearch.trim());
        } else {
            params.delete("q");
        }

        params.delete("page");

        router.replace(`/user/explore?${params.toString()}`);
    }, [debouncedSearch, router, searchParams]);

    // Series Query
    const {
        data: seriesData,
        isLoading: isSeriesLoading,
        isError: isSeriesError,
        refetch: refetchSeries
    } = useQuery({
        queryKey: [
            "series",
            {
                tag,
                q,
            },
        ],
        queryFn: () =>
            getSeries({
                tag,
                q,
            }),
    });

    const { data: tags, isPending: isTagPending } = useQuery({
        queryKey: ["tags"],
        queryFn: getTags,
    });

    const filteredTags =
        tags?.filter((tag: { _id: string; name: string }) =>
            tag.name
                .toLowerCase()
                .includes(tagSearch.toLowerCase())
        ) || [];

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
                            <div className="relative w-[320px]">

                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                                <Input
                                    value={search}
                                    placeholder="Search..."
                                    className="h-10 pl-10"
                                    onChange={(e) => setSearch(e.target.value)}
                                />

                            </div>

                            {/* Filter */}
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                    >
                                        <SlidersHorizontal className="h-4 w-4" />
                                    </Button>
                                </PopoverTrigger>

                                <PopoverContent
                                    align="end"
                                    className="w-80 p-0"
                                >
                                    <div className="border-b p-3">
                                        <Input
                                            placeholder="Search tags..."
                                            value={tagSearch}
                                            onChange={(e) =>
                                                setTagSearch(e.target.value)
                                            }
                                        />
                                    </div>

                                    <div className="max-h-80 overflow-y-auto p-2">

                                        {isTagPending ? (
                                            <div className="p-2 text-sm text-muted-foreground">
                                                Loading tags...
                                            </div>
                                        ) : filteredTags.length > 0 ? (
                                            filteredTags.map(
                                                (tagItem: {
                                                    _id: string;
                                                    name: string;
                                                }) => (
                                                    <button
                                                        key={tagItem._id}
                                                        className="
                            flex w-full items-center
                            rounded-md px-3 py-2
                            text-left text-sm
                            hover:bg-muted
                        "
                                                        onClick={() => {

                                                            const params =
                                                                new URLSearchParams(
                                                                    searchParams.toString()
                                                                );

                                                            params.set(
                                                                "tag",
                                                                tagItem.name
                                                            );

                                                            params.delete("page");

                                                            router.push(
                                                                `/user/explore?${params.toString()}`
                                                            );
                                                        }}
                                                    >
                                                        #{tagItem.name}
                                                    </button>
                                                )
                                            )
                                        ) : (
                                            <div className="p-3 text-sm text-muted-foreground">
                                                No tags found
                                            </div>
                                        )}

                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div>
                            {/* Active Filters */}
                            {(tag) && (
                                <div className="mb-6 flex flex-wrap items-center gap-2">

                                    {tag && (
                                        <Badge variant="secondary">
                                            #{tag}
                                        </Badge>
                                    )}

                                    {/* {q && (
                            <Badge variant="secondary">
                                {q}
                            </Badge>
                        )} */}

                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() =>
                                            router.push("/user/explore")
                                        }
                                    >
                                        Clear
                                    </Button>

                                </div>
                            )}
                        </div>

                    </div>


                </div>

                {isSeriesLoading ? (
                    <SeriesSkeleton />
                ) : isSeriesError ? (
                    <BlogListError reset={refetchSeries} />
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

                <div className="min-h-[500px]">

                    {isBlogsLoading ? (
                        <BlogsGridSkeleton />
                    ) : isBlogsError ? (
                        <BlogListError reset={refetchBlogs} />
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

                                const params =
                                    new URLSearchParams(
                                        searchParams.toString()
                                    );

                                params.set(
                                    "page",
                                    String(newPage)
                                );

                                router.push(
                                    `/user/explore ? ${params.toString()}`
                                );

                                window.scrollTo({
                                    top: 0,
                                    behavior: "smooth",
                                });
                            }}
                        />

                    </footer>
                )}

        </div>

    );
};

export default ExploreBlogs