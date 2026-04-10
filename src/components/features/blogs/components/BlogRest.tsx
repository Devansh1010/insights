
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Blog } from '@/hooks/blogs/useBlogsFilter'
import Image from 'next/image'
import Link from 'next/link'

import { useState } from 'react'
import { Clock, Eye, ArrowRight, Layers } from "lucide-react";


const BlogRest = ({ rest }: { rest: Blog[] }) => {
  const FALLBACK = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop';

  const formatDate = (date?: Date) => {
    if (!date || !new Date(date)) return "Recently";

    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    })
  };

  const [expandedId, setExpandedId] = useState<string | null>(null);
  return (

    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
      {rest?.map((post: Blog) => {
        const isExpanded = expandedId === post._id;

        return (
          <Link href={`/user/explore/${post._id}`} key={post._id} className="group block">
            <article className="flex flex-col h-full space-y-5 transition-all duration-500">

              {/* IMAGE CONTAINER - Sophisticated Shadow & Scale */}
              {post?.coverImage && (
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-muted border border-border/40 shadow-sm group-hover:shadow-2xl group-hover:shadow-primary/5 transition-all duration-500">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                  {/* Floating Level Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-background/80 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-border/50">
                      {post.level}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex flex-col flex-1 space-y-4 px-1">
                {/* META TOP */}
                <div className="flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span className="text-primary font-bold">@{post?.username || "unknown"}</span>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span>{formatDate(post?.publishedAt)}</span>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="space-y-3">
                  <h2 className="text-sm font-bold text-primary/80 uppercase tracking-wide line-clamp-1">
                    {post?.hook || "Insight"}
                  </h2>
                  <h3 className="text-2xl font-serif font-bold leading-tight text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                    {post?.title || "Untitled"}
                  </h3>
                </div>

                {/* INSIGHTS - Refined List style */}
                <div className="space-y-2 text-muted-foreground/90 text-sm leading-relaxed font-serif italic border-l-2 border-primary/10 pl-4 py-1">
                  {post?.insights
                    ?.slice(0, isExpanded ? 5 : 2)
                    .map((item: string, i: number) => (
                      <p key={i} className="line-clamp-2">
                        {item}
                      </p>
                    ))}
                </div>

                {/* EXPAND BUTTON - Pure Minimalist */}
                {Array.isArray(post?.insights) && post.insights.length > 2 && (
                  <Button
                    onClick={(e) => {
                      e.preventDefault(); // Prevent Link navigation when clicking button
                      setExpandedId(isExpanded ? null : post._id);
                    }}
                    variant="ghost"
                    size="sm"
                    className="text-[10px] uppercase tracking-widest font-bold h-auto p-0 hover:bg-transparent hover:text-primary transition-colors"
                  >
                    {isExpanded ? "Less —" : "More +"}
                  </Button>
                )}

                {/* FOOTER - Spaced and light */}
                <div className="flex items-center justify-between pt-6 mt-auto">
                  <div className="flex items-center gap-4 text-[11px] font-bold text-muted-foreground/60">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {post?.readTime ? `${post.readTime}m` : "—"}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" />
                      {post?.views || 0}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest group-hover:text-primary transition-colors">
                    Read Article
                    <ArrowRight className="w-4 h-4 -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </div>
                </div>
              </div>
            </article>
          </Link>
        );
      })}
    </div>
  )
}

export default BlogRest