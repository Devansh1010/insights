
'use client'
import { Blog } from '@/hooks/blogs/useBlogsFilter'
import { Bookmark, Share2 } from 'lucide-react'

// Shadcn
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useMemo } from 'react'

import { generateHTML } from '@tiptap/html'
import StarterKit from '@tiptap/starter-kit'
import { TextStyle } from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import Typography from '@tiptap/extension-typography'
import Heading from '@tiptap/extension-heading'
// import Placeholder from '@tiptap/extension-placeholder'

const Article = ({ blog }: { blog: Blog }) => {

    const htmlContent = useMemo(() => {
        return generateHTML(blog?.content, [
            StarterKit,
            Heading.configure({
                levels: [1, 2, 3, 4, 5, 6],
            }),
            TextStyle,
            Color,
            Typography,
            // Add any other extensions you used in the editor here (e.g., Image, CodeBlock)
        ])
    }, [blog.content])

    return (
        <div className="container max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-1 py-16">

            {/* MAIN CONTENT COLUMN */}
            <main className="max-w-3xl mx-auto w-full">
                {/* Tags at the top of content */}
                <div className="flex gap-2 mb-10">
                    {blog.tags?.map((tag: string) => (
                        <span key={tag} className="text-xs font-bold uppercase tracking-widest text-primary/60">
                            #{tag}
                        </span>
                    ))}
                </div>

                {/* Content Section */}
                <div className="prose prose-neutral dark:prose-invert prose-xl max-w-none 
                        prose-headings:font-serif prose-headings:font-bold prose-p:leading-relaxed prose-p:text-foreground/80">

                    {/* Dynamic content would go here */}
                    <div className="mb-12">
                        <div className="prose prose-neutral dark:prose-invert prose-lg md:prose-xl max-w-none
    prose-headings:font-serif prose-headings:font-bold
    prose-p:leading-relaxed prose-p:text-foreground/80
    prose-img:rounded-xl prose-img:shadow-md
    prose-li:marker:text-primary
    prose-a:text-primary hover:prose-a:underline
  ">
                            <div
                                className="prose prose-neutral dark:prose-invert max-w-none"
                                dangerouslySetInnerHTML={{ __html: htmlContent }}
                            />
                        </div>
                    </div>
                </div>

                <Separator className="my-20" />

                {/* FOOTER OF ARTICLE */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="sm" className="rounded-full gap-2">
                            <Share2 className="w-4 h-4" /> Share
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-full gap-2">
                            <Bookmark className="w-4 h-4" /> Save
                        </Button>
                    </div>
                </div>
            </main>

            {/* SIDEBAR (Only visible on desktop) */}
            <aside className="hidden lg:block space-y-12 sticky top-24 h-fit">
                <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Related Story</h4>
                    <div className="group cursor-pointer">
                        <div className="aspect-video rounded-lg bg-muted mb-3 overflow-hidden">
                            <div className="w-full h-full bg-neutral-800 group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <h5 className="font-bold leading-snug group-hover:text-primary transition-colors">
                            Moving from MERN to Rust for Backend Systems
                        </h5>
                    </div>
                </div>

                <div className="p-6 rounded-2xl bg-muted/50 border border-border/50">
                    <h4 className="text-sm font-bold mb-2">Join the Newsletter</h4>
                    <p className="text-xs text-muted-foreground mb-4">Get the latest engineering deep-dives in your inbox.</p>
                    <Button className="w-full rounded-full text-xs font-bold">Subscribe</Button>
                </div>
            </aside>
        </div>
    )
}

export default Article