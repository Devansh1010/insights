'use client'

import { getSeries } from "@/services/series"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Shadcn Components
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, User } from "lucide-react"
import { PaginationUI } from "./PaginationUi";
import { SeriesSkeleton } from "./loader/SeriesListLoader";
import { SeriesError } from "./error/SeriesError";
import { useSeriesFilters } from "@/hooks/series/useServiceFilter";


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
        searchQuery, setSearchQuery,
        activeCategory, setActiveCategory,
        featured, rest
    } = useSeriesFilters(data?.data?.series || []);


    if (isPending) return <SeriesSkeleton />; // Assume your skeleton logic here
    if (isError) return <SeriesError reset={refetch} />;

    const categories = ['All Series', 'Architecture', 'Frontend', 'Backend', 'System Design', 'Soft Skills'];

    const { pagination } = data.data;

    const FALLBACK = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop';

    return (
        <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="container mx-auto">
                {/* 1. Header & Search - Centered Layout */}
                <header className="flex flex-col gap-8 w-full">

                    <div className="flex flex-col md:flex-row md:items-end justify-between">

                        <div className="space-y-4">
                            <Badge variant="outline" className="px-3 py-1 uppercase tracking-tighter text-[10px] border-primary/30 text-primary">
                                Articles
                            </Badge>
                            <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight">
                                Knowledge <span className="text-muted-foreground/40 italic">Vault</span>
                            </h1>
                        </div>

                        <div className="relative group w-full max-w-xs">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                            <Input
                                placeholder="Search the vault (⌘K)..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-11 h-10 border-slate-200 rounded-xl shadow-sm focus-visible:ring-primary/20 transition-all w-full"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col justify-center items-center py-5">

                        <nav className="overflow-x-auto no-scrollbar max-w-full p-4">
                            <div className="flex gap-2">
                                {categories.map((tab) => {
                                    const isActive = activeCategory === tab;
                                    return (
                                        <Button
                                            key={tab}
                                            onClick={() => setActiveCategory(tab)}
                                            className={`px-4 py-2 text-xs font-semibold rounded-full whitespace-nowrap transition-all
                                            
                            ${isActive
                                                    ? "bg-slate-900 text-white shadow-md scale-105 hover:bg-slate-900 border border-slate-200"
                                                    : "bg-transparent text-slate-600  cursor-pointer "
                                                }`}
                                        >
                                            {tab}
                                        </Button>
                                    );
                                })}
                            </div>
                        </nav>

                        {/* <Separator /> */}
                    </div>
                </header>

                <div className="space-y-4">
                    {featured && page === 1 && (
                        <section className="group mb-24 px-4 lg:px-0">
                            <Link href={`/series/${featured.slug}`}>
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">


                                    <div className="lg:col-span-5 space-y-6 order-2 lg:order-1">
                                        <div className="flex items-center gap-3 text-sm font-medium text-primary">
                                            <span className="uppercase tracking-widest text-[13px] font-bold">Featured</span>
                                            <span className="w-1 h-1 rounded-full bg-primary" />
                                            <span className="text-slate-400 font-normal">
                                                {new Date(featured.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                            </span>
                                        </div>

                                        <h2 className="text-4xl lg:text-5xl font-serif font-bold leading-[1.1] text-slate-900 group-hover:underline decoration-primary/30 underline-offset-10 transition-all">
                                            {featured.title}
                                        </h2>

                                        <p className="text-muted-foreground leading-relaxed text-lg">
                                            {featured.desc}
                                        </p>

                                        <div className="flex items-center gap-4 pt-4 border-t border-slate-50">
                                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 overflow-hidden">
                                                <User className="h-5 w-5 text-slate-400" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900">@{featured.author.username}</p>
                                                <p className="text-[10px] uppercase tracking-tighter text-slate-400 font-medium">Technical Lead</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Image Side (7 Columns) */}
                                    <div className="lg:col-span-7 order-1 lg:order-2">
                                        <div className="relative aspect-video w-full overflow-hidden rounded-[2rem] bg-slate-100 shadow-xl group-hover:shadow-2xl transition-all duration-700">
                                            <Image
                                                src={featured.coverImage || FALLBACK}
                                                alt={featured.title}
                                                fill
                                                priority
                                                className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-in-out"
                                            />
                                        </div>
                                    </div>

                                </div>
                            </Link>
                        </section>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {rest.map((item: Series) => (
                            <Card key={item._id} className="relative group flex flex-col overflow-hidden rounded-[2rem] shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">

                                <div className="h-48 overflow-hidden">
                                    <Image
                                        src={item.coverImage ? item.coverImage : FALLBACK}
                                        alt={item.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                    />
                             
                                </div>

                                <CardContent className="relative z-10  md:px-12 w-full flex flex-col justify-end">
                                    {/* Optional: Tag/Series label at the top if you still want it */}
                                    <div className="mb-auto">
                                        <span className="text-[11px] font-black text-primary uppercase tracking-widest">Series</span>
                                    </div>

                                    {/* Bottom Row Container */}
                                    <div className="flex items-end justify-between gap-4">

                                        {/* Left Side: Title and Description */}
                                        <div className="flex-1 min-w-0">
                                            <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-1 leading-snug">
                                                {item.title}
                                            </CardTitle>
                                            <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mt-1">
                                                {item.desc}
                                            </p>
                                        </div>

                                        {/* Right Side: Username and Button */}
                                        <div className="flex items-center gap-3 shrink-0">
                                            <span className="text-xs text-slate-400 font-medium">@{item.author.username}</span>
                                            <Button
                                                variant={"default"}
                                                className="">
                                                View
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

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