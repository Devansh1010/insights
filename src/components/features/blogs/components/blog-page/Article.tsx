
'use client'
import { Blog } from '@/hooks/blogs/useBlogsFilter'
import { Bookmark, Share2 } from 'lucide-react'

// Shadcn
import { Button } from '@/components/ui/button'
import { useMemo } from 'react'

import { generateHTML } from '@tiptap/html'
import StarterKit from '@tiptap/starter-kit'
import { FontFamily, TextStyle } from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import Typography from '@tiptap/extension-typography'
import Heading from '@tiptap/extension-heading'
import Blockquote from '@tiptap/extension-blockquote'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import { BulletList, ListItem, OrderedList } from '@tiptap/extension-list'
import Code from '@tiptap/extension-code'
import TextAlign from '@tiptap/extension-text-align'
// import Placeholder from '@tiptap/extension-placeholder'

const Article = ({ blog }: { blog: Blog }) => {

    const htmlContent = useMemo(() => {

    return generateHTML(blog.content, [
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
}, [blog.content]);

    return (
        <div className="container max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-16 py-20">

            {/* MAIN CONTENT COLUMN */}
            <main className="w-full">
                {/* Tags: Made more subtle and refined */}
                <div className="flex flex-wrap gap-3 mb-8">
                    {blog.tags?.map((tag: string) => (
                        <span key={tag} className="px-3 py-1 bg-secondary/50 text-[10px] font-bold uppercase tracking-[0.2em] text-secondary-foreground rounded-full border border-border/50">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Content Section: Focused on Readability */}
                <article className="selection:bg-primary/10">
                    <div className="prose prose-neutral dark:prose-invert max-w-none
                /* Typography: Serif for headings, Sans for body for high-end feel */
                prose-headings:font-serif prose-headings:tracking-tight prose-headings:text-foreground
                prose-p:text-lg prose-p:leading-relaxed prose-p:text-muted-foreground/90
                /* Clean list styling */
                prose-li:marker:text-primary/60
                /* Advanced Link Styling */
                prose-a:no-underline prose-a:font-semibold prose-a:border-b-2 prose-a:border-primary/20 hover:prose-a:border-primary transition-all
                /* Image Handling */
                prose-img:rounded-2xl prose-img:shadow-2xl prose-img:shadow-primary/5
                /* Code blocks refined */
                prose-pre:rounded-2xl prose-pre:bg-neutral-900/50 prose-pre:backdrop-blur-sm
            ">
                        <div
                            className="dynamic-content-wrapper"
                            dangerouslySetInnerHTML={{ __html: htmlContent }}
                        />
                    </div>
                </article>

                <div className="mt-20 pt-10 border-t border-border/60">
                    {/* FOOTER OF ARTICLE: Modern minimalist layout */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Button variant="secondary" size="sm" className="rounded-full h-10 px-6 font-medium hover:bg-primary hover:text-primary-foreground transition-all gap-2">
                                <Share2 className="w-4 h-4" /> Share
                            </Button>
                            <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 border border-border/50">
                                <Bookmark className="w-4 h-4" />
                            </Button>
                        </div>

                        <div className="flex gap-4">
                            {/* Add a 'clap' or 'like' interaction here for better UX */}
                        </div>
                    </div>
                </div>
            </main>

            {/* SIDEBAR: Floating & Modern */}
            <aside className="hidden lg:block">
                <div className="sticky top-24 space-y-12">
                    {/* Related Story: Card approach */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="h-px w-8 bg-primary/40"></div>
                            <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-muted-foreground">Up Next</h4>
                        </div>

                        <div className="group cursor-pointer">
                            <div className="aspect-16/10 rounded-2xl bg-muted mb-4 overflow-hidden ring-1 ring-border/50 group-hover:ring-primary/20 transition-all">
                                <div className="w-full h-full bg-neutral-800 group-hover:scale-105 transition-transform duration-700 ease-out" />
                            </div>
                            <h5 className="font-serif text-lg leading-tight group-hover:text-primary transition-colors decoration-primary/30 decoration-2 underline-offset-4 group-hover:underline">
                                Moving from MERN to Rust for Backend Systems
                            </h5>
                        </div>
                    </div>

                    {/* Newsletter: Sophisticated Card */}
                    <div className="p-8 rounded-[2rem] bg-linear-to-b from-secondary/30 to-secondary/10 border border-border/50 backdrop-blur-sm">
                        <h4 className="text-lg font-serif font-bold mb-2">The Deep Dive</h4>
                        <p className="text-sm text-muted-foreground/80 leading-relaxed mb-6">
                            Join 12,000+ engineers receiving weekly system design breakdowns.
                        </p>
                        <div className="space-y-3">
                            <input
                                type="email"
                                placeholder="email@work.com"
                                className="w-full bg-background border-border/50 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            />
                            <Button className="w-full rounded-xl py-6 font-bold shadow-lg shadow-primary/20 hover:shadow-none transition-all">
                                Join Newsletter
                            </Button>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    )
}

export default Article