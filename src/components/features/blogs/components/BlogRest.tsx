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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {rest?.map((post: Blog) => (
                    <Link
                        key={post._id}
                        href={`/user/explore/${post.slug}`}
                        className="group block"
                    >
                        <div className="overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-500">

                            <AspectRatio ratio={16 / 9} className="relative">

                                {/* BACKGROUND IMAGE */}
                                <Image
                                    src={post.coverImage || FALLBACK}
                                    alt={post.title}
                                    fill
                                    priority
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />

                                {/* DARK OVERLAY */}
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition" />

                                {/* CONTENT */}
                                <div className="absolute bottom-0 w-full p-5 text-white z-10">

                                    {/* META */}
                                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold mb-2">
                                        <span className="text-primary">
                                            {post.tags?.slice(0, 2).join(" • ") || "General"}
                                        </span>

                                        <span className="w-1 h-1 rounded-full bg-white/40" />

                                        <span className="italic normal-case tracking-normal text-white/70">
                                            {new Date(post.createdAt).toLocaleDateString("en-US", {
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </span>
                                    </div>

                                    {/* TITLE */}
                                    <h3 className="text-lg md:text-xl font-serif font-bold leading-snug line-clamp-2">
                                        {post.title}
                                    </h3>

                                    {/* EXCERPT */}
                                    <p className="text-sm opacity-80 line-clamp-2 mt-1">
                                        {post.excerpt || "No excerpt available."}
                                    </p>

                                    {/* FOOTER */}
                                    <div className="flex items-center justify-between mt-3">

                                        <span className="text-xs opacity-70">
                                            @{post.username || "unknown"}
                                        </span>

                                        <div className="flex items-center gap-1 text-sm opacity-0 group-hover:opacity-100 transition">
                                            <span>Read</span>
                                            <ArrowRight className="w-4 h-4 -translate-x-1 group-hover:translate-x-0 transition-all" />
                                        </div>

                                    </div>

                                </div>

                            </AspectRatio>

                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default BlogRest