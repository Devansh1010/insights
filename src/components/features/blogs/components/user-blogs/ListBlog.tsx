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

import Image from "next/image"
import { Badge } from "@/components/ui/badge"

import { Blog } from "@/hooks/blogs/useBlogsFilter"
import {
    Trash2,
    Pencil,
    FileEdit,
    FileText,
    Plus,
} from "lucide-react"

import Link from "next/link"
import { Button } from "@/components/ui/button"

const ListBlog = ({ filteredBlogs, deleteBlog }: { filteredBlogs: Blog[], deleteBlog: (id: string) => void }) => {
    const FALLBACK = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop';

    console.log(filteredBlogs)

    return (
        <div className="space-y-10">
            {/* HEADER SECTION */}
            <div className="flex items-center justify-between border-b border-border/50 pb-4">
                <div className="space-y-1">
                    <h3 className="text-xl font-serif font-bold tracking-tight">Recent Stories</h3>
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">
                        <FileText className="w-3 h-3" />
                        <span>{filteredBlogs.length} Total Posts</span>
                    </div>
                </div>
                <Link href="/user/write">
                    <Button size="sm" className="rounded-full px-5 font-bold text-xs uppercase tracking-widest shadow-lg shadow-primary/10 transition-all hover:shadow-none">
                        <Plus className="w-3.5 h-3.5 mr-2" /> New Post
                    </Button>
                </Link>
            </div>

            {filteredBlogs.length === 0 ? (
                <div className="py-24 flex flex-col items-center justify-center text-center rounded-[2rem] border-2 border-dashed border-border/60 bg-muted/5">
                    <div className="bg-background shadow-sm rounded-full p-5 mb-6 border border-border/40">
                        <FileEdit className="w-10 h-10 text-primary/40" />
                    </div>
                    <h4 className="text-xl font-serif font-bold">Your story begins here</h4>
                    <p className="max-w-xs text-sm text-muted-foreground mt-2 leading-relaxed">
                        Ready to share your engineering deep-dives? Start crafting your first masterpiece.
                    </p>
                    <Link href="/user/write" className="mt-8">
                        <Button variant="outline" className="rounded-full px-8">Create First Post</Button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {filteredBlogs.map((blog: Blog) => (
                        <div
                            key={blog._id}
                            className="group relative flex flex-col space-y-4 transition-all"
                        >
                            {/* IMAGE - Aspect ratio optimized for 3-column grid */}
                            <div className="relative w-full overflow-hidden rounded-2xl bg-muted aspect-16/10 border border-border/50">
                                <Image
                                    src={blog?.coverImage || FALLBACK}
                                    alt={blog?.title || "Blog cover"}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />

                                {/* FLOATING ACTIONS - Better UX for grid layouts */}
                                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                                    <Link href={`/write-blog/${blog.slug}`}>
                                        <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-white/90 backdrop-blur shadow-sm hover:bg-primary hover:text-white">
                                            <Pencil className="w-4 h-4" />
                                        </Button>
                                    </Link>

                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button
                                                variant="secondary"
                                                size="icon"
                                                className="h-8 w-8 rounded-full bg-white/90 backdrop-blur shadow-sm text-destructive hover:bg-destructive hover:text-white"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent className="rounded-[2rem]">
                                            <AlertDialogHeader>
                                                <AlertDialogTitle className="font-serif text-2xl">Delete post?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action is permanent. It will remove <span className="font-bold">&quot;{blog.title}&quot;</span>.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
                                                <AlertDialogAction
                                                    onClick={() => deleteBlog(blog._id)}
                                                    className="rounded-full bg-destructive hover:bg-destructive/90"
                                                >
                                                    Delete
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </div>

                            {/* CONTENT AREA */}
                            <div className="flex flex-col space-y-2 px-1">
                                <div className="flex items-center justify-between">
                                    <Badge
                                        variant={blog.isPublished ? "default" : "secondary"}
                                        className={`text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full font-black ${blog.isPublished ? "bg-emerald-500/10 text-emerald-600 border-none" : "opacity-60"
                                            }`}
                                    >
                                        {blog.isPublished ? "Live" : "Draft"}
                                    </Badge>
                                    <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                                        {blog.publishedAt
                                            ? new Date(blog.publishedAt).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                            })
                                            : "Draft"}
                                    </span>
                                </div>

                                <h4 className="text-lg font-serif font-bold leading-tight group-hover:text-primary transition-colors cursor-pointer line-clamp-2">
                                    {blog.title}
                                </h4>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ListBlog