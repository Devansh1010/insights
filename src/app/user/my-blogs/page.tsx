'use client'

import {
    FileText,
    Plus,
    Trash2,
    Pencil,
    FileEdit
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getUserBlogs } from "@/services/blog.service"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import { deleteBlog } from "@/services/blog.service"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"

type Blog = {
    _id: string
    title: string
    slug: string
    isPublished: boolean
    createdAt: string
    views: number
}

export default function Dashboard() {
    const [blogs, setBlogs] = useState<Blog[]>([])

    useEffect(() => {
        const fetchBlogs = async () => {
            const data = await getUserBlogs()
            setBlogs(data)
        }
        fetchBlogs()
    }, [])

    const handleDeleteBlog = async (id: string) => {
        try {
            const res = await deleteBlog(id)

            if (res.success) {
                toast.success("Blog Deleted Successfully")

                setBlogs(prev => prev.filter(blog => blog._id !== id))
            }
        } catch (error) {
            toast.error("Error Deleting Blog")
        }
    }

    return (
        <div className="min-h-screen bg-background/50 pt-24 pb-20">
            <div className="max-w-5xl mx-auto px-6 space-y-8">

                {/* HEADER SECTION */}
                <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-4xl font-extrabold tracking-tight">Dashboard</h1>
                        <p className="text-muted-foreground mt-1">
                            You have <span className="text-foreground font-medium">{blogs.length}</span> published stories.
                        </p>
                    </div>
                    <Link href="/user/write">
                        <Button className="rounded-full shadow-lg hover:shadow-primary/20 transition-all gap-2 px-6">
                            <Plus className="w-4 h-4" /> New Post
                        </Button>
                    </Link>
                </header>

                {/* STATS OVERVIEW (Optional but Recommended) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-card/50 backdrop-blur">
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                <FileText className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Total Posts</p>
                                <p className="text-2xl font-bold">{blogs.length}</p>
                            </div>
                        </CardContent>
                    </Card>
                    {/* Add more stat cards as needed */}
                </div>

                {/* BLOG LIST SECTION */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold px-1">Recent Stories</h3>

                    {blogs.length === 0 ? (
                        <Card className="border-dashed py-20">
                            <CardContent className="flex flex-col items-center justify-center text-center">
                                <div className="bg-muted rounded-full p-4 mb-4">
                                    <FileEdit className="w-8 h-8 text-muted-foreground" />
                                </div>
                                <CardTitle className="text-xl">No stories found</CardTitle>
                                <CardDescription className="max-w-62.5 mt-2">
                                    Ready to share your thoughts? Start writing your first blog post today.
                                </CardDescription>
                                <Link href="/user/write" className="mt-6">
                                    <Button variant="outline">Create Post</Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid gap-3">
                            {blogs.map((blog) => (
                                <Card
                                    key={blog._id}
                                    className="group hover:border-primary/50 transition-colors bg-card/50 overflow-hidden"
                                >
                                    <div className="p-4 sm:p-5 flex items-center justify-between gap-4">

                                        {/* INFO */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="font-semibold truncate text-lg group-hover:text-primary transition-colors">
                                                    {blog.title}
                                                </h4>
                                                <Badge variant={blog.isPublished ? "default" : "secondary"} className="text-[10px] uppercase tracking-wider">
                                                    {blog.isPublished ? "Live" : "Draft"}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                                <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                                <span>•</span>
                                                {/* <span className="flex items-center gap-1">
                                                    <Eye className="w-3 h-3" /> {blog.views.toLocaleString()} views
                                                </span> */}
                                            </div>
                                        </div>

                                        {/* ACTIONS */}
                                        <div className="flex items-center gap-2">
                                            <Link href={`/write-blog/${blog.slug}`}>
                                                <Button variant="outline" size="icon" className="h-9 w-9">
                                                    <Pencil className="w-4 h-4" />
                                                </Button>
                                            </Link>

                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="outline" size="icon" className="h-9 w-9 text-destructive hover:bg-destructive/10 hover:text-destructive">
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This will permanently delete &quot;<span className="font-medium text-foreground">{blog.title}</span>&quot;.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => handleDeleteBlog(blog._id)}
                                                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                        >
                                                            Delete Post
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}