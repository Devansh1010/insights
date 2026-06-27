
'use client'

import { getUserEvents } from '@/domains/impact/axios/impact.axios'
import { LearnedButton } from '@/domains/impact/components/LearnedButton'
import { useQuery } from '@tanstack/react-query'

import Footer_Article from './Footer'
import { Blog } from '@/types/frontend/blog'
import { useGeneratHtml } from '@/domains/article/hooks/useGeneratHtml'
import { SaveButton } from '@/domains/impact/components/SavedButton'
import { useEventExist } from '@/domains/article/hooks/useEventExist'
import AppliedButton from '@/domains/impact/components/AppliedButton'
import ThankYouButton from '@/domains/impact/components/ThankYouButton'

const Article = ({ article }: { article: Blog }) => {

    const htmlContent = useGeneratHtml(article.content)

    const { data: userEvents, isPending: isLoadingEvents } = useQuery({
        queryKey: ['impact', article._id],
        queryFn: () => getUserEvents(article._id),
    })

    const eventExist = useEventExist(userEvents)

    return (
        <div className="container max-w-4xl mx-auto px-6 flex flex-col gap-20 py-20">

            {/* MAIN CONTENT COLUMN - Now centered */}
            <main className="w-full max-w-3xl mx-auto">
                {/* Tags */}
                <div className="flex flex-wrap gap-3 mb-8">
                    {article?.tags?.map((tag: string) => (
                        <span key={tag} className="px-3 py-1 bg-secondary/50 text-[10px] font-bold uppercase tracking-[0.2em] text-secondary-foreground rounded-full border border-border/50">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Content Section */}
                <article className="selection:bg-primary/10">
                    <div className="prose prose-neutral dark:prose-invert max-w-none
                prose-headings:font-serif prose-headings:tracking-tight prose-headings:text-foreground
                prose-p:text-lg prose-p:leading-relaxed prose-p:text-muted-foreground/90
                prose-li:marker:text-primary/60
                prose-a:no-underline prose-a:font-semibold prose-a:border-b-2 prose-a:border-primary/20 hover:prose-a:border-primary transition-all
                prose-img:rounded-2xl prose-img:shadow-2xl prose-img:shadow-primary/5
                prose-pre:rounded-2xl prose-pre:bg-neutral-900/50 prose-pre:backdrop-blur-sm
            ">
                        <div
                            className="dynamic-content-wrapper"
                            dangerouslySetInnerHTML={{ __html: htmlContent }}
                        />
                    </div>
                </article>

                <div className="mt-20 pt-10 border-t border-border/60">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <SaveButton
                                articleId={article._id}
                                authorId={article.author._id}
                                isSaved={eventExist.saved}
                                isPending={isLoadingEvents}
                            />

                            <LearnedButton
                                articleId={article._id}
                                authorId={article.author._id}
                                isEventExist={eventExist.learned}
                                isPending={isLoadingEvents}
                            />

                            <AppliedButton
                                articleId={article._id}
                                authorId={article.author._id}
                                isApplied={eventExist.applied}
                                isPending={isLoadingEvents}
                            />

                            <ThankYouButton
                                articleId={article._id}
                                authorId={article.author._id}
                                isThanked={eventExist.thankYou}
                                isPending={isLoadingEvents}
                            />
                        </div>
                    </div>
                </div>
            </main>

            {/* FOOTER CONTENT */}
            <Footer_Article
                articleSlug={article.slug}
            />

        </div>
    )
}

export default Article