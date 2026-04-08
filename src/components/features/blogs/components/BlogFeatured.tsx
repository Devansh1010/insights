import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Blog } from "@/hooks/blogs/useBlogsFilter"
import Image from "next/image"
import Link from "next/link"
import { Clock, Eye, Heart } from "lucide-react";


const BlogFeatured = ({ featured }: { featured: Blog }) => {
    const FALLBACK = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop';

    const formattedDate = featured?.publishedAt
        ? new Date(featured.publishedAt).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
        })
        : "Recently";

    return (
        <div>
            <section className="group mb-24 px-4 lg:px-0">
                <Link href={`/blogs/${featured?.slug}`}>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-center">

                        {/* TEXT SIDE */}
                        <div className="lg:col-span-5 space-y-7 order-2 lg:order-1">

                            {/* META TOP */}
                            <div className="flex items-center justify-between text-xs">

                                <div className="flex items-center gap-3 font-medium">
                                    <span className="uppercase tracking-[0.25em] text-primary font-bold">
                                        Featured
                                    </span>
                                    <span className="w-1 h-1 rounded-full bg-slate-400" />
                                    <span className="text-slate-500 italic">
                                        {formattedDate}
                                    </span>
                                </div>

                                {/* LEVEL */}
                                <span className="text-[10px] uppercase tracking-widest bg-muted text-muted-foreground px-2 py-1 rounded-full">
                                    {featured.level}
                                </span>
                            </div>

                            {/* 🔥 HOOK (MAIN ATTENTION) */}
                            <h3 className="text-lg sm:text-xl font-semibold text-primary leading-snug line-clamp-2">
                                {featured?.hook}
                            </h3>

                            {/* TITLE */}
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold leading-tight text-slate-900 dark:text-white line-clamp-3 group-hover:underline underline-offset-4 transition-all duration-300">
                                {featured?.title || "Untitled Post"}
                            </h2>

                            {/* META INFO */}
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">

                                <span className="flex items-center gap-1.5">
                                    <Clock className="w-3.5 h-3.5" />
                                    {featured.readTime || "N/A"} min read
                                </span>

                                <span className="flex items-center gap-1.5">
                                    <Eye className="w-3.5 h-3.5" />
                                    {featured.views || 0}
                                </span>

                                <span className="flex items-center gap-1.5">
                                    <Heart className="w-3.5 h-3.5" />
                                    {featured.likes || 0}
                                </span>

                            </div>

                            {/* EXCERPT */}
                            <p className="text-muted-foreground leading-relaxed text-base lg:text-lg font-serif opacity-80 line-clamp-3">
                                {featured?.excerpt || featured?.desc}
                            </p>

                            {/* TAGS */}
                            {featured?.tags && (
                                <div className="flex flex-wrap gap-2">
                                    {featured?.tags?.slice(0, 3).map((tag) => (
                                        <span
                                            key={tag}
                                            className="text-[10px] uppercase tracking-widest bg-primary/10 text-primary px-3 py-1 rounded-full font-bold"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* AUTHOR */}
                            <div className="pt-5 border-t border-slate-200/50 flex items-center justify-between">

                                <p className="text-sm text-slate-600">
                                    By @{featured?.username || "unknown"}
                                </p>

                                {/* CTA */}
                                <span className="text-sm font-medium text-primary group-hover:translate-x-1 transition-transform">
                                    Read →
                                </span>

                            </div>
                        </div>

                        {/* IMAGE SIDE */}
                        <div className="lg:col-span-7 order-1 lg:order-2">
                            <div className="relative w-full overflow-hidden rounded-[2.5rem] shadow-2xl transition-all duration-700 group-hover:shadow-primary/5">

                                <AspectRatio ratio={16 / 9} className="bg-slate-100">
                                    <Image
                                        src={featured.coverImage || FALLBACK}
                                        alt={featured.title}
                                        fill
                                        priority
                                        className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-in-out"
                                    />

                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                    {/* OPTIONAL FLOATING META */}
                                    <div className="absolute bottom-4 left-4 flex gap-2 text-[10px]">
                                        <span className="bg-black/60 text-white px-2 py-1 rounded">
                                            {featured.readTime} min
                                        </span>
                                        <span className="bg-black/60 text-white px-2 py-1 rounded">
                                            {featured.level}
                                        </span>
                                    </div>

                                </AspectRatio>

                            </div>
                        </div>

                    </div>
                </Link>
            </section>
        </div>
    )
}

export default BlogFeatured