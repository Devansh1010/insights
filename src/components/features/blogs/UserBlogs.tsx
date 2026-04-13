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
import { useRouter } from "next/navigation"

import { UserBlogsLoader } from "./loader/UserBlogsLoader"
import { UserBlogsError } from "./error/UserBlogsError"
import ListBlog from "./components/user-blogs/ListBlog"

const UserBlogs = () => {
    // const router = useRouter();
    const queryClient = useQueryClient();



    const { data, isPending, isError, refetch } = useQuery({
        queryKey: ['user-blogs'],
        queryFn: () => getUserBlogs(),
    })

    const mutation = useMutation({
        mutationFn: (id: string) => deleteBlog(id),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user-blogs"] });
            toast.success("Blog published successfully!");
            // router.push("/user/explore");
        },

        onError: () => toast.error("Failed to create blog"),
    });

    const {
        filteredBlogs, searchQuery, setSearchQuery
    } = useBlogsFilters(data || []);

    if (isPending) return <UserBlogsLoader />
    if (isError) return <UserBlogsError onRetry={refetch} />

    console.log(data)

    return (
        <div className="min-h-screen bg-background/50 pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-6 space-y-8">

                {/* HEADER SECTION */}
                <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">

                    <div className="space-y-1">
                        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
                        <p className="text-sm text-muted-foreground">
                            {data.length} published stories
                        </p>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">

                        {/* Search */}
                        <div className="relative w-full sm:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9 h-9 bg-background border-border focus-visible:ring-1 focus-visible:ring-primary/30"
                            />
                        </div>

                        {/* Button */}
                        <Link href="/user/write">
                            <Button className="h-9 px-4 gap-2">
                                <Plus className="w-4 h-4" />
                                <span className="hidden sm:inline">New</span>
                            </Button>
                        </Link>

                    </div>
                </header>

                <ListBlog filteredBlogs={filteredBlogs} deleteBlog={mutation.mutate} />

            </div>
        </div>
    )
}

export default UserBlogs