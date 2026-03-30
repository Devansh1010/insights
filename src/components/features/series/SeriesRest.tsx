import { CardTitle } from "@/components/ui/card"
import { Series } from "./SeriesList"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AspectRatio } from "@/components/ui/aspect-ratio"


const SeriesRest = ({ series }: { series: Series[] }) => {

    const FALLBACK = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop';

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {series.map((item: Series) => (
                    <Link href={`series/${item._id}`} key={item._id} >

                        <div className="group flex flex-col overflow-hidden rounded-[2rem] shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                            <AspectRatio
                                ratio={16 / 9}
                                className="overflow-hidden rounded-[2rem]">
                                <Image
                                    src={item.coverImage ? item.coverImage : FALLBACK}
                                    alt={item.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                />

                                <div className="flex items-end justify-between gap-4 relative h-full p-5 z-10 bg-background/60 backdrop-blur-lg">

                                    <div className="flex-1 min-w-0">
                                        <CardTitle className="text-xl font-serif font-bold leading-[1.1] text-slate-900 group-hover:text-primary transition-colors line-clamp-1">
                                            {item.title}
                                        </CardTitle>
                                        <p className="font-serif font-bold text-muted-foreground leading-relaxed text-md">
                                            {item.desc}
                                        </p>
                                    </div>

                                    {/* Right Side: Username and Button */}
                                    <div className="flex items-center gap-3 shrink-0">
                                        <span className="text-xs text-slate-400 font-medium">@{item.author.username}</span>
                                        <Button
                                            variant={"default"}
                                            className="">
                                            View
                                        </Button>
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