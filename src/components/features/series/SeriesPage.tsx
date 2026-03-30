'use client'
import { getSeriesById } from "@/services/series.service";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { PaginationUI } from "./PaginationUi";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { SeriesPageLoader } from "./loader/SeriesPageLoader";
import { SeriesPageError } from "./error/SeriesPageError";
import { Separator } from "@/components/ui/separator";
import { BookOpen, User2 } from "lucide-react";

type Blog = {
    title: string,
    excerpt: string,
    coverImage: string,
    tags: string[],
    slug: string
}

const SeriesPage = ({ id }: { id: string }) => {

    const [page, setPage] = useState(1)
    const limit = 10;

    const { data, isPending, isError, refetch } = useQuery({
        queryKey: ['series', { id }],
        queryFn: () => getSeriesById({ id, page, limit }),
    })

    if (isPending) return <SeriesPageLoader />

    if (isError) return <SeriesPageError reset={refetch} />

    const FALLBACK = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop';

    return (
        <div className="min-h-screen pb-20 mt-20 bg-slate-950">
            {/* Hero Section: Modern Split Layout */}
            <header className="relative w-full overflow-hidden bg-background">
                {/* 1. Full Width Image Section (40vh) */}
                <div className="absolute top-0 w-full h-full md:h-[45vh] overflow-hidden">

                    <Image
                        src={data.series.coverImage ? data.series.coverImage : FALLBACK}
                        alt={data.series.title}
                        fill
                        className="object-cover transition-transform duration-1000 hover:scale-105"
                        priority
                    />
                </div>

                <div className="mx-auto relative z-10 px-6 py-10 md:py-16 rounded-3xl border border-white/10 bg-background/60 backdrop-blur-lg shadow-2xl overflow-hidden">

                    <div className="max-w-7xl mx-auto">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

                        <div className="flex flex-col items-center text-center space-y-8 relative z-10">

                            {/* Tags at the top */}
                            <div className="flex flex-wrap justify-center gap-2">
                                {data.series.tags?.map((tag: string) => (
                                    <Badge
                                        key={tag}
                                        variant="outline"
                                        className="px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-sm text-foreground text-xs font-medium uppercase tracking-wider border-foreground/10"
                                    >
                                        {tag}
                                    </Badge>
                                ))}
                            </div>

                            {/* Large Editorial Title */}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-[1.1] text-foreground tracking-tight">
                                {data.series.title}
                            </h1>

                            {/* Description */}
                            <p className="text-muted-foreground leading-relaxed text-base md:text-lg max-w-2xl">
                                {data.series.desc}
                            </p>

                            <Separator className="w-24 bg-primary/40 h-1 rounded-full" />

                            {/* Author and Metadata */}
                            <div className="flex items-center gap-6 text-sm font-medium text-muted-foreground/80 pt-2">
                                <div className="flex items-center gap-2.5">
                                    <div className="p-2.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                                        <User2 className="w-4 h-4" />
                                    </div>
                                    <span>{data.series.author.username}</span>
                                </div>

                                <div className="flex items-center gap-2.5">
                                    <div className="p-2.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                                        <BookOpen className="w-4 h-4" />
                                    </div>
                                    <span>{data.blogs.length} Articles</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="max-w-7xl mx-auto px-6 mt-20">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold tracking-tight">Articles in this series</h2>
                    <div className="h-1 w-20 bg-primary rounded-full" />
                </div>

                {/* Grid Layout */}
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {data.blogs.map((blog: Blog, index: number) => (
                        <Card
                            key={blog.slug}
                            className="group border-none bg-card/50 backdrop-blur-sm shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
                        >
                            {/* Card Image with Numbering Overlay */}
                            <div className="relative h-52 w-full overflow-hidden">
                                <div className="absolute top-4 left-4 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-black/60 text-white text-xs font-bold backdrop-blur-md border border-white/20">
                                    {index + 1}
                                </div>
                                <Image
                                    src={blog.coverImage}
                                    alt={blog.title}
                                    fill
                                    className="object-cover transition duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>

                            <CardContent className="p-6">
                                <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                                    {blog.title}
                                </h3>

                                <p className="text-muted-foreground text-sm line-clamp-3 mb-4 leading-relaxed">
                                    {blog.excerpt}
                                </p>

                                <div className="flex flex-wrap gap-2 pt-2">
                                    {blog.tags.slice(0, 3).map((tag: string) => (
                                        <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-primary/80">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Pagination Section */}
                <div className="mt-16 flex flex-col items-center gap-4">
                    <Separator className="mb-4" />
                    <PaginationUI
                        page={page}
                        totalPages={data.totalPages}
                        onPageChange={setPage}
                    />
                </div>
            </main>
        </div>
    )
}

export default SeriesPage