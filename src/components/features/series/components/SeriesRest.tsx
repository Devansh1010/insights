
import { Series } from "@/components/features/series/SeriesListPage"
import Image from "next/image"
import Link from "next/link"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { ArrowRight } from "lucide-react"


const SeriesRest = ({ series }: { series: Series[] }) => {

    const FALLBACK = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop';

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {series.map((item: Series) => (
                    <Link href={`series/${item._id}`} key={item._id} className="group block">

                        <div className="relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-500">

                            <AspectRatio ratio={16 / 9} className="relative">

                                {/* IMAGE */}
                                <Image
                                    src={item.coverImage || FALLBACK}
                                    alt={item.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />

                                {/* GRADIENT OVERLAY */}
                                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent transition" />

                                {/* CONTENT */}
                                <div className="absolute bottom-0 w-full p-5 z-10 text-white">

                                    <div className="flex items-end justify-between gap-4">

                                        {/* LEFT */}
                                        <div className="flex-1 min-w-0">

                                            <h3 className="text-lg md:text-xl font-serif font-bold leading-tight line-clamp-1">
                                                {item.title}
                                            </h3>

                                            <p className="text-sm text-white/80 line-clamp-2 mt-1">
                                                {item.desc}
                                            </p>

                                            <span className="text-xs text-white/60 mt-2 block">
                                                @{item.author.username}
                                            </span>

                                        </div>

                                        {/* RIGHT CTA */}
                                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">

                                            <span className="text-sm">View</span>
                                            <ArrowRight className="w-4 h-4 -translate-x-1 group-hover:translate-x-0 transition-all" />

                                        </div>

                                    </div>

                                </div>

                            </AspectRatio>

                        </div>

                    </Link>
                ))}
            </div>
        </div >
    )
}

export default SeriesRest