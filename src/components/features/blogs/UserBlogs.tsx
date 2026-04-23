'use client'
import {
    Plus,
    Search
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

import Link from "next/link"
import { getUserBlogs } from "@/services/blog.service"
import { deleteBlog } from "@/services/blog.service"


import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useBlogsFilters } from "@/hooks/blogs/useBlogsFilter"

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
        mutationFn: (id: string) => deleteBlog(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user-blogs"] });
            toast.success("Blog deleted successfully!");
        },
        onError: () => toast.error("Failed to delete blog"),
    });


    if (isPending) return <UserBlogsLoader />
    if (isError) return <UserBlogsError onRetry={refetch} />

    return (
        <div className="min-h-screen bg-background/50 pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-6 space-y-8">

                <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
                        <p className="text-sm text-muted-foreground">
                            {data?.pagination?.total || 0} published stories
                        </p>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <div className="relative w-full sm:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search stories..."
                                defaultValue={search}
                                onChange={(e) => debouncedSearch(e.target.value)}
                                className="pl-9 h-9"
                            />
                        </div>
                        <Link href="/user/write">
                            <Button className="h-9 px-4 gap-2">
                                <Plus className="w-4 h-4" />
                                <span className="hidden sm:inline">New</span>
                            </Button>
                        </Link>
                    </div>
                </header>

                {/* 3. Pass the array directly */}
                <ListBlog
                    filteredBlogs={data?.blogs || []}
                    deleteBlog={(id) => mutation.mutate(id)}
                />

                {/* 4. Use the pagination data from the API response */}
                <PaginationUI
                    page={page}
                    totalPages={data?.pagination?.totalPages || 1}
                    onPageChange={(newPage) => {
                        setPage(newPage);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                />
            </div>
        </div>
    );
};

export default UserBlogs