import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Series } from "./SeriesList"
import Image from "next/image"
import { Button } from "@/components/ui/button"


const SeriesRest = ({ series }: { series: Series[] }) => {
    
    const FALLBACK = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop';

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {series.map((item: Series) => (
                    <Card key={item._id} className="relative group flex flex-col overflow-hidden rounded-[2rem] shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">

                        <div className="h-48 overflow-hidden">
                            <Image
                                src={item.coverImage ? item.coverImage : FALLBACK}
                                alt={item.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                            />

                        </div>

                        <CardContent className="relative z-10  md:px-12 w-full flex flex-col justify-end">


                            {/* Bottom Row Container */}
                            <div className="flex items-end justify-between gap-4">

                                <div className="flex-1 min-w-0">
                                    <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-1 leading-snug">
                                        {item.title}
                                    </CardTitle>
                                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mt-1">
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
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default SeriesRest