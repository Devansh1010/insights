'use client'
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Search, Clock, ArrowRight } from "lucide-react"
import { Button } from '@/components/ui/button'
import { useEffect, useState } from "react"
import { getBlogs } from "@/utils/get-blogs"
import Link from "next/link"

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            const data = await getBlogs();
            setBlogs(data);
        }
        fetchBlogs();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-6 py-20">

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                <div className="space-y-4">
                    <Badge variant="outline" className="px-3 py-1 uppercase tracking-tighter text-[10px] border-primary/30 text-primary">
                        Journal
                    </Badge>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight">
                        Latest <span className="text-muted-foreground/40 italic">Insights.</span>
                    </h1>
                </div>

                {/* PREMIUM SEARCH BAR */}
                <div className="relative w-full md:w-72 group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                        placeholder="Search articles..."
                        className="pl-10 bg-transparent border-0 border-b border-muted rounded-none focus-visible:ring-0 focus-visible:border-primary transition-all pb-2"
                    />
                </div>
            </div>

            {/* FEATURED POST (The "Hero") */}
            <section className="group cursor-pointer mb-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-7 overflow-hidden rounded-2xl bg-muted">
                        {/* Replace with your Image component */}
                        <div className="aspect-video w-full bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out" />
                    </div>

                    <div className="lg:col-span-5 space-y-6">
                        <div className="flex items-center gap-3 text-sm font-medium text-primary">
                            <span>Featured</span>
                            <span className="w-1 h-1 rounded-full bg-primary" />
                            <span className="text-muted-foreground">March 2026</span>
                        </div>
                        <h2 className="text-4xl font-serif font-bold leading-tight group-hover:underline decoration-1 underline-offset-8 transition-all">
                            The Future of Minimalist Interface Design in 2026
                        </h2>
                        <p className="text-muted-foreground leading-relaxed text-lg">
                            Exploring how reductive design patterns are shaping the next generation of high-end software development...
                        </p>
                        <div className="flex items-center gap-4 pt-4">
                            <div className="w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-800" />
                            <div>
                                <p className="text-sm font-semibold">Devansh Prajapati</p>
                                <p className="text-xs text-muted-foreground">Technical Lead</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Separator className="mb-16 opacity-50" />

            {/* REGULAR FEED (Rows) */}
            <div className="space-y-20">
                {blogs?.map((post: { _id: string; slug: string; tags?: string[]; title: string; excerpt?: string; author?: { username: string }; createdAt: string }) => (
                    <Link key={post._id} href={`/user/explore/${post.slug}`} className="group block">
                        <article className="group cursor-pointer grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                            {/* Left: Image */}
                            <div className="md:col-span-4 overflow-hidden rounded-xl">
                                <div className="aspect-4/3 bg-muted group-hover:scale-110 transition-transform duration-500" />
                            </div>

                            {/* Right: Content */}
                            <div className="md:col-span-8 flex flex-col h-full py-2">
                                <div className="flex items-center gap-3 text-xs mb-3 text-muted-foreground font-medium uppercase tracking-widest">
                                    <span>{post.tags?.map((tag: string) => tag).join(', ')}</span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 4 min read</span>
                                </div>

                                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                                    {post.title}
                                </h3>

                                <p className="text-muted-foreground line-clamp-2 mb-6 max-w-2xl">
                                    {post.excerpt || "No excerpt available."}
                                </p>

                                <div className="mt-auto flex items-center justify-between">
                                    <div className="text-sm font-medium">
                                        By <span className="hover:underline">{post.author?.username || "Unknown Author"}</span>
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Date {
                                            new Date(post.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })
                                        }
                                    </div>
                                    <ArrowRight className="w-5 h-5 -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all text-primary" />
                                </div>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>

            {/* LOAD MORE / FOOTER CUE */}
            <div className="mt-24 text-center">
                <Button className="text-sm font-bold tracking-widest uppercase hover:text-primary transition-colors">
                    View all archives —&gt;
                </Button>
            </div>
        </div>
    )
}

export default BlogList