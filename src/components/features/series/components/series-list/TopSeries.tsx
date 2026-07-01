
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Series } from '@/types/frontend/series';

const TopSeries = ({ isInitialPage, featuredSeries }: { isInitialPage: boolean; featuredSeries: Series[] }) => {
    if (!isInitialPage || !featuredSeries?.length) return null;

    return (
        <section className="py-12 px-4 md:px-16 overflow-hidden">

            <div className="relative max-w-6xl mx-auto group">
                <Carousel
                    opts={{
                        align: "center",
                        loop: true,
                    }}
                    className="w-full"
                >
                    <CarouselContent>
                        {featuredSeries.map((series) => (
                            <CarouselItem key={series._id} className="basis-full">
                                <div className="p-2 transition-all duration-500">
                                    <Link href={`/user/series/${series.slug}`}>
                                        <Card className="relative h-112.5 md:h-130 overflow-hidden border-none bg-background rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all duration-500">
                                            <CardContent className="p-0 h-full">
                                                {/* Background Image */}
                                                {series.coverImage &&
                                                    <Image
                                                        src={series.coverImage || "/fallback.jpg"}
                                                        alt={series.title}
                                                        fill
                                                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                                    />}

                                                {/* Cinematic Gradient */}
                                                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />

                                                {/* Content */}
                                                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 text-white">
                                                    <div className="max-w-2xl space-y-4">
                                                        <Badge className="bg-white/20 backdrop-blur-md text-white border-none px-3 py-1 text-[10px] uppercase tracking-tighter">
                                                            Featured
                                                        </Badge>

                                                        <h3 className="text-3xl md:text-5xl font-bold font-serif leading-[1.1]">
                                                            {series.title}
                                                        </h3>

                                                        <p className="text-sm md:text-base text-white/70 line-clamp-2 font-light max-w-xl">
                                                            {series.desc}
                                                        </p>

                                                        {/* Author Info */}
                                                        <div className="flex items-center gap-3 pt-4">
                                                            <div className="h-9 w-9 rounded-full border border-white/30 overflow-hidden relative">
                                                                <Image src={series.author.avatar} fill alt="author" className="object-cover" />
                                                            </div>
                                                            <span className="text-sm font-medium text-white/90">{series.author.username}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    {/* Side Buttons - Positioned Absolutely relative to the 'group' container */}
                    <CarouselPrevious className="hidden md:flex -left-6 lg:-left-16 h-12 w-12 bg-background/80 backdrop-blur-md border-border hover:bg-primary hover:text-primary-foreground transition-all duration-300 opacity-0 group-hover:opacity-100" />
                    <CarouselNext className="hidden md:flex -right-6 lg:-right-16 h-12 w-12 bg-background/80 backdrop-blur-md border-border hover:bg-primary hover:text-primary-foreground transition-all duration-300 opacity-0 group-hover:opacity-100" />
                </Carousel>
            </div>
        </section>
    );
};

export default TopSeries