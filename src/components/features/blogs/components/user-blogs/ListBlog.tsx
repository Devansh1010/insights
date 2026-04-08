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

import {
    Card,
    CardContent,
    CardDescription,
    CardTitle
} from "@/components/ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

import { Blog } from "@/hooks/blogs/useBlogsFilter"
import {
    Trash2,
    Pencil,
    FileEdit,
    FileText,
} from "lucide-react"

import Link from "next/link"
import { Button } from "@/components/ui/button"

const ListBlog = ({ filteredBlogs, deleteBlog }: { filteredBlogs: Blog[], deleteBlog: (id: string) => void }) => {
    const FALLBACK = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop';

    console.log(filteredBlogs)

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span>{filteredBlogs.length} posts</span>
                </div>
            </div>
            <h3 className="text-lg font-semibold px-1">Recent Stories</h3>

            {filteredBlogs.length === 0 ? (
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
                    {filteredBlogs.map((blog: Blog) => (
                        <Card
                            key={blog._id}
                            className="group border-border/60 bg-background hover:bg-muted/40 transition-colors"
                        >
                            <div className="p-4 sm:p-5 flex items-center gap-4">

                                {/* IMAGE */}
                                <div className="relative w-20 shrink-0 overflow-hidden rounded-md">
                                    <AspectRatio ratio={4 / 3}>
                                        <Image
                                            src={blog?.coverImage || FALLBACK}
                                            alt={blog?.title || "Blog cover"}
                                            fill
                                            className="object-cover"
                                        />
                                    </AspectRatio>
                                </div>

                                {/* CONTENT */}
                                <div className="flex-1 min-w-0 space-y-1">

                                    <div className="flex items-center gap-2">
                                        <h4 className="text-base font-medium truncate group-hover:underline underline-offset-4">
                                            {blog.title}
                                        </h4>

                                        <Badge
                                            variant={blog.isPublished ? "default" : "secondary"}
                                            className="text-[10px] px-2 py-0"
                                        >
                                            {blog.isPublished ? "Live" : "Draft"}
                                        </Badge>
                                    </div>

                                    <div className="text-xs text-muted-foreground flex items-center gap-2">
                                        <span>
                                            {blog.publishedAt
                                                ? new Date(blog.publishedAt).toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                })
                                                : "Unpublished"}
                                        </span>
                                    </div>

                                </div>

                                {/* ACTIONS */}
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">

                                    <Link href={`/write-blog/${blog.slug}`}>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <Pencil className="w-4 h-4" />
                                        </Button>
                                    </Link>

                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-destructive hover:bg-destructive/10"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </AlertDialogTrigger>

                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Delete post?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This will permanently delete{" "}
                                                    <span className="font-medium text-foreground">
                                                        {blog.title}
                                                    </span>.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>

                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction
                                                    onClick={() => deleteBlog(blog._id)}
                                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                >
                                                    Delete
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
    )
}

export default ListBlog