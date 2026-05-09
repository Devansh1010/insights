
'use client'
import { ArrowRight, Bookmark, Share2 } from 'lucide-react'

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
import { Blog } from '@/types/frontend/blog'
import Link from 'next/link'
import Image from 'next/image'
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
        /* Changed grid-cols-1 lg:grid-cols-[1fr_300px] to a single centered column */
        <div className="container max-w-4xl mx-auto px-6 flex flex-col gap-20 py-20">

            {/* MAIN CONTENT COLUMN - Now centered */}
            <main className="w-full max-w-3xl mx-auto">
                {/* Tags */}
                <div className="flex flex-wrap gap-3 mb-8">
                    {blog.tags?.map((tag: string) => (
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
                            <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 border border-border/50">
                                <Bookmark className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </main>

            {/* SIDEBAR CONTENT -> NOW FOOTER CONTENT */}
            <footer className="w-full max-w-3xl mx-auto border-t border-border/30 mt-20 pt-16">
    <div className="space-y-24">
        {/* Next Blog Section */}
        {blog.nextBlog ? (
            <Link 
                href={`/user/explore/${blog.nextBlog.slug}`} 
                className="group block no-underline"
            >
                <div className="space-y-10">
                    {/* Section Label: More refined tracking and alignment */}
                    <div className="flex items-center gap-3">
                        <div className="h-[1px] w-12 bg-primary/30 group-hover:w-20 group-hover:bg-primary transition-all duration-700 ease-in-out"></div>
                        <h4 className="text-[11px] font-bold uppercase tracking-[0.4em] text-muted-foreground/60 group-hover:text-primary transition-colors duration-500">
                            Up Next
                        </h4>
                    </div>

                    <div className="flex flex-col md:flex-row gap-10 items-start md:items-center">
                        {/* Image: Fixed CLS with Aspect Ratio and Fill */}
                        <div className="relative w-full md:w-80 aspect-16/10 rounded-2xl overflow-hidden bg-muted shadow-sm ring-1 ring-border/50 group-hover:ring-primary/20 group-hover:shadow-2xl group-hover:shadow-primary/5 transition-all duration-700">
                            <Image
                                src={blog.nextBlog.coverImage || '/fallback.jpg'}
                                alt={blog.nextBlog.title}
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
                                {blog.nextBlog.title}
                            </h5>
                            <p className="text-muted-foreground/70 leading-relaxed line-clamp-2 text-base md:text-lg font-light">
                                {blog.nextBlog.desc || "Dive into the next chapter of this series to explore more technical insights and architectural deep dives."}
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
            /* Optional: Simple spacer or 'End of Series' badge when no next blog exists */
            <div className="py-10 text-center">
                <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-muted-foreground/40">End of Series</span>
            </div>
        )}
    </div>
</footer>
        </div>
    )
}

export default Article