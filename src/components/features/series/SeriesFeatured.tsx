import Link from "next/link"
import { Series } from "./SeriesList"
import Image from "next/image"
import { User } from "lucide-react"


const SeriesFeatured = ({ series, page }: { series: Series, page: number }) => {

    const FALLBACK = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop';
    
    return (
        <div>
            {series && page === 1 && (
                <section className="group mb-24 px-4 lg:px-0">
                    <Link href={`series/${series._id}`}>
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">


                            <div className="lg:col-span-5 space-y-6 order-2 lg:order-1">
                                <div className="flex items-center gap-3 text-sm font-medium text-primary">
                                    <span className="uppercase tracking-widest text-[13px] font-bold">Featured</span>
                                    <span className="w-1 h-1 rounded-full bg-primary" />
                                    <span className="text-slate-400 font-normal">
                                        {new Date(series.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                    </span>
                                </div>

                                <h2 className="text-4xl lg:text-5xl font-serif font-bold leading-[1.1] text-slate-900 group-hover:underline decoration-primary/30 underline-offset-10 transition-all">
                                    {series.title}
                                </h2>

                                <p className="text-muted-foreground leading-relaxed text-lg">
                                    {series.desc}
                                </p>

                                <div className="flex items-center gap-4 pt-4 border-t border-slate-50">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 overflow-hidden">
                                        <User className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900">@{series.author.username}</p>
                                        <p className="text-[10px] uppercase tracking-tighter text-slate-400 font-medium">Technical Lead</p>
                                    </div>
                                </div>
                            </div>

                            {/* Image Side (7 Columns) */}
                            <div className="lg:col-span-7 order-1 lg:order-2">
                                <div className="relative aspect-video w-full overflow-hidden rounded-[2rem] bg-slate-100 shadow-xl group-hover:shadow-2xl transition-all duration-700">
                                    <Image
                                        src={series.coverImage || FALLBACK}
                                        alt={series.title}
                                        fill
                                        priority
                                        className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-in-out"
                                    />
                                </div>
                            </div>

                        </div>
                    </Link>
                </section>
            )}
        </div>
    )
}

export default SeriesFeatured