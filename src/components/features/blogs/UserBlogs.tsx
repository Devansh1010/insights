'use client'
import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"
import { toast } from "sonner"

import { getUserBlogs } from "@/services/blog.service"
import { deleteBlog } from "@/services/blog.service"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { UserBlogsLoader } from "./loader/UserBlogsLoader"
import { UserBlogsError } from "./error/UserBlogsError"
import ListBlog from "./components/user-blogs/ListBlog"
import { useState } from "react"
import { PaginationUI } from "../series/components/PaginationUi"
import { BlogResponse } from "@/types/frontend/blog"
import { useDebounceCallback } from 'usehooks-ts'

const UserBlogs = () => {
    const queryClient = useQueryClient();
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");

    const { data, isPending, isError, refetch } = useQuery<BlogResponse>({
        queryKey: ['user-blogs', { page, search }],
        queryFn: () => getUserBlogs({ page, limit: 10, search }),
    });

    const debouncedSearch = useDebounceCallback((val: string) => {
        setSearch(val);
        setPage(1);
    }, 400);

    // 1. Fetch data - 'data' will be of type BlogResponse

    const mutation = useMutation({
        mutationFn: (slug: string) => deleteBlog(slug),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user-blogs"] });
            toast.success("Blog deleted successfully!");
        },
        onError: () => toast.error("Failed to delete blog"),
    });


    if (isPending) return <UserBlogsLoader />
    if (isError) return <UserBlogsError onRetry={refetch} />

    return (
        <div className="max-w-7xl mx-auto px-6 py-5">

            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-8">
                <h1 className="text-3xl md:text-5xl font-serif font-bold leading-tight text-foreground">
                    <span className="flex items-center gap-3">
                        My Blogs
                    </span>
                </h1>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative group w-full md:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/50 group-focus-within:text-primary transition-colors" />
                        <Input
                            placeholder="Search system records..."
                            defaultValue={search}
                            onChange={(e) => debouncedSearch(e.target.value)}
                            className="pl-9 h-9 bg-muted/30 border-border/50 focus-visible:ring-1 focus-visible:ring-primary/20 transition-all font-sans text-sm"
                        />
                    </div>
                </div>
            </header>

            {/* --- BLOG LIST --- */}
            <main className="min-h-125">
                <ListBlog
                    filteredBlogs={data?.blogs || []}
                    deleteBlog={(slug) => mutation.mutate(slug)}
                />
            </main>

            {/* --- FOOTER / PAGINATION --- */}
            <footer className="flex flex-col items-center gap-6 pt-12 border-t border-border/40">
                <div className="text-[10px] font-mono text-muted-foreground/30 uppercase tracking-widest">
                    End of Transmission
                </div>
                <PaginationUI
                    page={page}
                    totalPages={data?.pagination?.totalPages || 1}
                    onPageChange={(newPage) => {
                        setPage(newPage);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                />
            </footer>
        </div>
    );
};

export default UserBlogs