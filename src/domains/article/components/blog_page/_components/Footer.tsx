
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ArticlePageLoader from './loader/ArticlePageLoader'
import { ArticleListError } from './error/ArticleListError'
import { useArticle } from '@/domains/article/hooks/useArticle'

const Footer_Article = ({ articleSlug }: { articleSlug: string }) => {

  const { article, isArticleFetching, isErrorOccured, refetchArticles } = useArticle(articleSlug);

  if (isArticleFetching) return <ArticlePageLoader />;

  if (isErrorOccured) return <ArticleListError reset={refetchArticles} />;

  return (
    <footer className="w-full max-w-3xl mx-auto border-t border-border/30 mt-20 pt-16">
      <div className="space-y-24">
        {/* Next Blog Section */}
        {article.nextBlog ? (
          <Link
            href={`/user/explore/${article.nextBlog.slug}`}
            className="group block no-underline"
          >
            <div className="space-y-10">
              {/* Section Label: More refined tracking and alignment */}
              <div className="flex items-center gap-3">
                <div className="h-px w-12 bg-primary/30 group-hover:w-20 group-hover:bg-primary transition-all duration-700 ease-in-out"></div>
                <h4 className="text-[11px] font-bold uppercase tracking-[0.4em] text-muted-foreground/60 group-hover:text-primary transition-colors duration-500">
                  Up Next
                </h4>
              </div>

              <div className="flex flex-col md:flex-row gap-10 items-start md:items-center">
                {/* Image: Fixed CLS with Aspect Ratio and Fill */}
                <div className="relative w-full md:w-80 aspect-16/10 rounded-2xl overflow-hidden bg-muted shadow-sm ring-1 ring-border/50 group-hover:ring-primary/20 group-hover:shadow-2xl group-hover:shadow-primary/5 transition-all duration-700">
                  <Image
                    src={article.nextBlog.coverImage || '/fallback.jpg'}
                    alt={article.nextBlog.title}
                    fill
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 320px"
                    priority={false}
                  />
                  {/* Overlay Gradient for high-end feel */}
                  <div className="absolute inset-0 bg-linear-to-tr from-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>

                {/* Text Details: Improved Typography and Spacing */}
                <div className="flex-1 min-w-0 space-y-4">
                  <h5 className="font-serif text-3xl md:text-4xl leading-tight text-foreground group-hover:text-primary transition-colors duration-500 line-clamp-2">
                    {article.nextBlog.title}
                  </h5>
                  <p className="text-muted-foreground/70 leading-relaxed line-clamp-2 text-base md:text-lg font-light">
                    {article.nextBlog.desc || "Dive into the next chapter of this series to explore more technical insights and architectural deep dives."}
                  </p>

                  {/* Animated CTA */}
                  <div className="flex items-center gap-2 text-primary text-[11px] font-black uppercase tracking-[0.2em] pt-2">
                    <span className="relative overflow-hidden">
                      <span className="block transition-transform duration-500 group-hover:-translate-y-full">Read Article</span>
                      <span className="absolute top-0 left-0 block transition-transform duration-500 translate-y-full group-hover:translate-y-0">Keep Reading</span>
                    </span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ) : (
          /* Simple spacer or 'End of Series' badge when no next blog exists */
          <div className="py-10 text-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-muted-foreground/40">End of Series</span>
          </div>
        )}
      </div>
    </footer>
  )
}

export default Footer_Article