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

import {
    Trash2,
    Pencil,
    FileEdit,
    FileText,
    Plus,
} from "lucide-react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Blog } from "@/types/frontend/blog"

const ListBlog = ({ filteredBlogs, deleteBlog }: { filteredBlogs: Blog[], deleteBlog: (id: string) => void }) => {

    return (
        <div className="space-y-10">
            {/* HEADER SECTION */}
            <div className="flex items-center justify-between border-b border-border/50 pb-6">
                <div className="space-y-1">
                    <h3 className="text-2xl font-serif font-bold tracking-tight text-foreground">
                        Recent Stories
                    </h3>
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">
                        <FileText className="w-3 h-3 text-primary/60" />
                       
                        <span>Showing {filteredBlogs.length} Stories</span>
                    </div>
                </div>
                <Link href="/write-blog">
                    <Button size="sm" className="rounded-full px-6 font-bold text-xs uppercase tracking-widest shadow-lg shadow-primary/10 transition-all hover:-translate-y-px hover:shadow-primary/20">
                        <Plus className="w-3.5 h-3.5 mr-2" /> New Post
                    </Button>
                </Link>
            </div>

            {filteredBlogs.length === 0 ? (
                <div className="py-32 flex flex-col items-center justify-center text-center rounded-[2.5rem] border-2 border-dashed border-border/40 bg-muted/5">
                    <div className="bg-background shadow-xl shadow-black/2 rounded-full p-6 mb-6 border border-border/40">
                        <FileEdit className="w-12 h-12 text-primary/30" />
                    </div>
                    <h4 className="text-2xl font-serif font-bold">Your story begins here</h4>
                    <p className="max-w-xs text-sm text-muted-foreground mt-3 leading-relaxed">
                        Ready to share your engineering deep-dives? Start crafting your first masterpiece.
                    </p>
                    <Link href="/write-blog" className="mt-8">
                        <Button variant="outline" className="rounded-full px-10 hover:bg-primary hover:text-white transition-colors">
                            Create First Post
                        </Button>
                    </Link>
                </div>
            ) : (
                /* Optimized Grid for 10 items: 
                   Using gap-y-16 to give the typography room to breathe */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-10 gap-y-16">
                    {filteredBlogs.map((blog) => (
                        <div
                            key={blog._id}
                            className="group relative flex flex-col space-y-5 transition-all"
                        >
                            {/* IMAGE CONTAINER */}
                            <div className="relative w-full overflow-hidden rounded-[1.5rem] bg-muted aspect-16/10 border border-border/30 shadow-sm">
                                <Image
                                    src={blog?.coverImage || '/placeholder-blog.jpg'} // Fallback image
                                    alt={blog?.title || "Blog cover"}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                />

                                {/* OVERLAY ACTIONS */}
                                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-2.5 group-hover:translate-y-0">
                                    <Link href={`/write-blog/${blog._id}`}>
                                        <Button variant="secondary" size="icon" className="h-9 w-9 rounded-full  backdrop-blur shadow-md ">
                                            <Pencil className="w-4 h-4" />
                                        </Button>
                                    </Link>

                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button
                                                variant="secondary"
                                                size="icon"
                                                className="h-9 w-9 rounded-full bg-white/95 backdrop-blur shadow-md text-destructive hover:bg-destructive hover:text-white"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent className="rounded-[2rem]">
                                            <AlertDialogHeader>
                                                <AlertDialogTitle className="font-serif text-2xl">Remove Story</AlertDialogTitle>
                                                <AlertDialogDescription className="text-base">
                                                    This action is permanent. This will delete <span className="font-semibold text-foreground italic">&quot;{blog.title}&quot;</span> from your dashboard.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter className="mt-4">
                                                <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
                                                <AlertDialogAction
                                                    onClick={() => deleteBlog(blog._id)}
                                                    className="rounded-full bg-destructive hover:bg-destructive/90"
                                                >
                                                    Delete Permanently
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </div>

                            {/* TEXT CONTENT */}
                            <div className="flex flex-col space-y-3 px-1">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Badge
                                            className={`text-[9px] uppercase tracking-widest px-2.5 py-0.5 rounded-full font-bold border-none shadow-none ${blog.isPublished
                                                    ? "bg-emerald-500/10 text-emerald-600"
                                                    : "bg-orange-500/10 text-orange-600"
                                                }`}
                                        >
                                            {blog.isPublished ? "Live" : "Draft"}
                                        </Badge>
                                        {/* Optional: Read Time indicator */}
                                        <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-tight">
                                            {blog.readTime } : min read
                                        </span>
                                    </div>
                                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                        {blog.createdAt
                                            ? new Date(blog.createdAt).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric"
                                            })
                                            : "Last Modified"}
                                    </span>
                                </div>

                                <Link href={`/user/explore/${blog._id}`}>
                                    <h4 className="text-xl font-serif font-bold leading-snug group-hover:text-primary transition-colors line-clamp-2 decoration-primary/30 underline-offset-4 group-hover:underline">
                                        {blog.title}
                                    </h4>
                                </Link>
                                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                                    {blog.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ListBlog