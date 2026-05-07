'use client'
import { getSeriesById } from "@/services/series.service";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { PaginationUI } from "./components/PaginationUi";
import Image from "next/image";
import { SeriesPageError } from "./error/SeriesPageError";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TagBadge } from "../badges/MetaBedge";
import { Input } from "@/components/ui/input";
import { useDebounceCallback } from "usehooks-ts";
import { BlogListSkeleton } from "./loader/BlogListSkeleton";
import { SeriesPageLoader } from "./loader/SeriesPageLoader";
import Link from "next/link";
import { Blog } from "@/types/frontend/blog";

const SeriesPage = ({ slug }: { slug: string }) => {

    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')
    const limit = 10;


    const { data, isPending, isError, refetch, isRefetching } = useQuery({
        queryKey: ['series', { slug, search, page }],
        queryFn: () => getSeriesById({ slug, page, limit, search }),
        placeholderData: (previousData) => previousData,
    })

    const debouncedSearch = useDebounceCallback((val: string) => {
        setSearch(val);
        setPage(1);
    }, 400);

    // if (isPending && !isRefetching) return <SeriesPageLoader />

    if (isError) return <SeriesPageError reset={refetch} />

    return (
        <div className="min-h-screen bg-background text-foreground font-sans antialiased selection:bg-primary selection:text-primary-foreground">
            {/* Header: Cinematic Hero */}
            <header className="relative w-full h-[75vh] flex items-center overflow-hidden">
                {isPending ? (
                    <div className="min-h-screen min-w-screen">
                        <SeriesPageLoader />
                    </div>
                ) : (
                    <>
                        <div className="absolute inset-0 z-0">
                            <Image
                                src={data?.series?.coverImage || '/fallback.jpg'}
                                alt={data?.series?.title}
                                fill
                                className="object-cover"
                                priority
                            />
                            {/* High-end gradient overlay for readability */}
                            <div className="absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent" />
                        </div>

                        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-20 pb-5">
                            <div className="space-y-8">
                                <div className="flex flex-wrap gap-2">
                                    {data?.series?.tags?.map((tag: string) => (
                                        <TagBadge key={tag}>
                                            {tag}
                                        </TagBadge>
                                    ))}
                                </div>

                                <h1 className="text-6xl md:text-7xl font-serif font-black tracking-tighter leading-[0.85] uppercase text-white drop-shadow-sm">
                                    {data?.series?.title}
                                </h1>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
                                    <p className="text-xl md:text-2xl font-serif font-light leading-relaxed max-w-xl text-zinc-200">
                                        {data?.series?.desc}
                                    </p>

                                    <div className="flex items-center gap-6 pb-2">
                                        <div className="flex items-center gap-4">
                                            <Avatar className="h-12 w-12 border-2 border-white/20">
                                                <AvatarImage src={data?.series?.author?.avatar} alt={data?.series?.author?.username} />
                                                <AvatarFallback className="bg-zinc-800 text-white">
                                                    {data?.series?.author?.username.substring(0, 2).toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <span className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Curated by</span>
                                                <span className="text-sm font-bold text-white uppercase tracking-tight">{data?.series?.author?.username}</span>
                                            </div>
                                        </div>
                                        <Separator orientation="vertical" className="h-10 bg-white/20" />
                                        <div className="flex flex-col">
                                            <span className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Volume</span>
                                            <span className="text-sm font-bold text-white uppercase tracking-tight">{data?.blogs?.length} Articles</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </header>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-6 py-32">
                <div className="mb-20 flex items-center gap-6">
                    <h2 className="text-[10px] uppercase tracking-[0.5em] font-black text-muted-foreground whitespace-nowrap">
                        Table of Contents
                    </h2>
                    <Separator className="shrink" />
                    <Input
                        defaultValue={search}
                        onChange={(e) => debouncedSearch(e.target.value)}
                        placeholder="Search in series..."
                        className="max-w-sm" />
                </div>

                <div className="flex flex-col gap-32">
                    {
                        isRefetching ? (
                            <BlogListSkeleton />
                        ) : (
                            (data?.blogs?.length > 0 &&
                                data?.blogs?.map((blog: Blog, index: number) => (
                                    <Link href={`/user/explore/${blog.slug}`} key={index} className="group">
                                        <article
                                            className="group grid grid-cols-1 md:grid-cols-12 gap-12 items-start"
                                        >
                                            {/* Index Number */}
                                            <div className="hidden md:block md:col-span-1">
                                                <span className="text-6xl font-black tabular-nums text-muted/30 group-hover:text-primary transition-all duration-500">
                                                    {String(index + 1).padStart(2, '0')}
                                                </span>
                                            </div>

                                            {/* Image Section */}
                                            <div className="md:col-span-5">
                                                <div className="rounded-xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-500">
                                                    <AspectRatio ratio={16 / 9}>
                                                        <Image
                                                            src={blog?.coverImage || '/fallback.jpg'}
                                                            alt={blog?.title}
                                                            fill
                                                            className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                                                        />
                                                    </AspectRatio>
                                                </div>
                                            </div>

                                            {/* Text Content */}
                                            <div className="md:col-span-6 flex flex-col justify-center space-y-6">
                                                <div className="space-y-4">
                                                    <h3 className="text-4xl md:text-5xl font-serif font-extrabold leading-[1.1] tracking-tighter transition-all group-hover:tracking-normal">
                                                        {blog.title}
                                                    </h3>
                                                    <p className="text-muted-foreground text-lg leading-relaxed line-clamp-3 font-medium italic decoration-primary/30">
                                                        {blog?.excerpt}
                                                    </p>
                                                </div>

                                                <div className="flex items-center gap-4 pt-4">
                                                    <div className="flex gap-2">
                                                        {blog?.tags?.slice(0, 2).map((tag: string) => (
                                                            <TagBadge key={tag}>{tag}</TagBadge>
                                                        ))}
                                                    </div>
                                                    <Separator className="flex-1 opacity-50" />
                                                    <Button variant="ghost" className="group/btn text-[11px] font-black uppercase tracking-[0.2em] hover:bg-transparent px-0">
                                                        <span className="group-hover/btn:mr-2 transition-all underline underline-offset-8 decoration-2">Read More</span>
                                                        <ArrowRight className="h-4 w-4 opacity-0 group-hover/btn:opacity-100 transition-all" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </article>
                                    </Link>
                                ))
                            )
                        )
                    }
                </div>

                {/* Pagination Section */}
                <div className="mt-40">
                    <Separator className="mb-10 h-1 bg-foreground" />
                    <div className="flex justify-center">
                        <PaginationUI
                            page={page}
                            totalPages={data?.totalPages}
                            onPageChange={setPage}
                        />
                    </div>
                </div>
            </main>
        </div>
    )
}

export default SeriesPage