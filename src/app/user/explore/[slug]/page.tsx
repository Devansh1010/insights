import { notFound } from "next/navigation";
import Image from 'next/image'
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, Share2, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getBlog } from "@/services/blog.service";
import { parseEditorContent } from "@/utils/editorjsRenderer";

interface PageProps {
    params: Promise<{ slug: string }>;
}

const BlogPage = async ({ params }: PageProps) => {

    const { slug } = await params;

    const blog = await getBlog(slug);

    if (!blog || Object.keys(blog).length === 0) {
        notFound();
    }

    const htmlContent = parseEditorContent(blog.content);


    return (
        <article className="min-h-screen bg-background">
            {/* 1. IMMERSIVE HERO SECTION */}
            <header className="relative w-full h-[60vh] md:h-[70vh] flex items-end">
                {/* Overlay Gradient for Text Legibility */}
                <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent z-10" />

                {/* Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
                        alt="Cover"
                        className="w-full h-full object-cover"
                        width={1280}
                        height={720}

                    />
                </div>

                {/* Hero Content */}
                <div className="container max-w-4xl mx-auto px-6 pb-12 relative z-20">
                    {blog.tags?.map((tag: string) => {
                        <Badge className="mb-6 bg-primary/20 text-primary border-none backdrop-blur-md px-4 py-1">
                            {tag}
                        </Badge>
                    })}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight leading-[1.1] mb-8">
                        {blog.title || "Blog Title"}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-sm md:text-base font-medium text-muted-foreground">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-linear-to-br from-indigo-500 to-purple-500 border-2 border-background" />
                            <span className="text-foreground">{blog.author?.username || "Author Name"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString() : "March 18, 2026"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{blog.readTime || "12"} min read</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* 2. ARTICLE LAYOUT */}
            <div className="container max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-16 py-16">

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

                    {/* Content Section (Using the styles we defined for the Editor) */}
                    <div className="prose prose-neutral dark:prose-invert prose-xl max-w-none 
                        prose-headings:font-serif prose-headings:font-bold prose-p:leading-relaxed prose-p:text-foreground/80">
                        <p className="text-2xl font-light italic text-muted-foreground mb-12 border-l-4 border-primary pl-6">
                            {blog.excerpt || "Excerpt not available"}
                        </p>

                        {/* Dynamic content would go here */}
                        <div className="mb-12">
                            <div className="prose prose-neutral dark:prose-invert prose-lg md:prose-xl max-w-none
    prose-headings:font-serif prose-headings:font-bold
    prose-p:leading-relaxed prose-p:text-foreground/80
    prose-img:rounded-xl prose-img:shadow-md
    prose-li:marker:text-primary
    prose-a:text-primary hover:prose-a:underline
  ">
                                {Array.isArray(htmlContent) ? (
                                    htmlContent.map((block: string, index: number) => (
                                        <div
                                            key={index}
                                            dangerouslySetInnerHTML={{ __html: block }}
                                        />
                                    ))
                                ) : (
                                    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                                )}
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
        </article>
    )
}

export default BlogPage
