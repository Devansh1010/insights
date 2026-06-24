
'use client'
import { Bookmark, Share2 } from 'lucide-react'

// Shadcn
import { Button } from '@/components/ui/button'
import { useMemo } from 'react'

import { getUserEvents } from '@/domains/impact/axios/impact.axios'
import { LearnedButton } from '@/domains/impact/components/LearnedButton'
import { IMPACT_EVENTS, ImpactEventType } from '@/domains/impact/constants'
import { useQuery } from '@tanstack/react-query'
import Blockquote from '@tiptap/extension-blockquote'
import Bold from '@tiptap/extension-bold'
import Code from '@tiptap/extension-code'
import Color from '@tiptap/extension-color'
import Heading from '@tiptap/extension-heading'
import Italic from '@tiptap/extension-italic'
import { BulletList, ListItem, OrderedList } from '@tiptap/extension-list'
import TextAlign from '@tiptap/extension-text-align'
import { FontFamily, TextStyle } from '@tiptap/extension-text-style'
import Typography from '@tiptap/extension-typography'
import { generateHTML } from '@tiptap/html'
import StarterKit from '@tiptap/starter-kit'
import Footer_Article from './Footer'
import { useArticle } from '@/domains/article/hooks/useArticle'
import ArticlePageLoader from './loader/ArticlePageLoader'
import { ArticleListError } from './error/ArticleListError'
// import Placeholder from '@tiptap/extension-placeholder'

const Article = ({ articleSlug }: { articleSlug: string }) => {
    const { article, isArticleFetching, isErrorOccured, refetchArticles } = useArticle(articleSlug);


    const htmlContent = useMemo(() => {

        return generateHTML(article.content, [
            StarterKit.configure({
                // Disable extensions that we are configuring manually below
                heading: false,
                blockquote: false,
                bold: false,
                italic: false,
            }),
            // Manually configured extensions to match your editor
            Heading.configure({
                levels: [1, 2, 3, 4, 5, 6],
            }),
            Blockquote,
            Bold,
            Italic,
            BulletList,
            OrderedList,
            ListItem,
            Code,
            TextStyle,
            Color,
            FontFamily,
            Typography,
            // TextUnderline,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            // Placeholder and History aren't needed for read-only HTML, 
            // but including the schema-related ones is vital.
        ])
    }, [article.content]);

    const { data: userEvents, isPending: isLoadingEvents } = useQuery({
        queryKey: ['impact', article._id],
        queryFn: () => getUserEvents(article._id),
    })

    const isLearned =
        userEvents?.some(
            (event: { eventType: ImpactEventType }) =>
                event.eventType === IMPACT_EVENTS.LEARNED
        ) ?? false;

    if (isArticleFetching) return <ArticlePageLoader />;

    if (isErrorOccured) return <ArticleListError reset={refetchArticles} />;

    return (
        <div className="container max-w-4xl mx-auto px-6 flex flex-col gap-20 py-20">

            {/* MAIN CONTENT COLUMN - Now centered */}
            <main className="w-full max-w-3xl mx-auto">
                {/* Tags */}
                <div className="flex flex-wrap gap-3 mb-8">
                    {article.tags?.map((tag: string) => (
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
                            <Button variant="secondary" size="sm" className="rounded-full h-10 px-6 font-medium hover:bg-primary hover:text-primary-foreground transition-all gap-2">
                                <Share2 className="w-4 h-4" /> Share
                            </Button>

                            <LearnedButton
                                articleId={article._id}
                                authorId={article.author._id}
                                isEventExist={isLearned}
                                isPending={isLoadingEvents}
                            />

                            <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 border border-border/50">
                                <Bookmark className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </main>

            {/* FOOTER CONTENT */}
            <Footer_Article
                articleSlug={article}
            />

        </div>
    )
}

export default Article