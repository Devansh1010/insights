
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


    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {rest?.map((post: Blog) => {
        const isExpanded = expandedId === post._id;

        return (
          <Link
            href={`/user/explore/${post._id}`}
            key={post._id}
          >
            <Card
              className="group flex flex-col h-full border-border/60 bg-background hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              {/* HEADER */}
              <CardHeader className="flex flex-row items-start justify-between pb-3">

                {/* USER */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                    {post?.username?.[0]?.toUpperCase() || "U"}
                  </div>

                  <div className="text-sm leading-tight">
                    <p className="font-medium">@{post?.username || "unknown"}</p>
                  </div>
                </div>

                {/* DATE */}
                <span className="text-xs text-muted-foreground">
                  {formatDate(post?.publishedAt)}
                </span>
              </CardHeader>

              {/* CONTENT */}
              <CardContent className="flex flex-col flex-1 space-y-4">

                {/* 🔥 HOOK */}
                <h2 className="text-base font-semibold leading-snug text-primary line-clamp-2">
                  {post?.hook || "No hook available"}
                </h2>

                {/* TITLE */}
                <h3 className="text-lg font-serif font-semibold leading-snug text-foreground group-hover:underline underline-offset-4 line-clamp-2">
                  {post?.title || "Untitled"}
                </h3>

                {/* INSIGHTS */}
                <div className="text-sm text-muted-foreground space-y-1">
                  {post?.insights
                    ?.slice(0, isExpanded ? 5 : 2)
                    .map((item: string, i: number) => (
                      <p key={i} className="flex gap-2">
                        <span className="text-primary">•</span>
                        <span>{item}</span>
                      </p>
                    ))}
                </div>

                {/* EXPAND */}
                {Array.isArray(post?.insights) && post.insights.length > 2 && (
                  <Button
                    onClick={() =>
                      setExpandedId(isExpanded ? null : post._id)
                    }
                    variant="ghost"
                    size="sm"
                    className="text-xs px-0 w-fit"
                  >
                    {isExpanded ? "Show less ↑" : "Show more ↓"}
                  </Button>
                )}

                {/* IMAGE */}
                {post?.coverImage && (
                  <div className="mt-2 overflow-hidden rounded-xl">
                    <Image
                      src={post.coverImage}
                      alt="cover"
                      width={600}
                      height={300}
                      className="object-cover w-full h-auto transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                )}

                {/* FOOTER */}
                <div className="flex items-center justify-between pt-3 mt-auto border-t border-border/50">

                  {/* META */}
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">

                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post?.readTime ? `${post.readTime} min` : "—"}
                    </span>

                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      {post?.views || 0}
                    </span>

                    {/* LEVEL */}
                    <span className="flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5" />
                      {post.level}
                    </span>

                  </div>

                  {/* CTA */}

                  Read
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />

                </div>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  )
}

export default BlogRest