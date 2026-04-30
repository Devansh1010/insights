
import { Button } from '@/components/ui/button'

import Image from 'next/image'
import Link from 'next/link'

import { useState } from 'react'
import { Clock, Eye, ArrowRight, ArrowUpRight } from "lucide-react";
import { Blog } from '@/types/frontend/blog';
import { LevelBadge } from '../../badges/MetaBedge';


const BlogRest = ({ rest }: { rest: Blog[] }) => {

  const formatDate = (date?: Date) => {
    if (!date || !new Date(date)) return "Recently";

    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    })
  };

  console.log("Rest Blogs:", rest);

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
                <div className="relative aspect-16/10 overflow-hidden rounded-2xl bg-muted border border-border/40 shadow-sm group-hover:shadow-2xl group-hover:shadow-primary/5 transition-all duration-500">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                  {/* Floating Level Badge */}
                  <div className="absolute top-4 left-4">
                    <LevelBadge title={post.level} />
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
                <div className="flex items-center justify-between pt-6 mt-auto border-t border-border/40">
                  <div className="flex items-center gap-5">
                    {/* Read Time Group */}
                    <div className="flex items-center gap-1.5 group/item">
                      <Clock className="w-3.5 h-3.5 text-muted-foreground/40 group-hover/item:text-primary transition-colors" />
                      <span className="text-[11px] font-mono font-medium text-muted-foreground/70 uppercase tracking-tighter">
                        {post?.readTime ? `${post.readTime} MIN` : "—"}
                      </span>
                    </div>

                    {/* Divider Dot */}
                    <div className="h-1 w-1 rounded-full bg-border" />

                    {/* Views Group */}
                    <div className="flex items-center gap-1.5 group/item">
                      <Eye className="w-3.5 h-3.5 text-muted-foreground/40 group-hover/item:text-primary transition-colors" />
                      <span className="text-[11px] font-mono font-medium text-muted-foreground/70 tabular-nums">
                        {post?.views?.toLocaleString() || 0}
                      </span>
                    </div>
                  </div>

                  {/* Optional: Add a "Read More" Arrow that appears on hover */}
                  <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    Entry
                    <ArrowUpRight className="w-3 h-3" />
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