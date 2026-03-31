import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Blog } from '@/hooks/blogs/useBlogsFilter'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BlogRest = ({ rest }: { rest: Blog[] }) => {
    const FALLBACK = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop';

    return (
        <div>
            <div className="space-y-16">
                {rest?.map((post: Blog) => (
                    <Link
                        key={post._id}
                        href={`/user/explore/${post.slug}`}
                        className="group block"
                    >
                        <article className="group flex flex-col overflow-hidden rounded-[2rem] shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">

                            <AspectRatio ratio={4 / 3} className="overflow-hidden rounded-[2rem] relative">

                                {/* IMAGE */}
                                {/* <Image
                                    src={post.coverImage? post.coverImage: FALLBACK}
                                    alt={post.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                /> */}

                                {/* OVERLAY CONTENT */}
                                <div className="flex flex-col justify-end h-full p-6 bg-background/60 backdrop-blur-lg relative z-10">

                                    {/* META */}
                                    <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest font-bold mb-3">
                                        <span className="text-primary">
                                            {post.tags?.slice(0, 2).join(" • ") || "General"}
                                        </span>

                                        <span className="w-1 h-1 rounded-full bg-primary/40" />

                                        <span className="text-slate-400 font-serif italic normal-case tracking-normal">
                                            {new Date(post.createdAt).toLocaleDateString("en-US", {
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </span>
                                    </div>

                                    {/* TITLE */}
                                    <h3 className="text-xl lg:text-2xl font-serif font-bold leading-snug text-slate-900 group-hover:text-primary transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>

                                    {/* EXCERPT */}
                                    <p className="text-sm text-muted-foreground font-serif opacity-80 line-clamp-2 mt-2">
                                        {post.excerpt || "No excerpt available."}
                                    </p>

                                    {/* FOOTER */}
                                    <div className="flex items-center justify-between mt-4">

                                        {/* Author */}
                                        <span className="text-xs text-slate-400 font-medium">
                                            @{post.username || "unknown"}
                                        </span>

                                        {/* CTA */}
                                        <div className="flex items-center gap-2 text-primary">
                                            <span className="text-[10px] uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition">
                                                Read
                                            </span>
                                            <ArrowRight className="w-4 h-4 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500" />
                                        </div>

                                    </div>

                                </div>
                            </AspectRatio>

                        </article>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default BlogRest