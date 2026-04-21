
import { Separator } from '@/components/ui/separator';
import { useBlogsFilters } from '@/hooks/blogs/useBlogsFilter';
import BlogFeatured from './components/BlogFeatured';
import BlogRest from './components/BlogRest';
import { PaginationUI } from '../series/components/PaginationUi';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getBlogs } from '@/services/blog.service';
import { ExploreBlogsLoader } from './loader/ExploreBlogsLoader';
import { BlogListError } from './error/BlogsListError';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { getSeries } from '@/services/series.service';
import Link from 'next/link';
import Image from 'next/image';
import TopSeries from '../series/components/series-list/TopSeries';



const ExploreBlogs = () => {
    const [page, setPage] = useState(1);

    const limit = 10;

    // Article Query
    const { data: blogsData, isPending: isBlogsPending, isError: isBlogsError, refetch: refetchBlogs } = useQuery({
        queryKey: ['blogs', { page }],
        queryFn: () => getBlogs({ page, limit }),
    })

    // Series Query
    const { data: seriesData, isPending: isSeriesPending, isError: isSeriesError, refetch: refetchSeries } = useQuery({
        queryKey: ['series', { page }],
        queryFn: () => getSeries(),
    })


    // const {
    //     featured, rest, searchQuery, setSearchQuery
    // } = useBlogsFilters(data?.blogs || [], page);


    if (isBlogsPending || isSeriesPending) return <ExploreBlogsLoader />;
    if (isBlogsError || isSeriesError) return <BlogListError reset={isBlogsError ? refetchBlogs : refetchSeries} />;

    const isInitialPage = page === 1;
    const seriesList = seriesData?.data || [];
    console.log(seriesData)
    const allBlogs = blogsData?.blogs || [];

    // Logic: If on page 1, featured is blog[0]. If page 2+, there is no featured.
    const featuredBlog = isInitialPage ? allBlogs[0] : null;
    const restBlogs = isInitialPage ? allBlogs.slice(1) : allBlogs;

    return (
        <div className="max-w-7xl mx-auto px-4 py-5">
            {/* --- HEADER SECTION --- */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-4">
                    <Badge variant="outline" className="px-3 py-1 uppercase tracking-tighter text-[10px] border-primary/30 text-primary">
                        The Vault
                    </Badge>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight">
                        {isInitialPage ? (
                            <>Tranding <span className="text-muted-foreground/40 italic">Series.</span></>
                        ) : (
                            <>Archive <span className="text-muted-foreground/40 italic">Page {page}</span></>
                        )}
                    </h1>
                </div>
            </div>

            {/* --- 1. FEATURED SERIES HERO (Only on Page 1) --- */}
            <TopSeries isInitialPage={isInitialPage} featuredSeries={seriesList} />

            {/* --- 2. FEATURED BLOG (Only on Page 1) --- */}
            {isInitialPage && featuredBlog && (
                <>
                    <BlogFeatured featured={featuredBlog} />
                    <Separator className="mb-16 opacity-50" />
                </>
            )}

            {/* --- 3. THE GRID (Rest of Blogs) --- */}
            <section>
                <div className="flex items-center justify-between mb-10">
                    <h3 className="text-2xl font-serif font-bold">
                        {isInitialPage ? "Recent Publications" : "All Articles"}
                    </h3>
                    <span className="text-xs text-muted-foreground">{blogsData?.pagination?.totalItems} total stories</span>
                </div>

                <BlogRest rest={restBlogs} />
            </section>

            {/* --- 4. PAGINATION --- */}
            <footer className="flex justify-center pt-16 border-t border-slate-100 mt-20">
                <PaginationUI
                    page={page}
                    totalPages={blogsData?.pagination?.totalPages || 1}
                    onPageChange={(newPage) => {
                        setPage(newPage);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                />
            </footer>
        </div>
    )
}

export default ExploreBlogs