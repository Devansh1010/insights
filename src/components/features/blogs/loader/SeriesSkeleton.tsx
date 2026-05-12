import { Skeleton } from "@/components/ui/skeleton";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

export const SeriesSkeleton = () => {
  return (
    <section className="py-12 px-4 md:px-16 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <Carousel className="w-full">
          <CarouselContent>
            {/* We show 1 slide to represent the initial state */}
            <CarouselItem className="basis-full">
              <div className="p-2">
                <div className="relative h-112.5 md:h-130 w-full overflow-hidden rounded-[2.5rem] bg-foreground/5 border border-foreground/5">
                  
                  {/* Mimic the cinematic gradient area */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 space-y-6">
                    
                    {/* Badge Skeleton */}
                    <Skeleton className="h-6 w-24 bg-foreground/10 rounded-full" />

                    <div className="space-y-4">
                      {/* Title Skeleton lines */}
                      <Skeleton className="h-10 md:h-14 w-3/4 bg-foreground/10 rounded-none" />
                      <Skeleton className="h-10 md:h-14 w-1/2 bg-foreground/10 rounded-none" />
                      
                      {/* Description Skeleton lines */}
                      <div className="space-y-2 pt-2">
                        <Skeleton className="h-4 w-full md:w-xl bg-foreground/5 rounded-none" />
                        <Skeleton className="h-4 w-2/3 bg-foreground/5 rounded-none" />
                      </div>
                    </div>

                    {/* Author Info Skeleton */}
                    <div className="flex items-center gap-3 pt-4">
                      <Skeleton className="h-9 w-9 rounded-full bg-foreground/10" />
                      <Skeleton className="h-4 w-32 bg-foreground/10 rounded-none" />
                    </div>
                  </div>

                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};