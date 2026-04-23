import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Blog } from "@/hooks/blogs/useBlogsFilter"
import Image from "next/image"
import Link from "next/link"
import { Clock, Eye} from "lucide-react";
import { Badge } from "@/components/ui/badge";


const BlogFeatured = ({ featured }: { featured: Blog }) => {

    const formattedDate = featured?.publishedAt
        ? new Date(featured.publishedAt).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
        })
        : "Recently";

    return (
        <div>
            <section className="group mb-24 px-4 lg:px-0 border-t border-zinc-200 dark:border-zinc-800 pt-12">
                <Link href={`/user/explore/${featured?._id}`}>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-center">

                        {/* TEXT SIDE: flex-col with justify-between keeps content and author at edges */}
                        <div className="lg:col-span-5 flex flex-col justify-between py-1 order-2 lg:order-1">
                            <div className="space-y-6">
                                {/* META TOP */}
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] uppercase tracking-[0.3em] font-black text-primary">
                                        Featured
                                    </span>
                                    <div className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                                    <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">
                                        {formattedDate}
                                    </span>
                                </div>

                                {/* TITLE AREA */}
                                <div className="space-y-3">
                                    <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-tight">
                                        {featured?.hook}
                                    </h3>
                                    <h2 className="text-3xl lg:text-5xl font-black leading-[1.1] tracking-tighter text-zinc-950 dark:text-white group-hover:text-primary transition-colors duration-300">
                                        {featured?.title || "Untitled Post"}
                                    </h2>
                                </div>

                                {/* EXCERPT */}
                                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-base font-medium line-clamp-3">
                                    {featured?.excerpt || featured?.desc}
                                </p>

                                {/* STATS & TAGS */}
                                <div className="flex flex-wrap items-center gap-4 pt-2">
                                    <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                                        <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {featured.readTime}m</span>
                                        <span className="flex items-center gap-1.5"><Eye className="w-3 h-3" /> {featured.views}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        {featured?.tags?.slice(0, 2).map((tag) => (
                                            <Badge key={tag} variant="secondary" className="rounded-none text-[9px] uppercase font-black px-2 py-0">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* BOTTOM ALIGNED AUTHOR - creates the bottom "border" feel */}
                            <div className="pt-8 flex items-center justify-between mt-auto">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 overflow-hidden relative">
                                        {/* Optional: Add Author Image here */}
                                        <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold">@</div>
                                    </div>
                                    <p className="text-xs font-bold uppercase tracking-tight text-zinc-500">
                                        {featured?.username || "unknown"}
                                    </p>
                                </div>
                                <span className="text-xs font-black uppercase tracking-[0.2em] group-hover:mr-2 transition-all">
                                    Read Story →
                                </span>
                            </div>
                        </div>

                        {/* IMAGE SIDE */}
                        <div className="lg:col-span-7 order-1 lg:order-2">
                            <div className="relative overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900 shadow-xl">
                                <AspectRatio ratio={16 / 9} className="h-full">
                                    <Image
                                        src={featured.coverImage || ''}
                                        alt={featured.title}
                                        fill
                                        priority
                                        className="object-cover group-hover:scale-105 transition-transform duration-1000"
                                    />
                                    {/* Level Badge Overlay */}
                                    <div className="absolute top-4 right-4">
                                        <span className="bg-white/90 dark:bg-black/90 backdrop-blur-sm text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 shadow-sm">
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