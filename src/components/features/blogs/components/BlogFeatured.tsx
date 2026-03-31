import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Blog } from "@/hooks/blogs/useBlogsFilter"
import { User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"


const BlogFeatured = ({ featured }: { featured: Blog }) => {
      const FALLBACK = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop';

    return (
        <div>
            <section className="group mb-24 px-4 lg:px-0">
                <Link href={`/blogs/${featured.slug}`}>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-center">

                        {/* TEXT SIDE */}
                        <div className="lg:col-span-5 space-y-8 order-2 lg:order-1">

                            {/* Meta */}
                            <div className="flex items-center gap-3 text-sm font-medium">
                                <span className="uppercase tracking-[0.2em] text-[12px] font-black text-primary">
                                    Featured
                                </span>
                                <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                                <span className="text-slate-400 font-serif italic">
                                    {new Date(featured.createdAt).toLocaleDateString("en-US", {
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </span>
                            </div>

                            {/* Title + Desc */}
                            <div className="space-y-4">
                                <h2 className="text-4xl lg:text-6xl font-serif font-bold leading-[1.1] text-slate-900 group-hover:text-primary transition-colors duration-500">
                                    {featured.title}
                                </h2>

                                <p className="text-muted-foreground leading-relaxed text-lg lg:text-xl font-serif font-medium opacity-80">
                                    {featured.excerpt || featured.desc}
                                </p>
                            </div>

                            {/* Tags */}
                            {featured.tags && (
                                <div className="flex flex-wrap gap-2">
                                    {featured.tags.slice(0, 3).map((tag) => (
                                        <span
                                            key={tag}
                                            className="text-[10px] uppercase tracking-widest bg-primary/10 text-primary px-3 py-1 rounded-full font-bold"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Author */}
                            <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
                                <div className="relative w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-200 overflow-hidden shadow-inner">
                                    <User className="h-6 w-6 text-slate-400" />
                                </div>

                                <div>
                                    <p className="text-sm font-black text-slate-900 tracking-tight">
                                        @{featured.username}
                                    </p>
                                    <p className="text-[10px] uppercase tracking-widest text-primary font-bold">
                                        Author
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* IMAGE SIDE */}
                        <div className="lg:col-span-7 order-1 lg:order-2">
                            <div className="relative w-full overflow-hidden rounded-[2.5rem] shadow-2xl transition-all duration-700 group-hover:shadow-primary/5">

                                <AspectRatio ratio={16 / 9} className="bg-slate-100">
                                    <Image
                                        src={featured.coverImage? featured.coverImage: FALLBACK}
                                        alt={featured.title}
                                        fill
                                        priority
                                        className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-in-out"
                                    />

                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
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