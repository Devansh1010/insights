import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Calendar, Eye, Layers, MoreVertical } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Series } from "@/types/frontend/series";

export const SeriesCard = ({ series }: { series: Series }) => {

    return (
        <div className="group relative">
            {/* Visual "Stack" Effect - Decorative layers behind the card */}
            <div className="absolute inset-0 bg-muted rounded-[2rem] translate-x-2 translate-y-2 -z-10 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-300" />

            <div className="relative bg-background border rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="aspect-video relative overflow-hidden">
                    <Image
                        src={series.coverImage || "/placeholder-series.jpg"}
                        alt={series.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
                        <Badge className="bg-background/80 backdrop-blur-md text-foreground border-none px-3">
                            <Layers className="w-3 h-3 mr-1" /> Series
                        </Badge>
                    </div>
                </div>

                <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex gap-2">
                            {series.tags?.slice(0, 2).map((tag: string) => (
                                <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-primary">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                        <Button className="text-muted-foreground hover:text-foreground">
                            <MoreVertical className="w-4 h-4" />
                        </Button>
                    </div>

                    <Link href={`/user/series/${series._id}`}>
                        <h3 className="text-xl font-bold leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-1">
                            {series.title}
                        </h3>
                    </Link>

                    <p className="text-sm text-muted-foreground line-clamp-2 mb-6 min-h-10">
                        {series.desc}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                        {/* Left Side: Author */}
                        <div className="flex items-center gap-2">
                            <div className="h-6 w-6 rounded-full relative overflow-hidden border">
                                <Image src={series.author?.avatar} fill alt="author" className="object-cover" />
                            </div>
                            <span className="text-xs font-medium">{series.author?.username}</span>
                        </div>

                        {/* Right Side: Metadata (Views & Date) */}
                        <div className="flex items-center gap-3">
                            {/* Views Count */}
                            <div className="flex items-center text-muted-foreground text-[11px] gap-1 bg-muted/30 px-2 py-0.5 rounded-full">
                                <Eye className="w-3 h-3" />
                                <span>{series.views?.toLocaleString() || 0}</span>
                            </div>

                            {/* Date */}
                            <div className="flex items-center text-muted-foreground text-[11px] gap-1">
                                <Calendar className="w-3 h-3" />
                                <span>{format(new Date(series.createdAt), "MMM dd, yyyy")}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};