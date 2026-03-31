
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



const ExploreBlogs = () => {
    const [page, setPage] = useState(1);

    const limit = 10;

    const { data, isPending, isError, refetch } = useQuery({
        queryKey: ['blogs', { page }],
        queryFn: () => getBlogs({ page, limit }),
    })

    const {
        featured, rest, searchQuery, setSearchQuery
    } = useBlogsFilters(data?.blogs || []);


    if (isPending) return <ExploreBlogsLoader />;
    if (isError) return <BlogListError reset={refetch} />;
    return (

        <div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                <div className="space-y-4">
                    <Badge variant="outline" className="px-3 py-1 uppercase tracking-tighter text-[10px] border-primary/30 text-primary">
                        Journal
                    </Badge>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight">
                        Latest <span className="text-muted-foreground/40 italic">Insights.</span>
                    </h1>
                </div>

                {/* PREMIUM SEARCH BAR */}
                <div className="relative w-full md:w-72 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                    <Input
                        placeholder="Search the vault (⌘K)..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-11 h-10 border-slate-200 rounded-xl shadow-sm focus-visible:ring-primary/20 transition-all w-full"
                    />
                </div>
            </div>

            <BlogFeatured featured={featured} />

            <Separator className="mb-16 opacity-50 " />

            <BlogRest rest={rest} />

            <footer className="flex justify-center pt-16 border-t border-slate-100 mt-10">
                <PaginationUI
                    page={page}
                    totalPages={data.pagination.totalPages}
                    onPageChange={setPage}
                />
            </footer>
        </div>

    )
}

export default ExploreBlogs