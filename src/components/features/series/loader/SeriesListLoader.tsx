import { Skeleton } from "@/components/ui/skeleton"

export const SeriesSkeleton = () => {
    return (
        <div className="max-w-7xl mx-auto space-y-16 py-12 px-6">
            {/* Header Skeleton */}
            <div className="max-w-3xl space-y-4">
                {/* Animated Badge */}
                <Skeleton className="h-6 w-32 rounded-full" />

                {/* Title Lines */}
                <div className="space-y-3">
                    <Skeleton className="h-12 w-3/4 rounded-xl" />
                    <Skeleton className="h-12 w-1/2 rounded-xl" />
                </div>

                {/* Subtitle */}
                <Skeleton className="h-5 w-2/3 rounded-lg opacity-60" />
            </div>

            {/* Grid Skeleton */}
            <div className="grid gap-10 md:grid-cols-2 lg:gap-12">
                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className="flex flex-col rounded-[2rem] border bg-card overflow-hidden shadow-sm"
                    >
                        {/* Nested Image Container - Using m-2 to match your refined design */}
                        <div className="m-2 relative aspect-video overflow-hidden rounded-[1.5rem]">
                            <Skeleton className="h-full w-full" />
                            {/* Internal Tag Placeholder */}
                            <div className="absolute top-4 left-4">
                                <Skeleton className="h-5 w-16 rounded-lg opacity-80" />
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="flex flex-1 flex-col p-8 pt-4 space-y-8">
                            <div className="space-y-4">
                                {/* Meta Row */}
                                <div className="flex items-center justify-between">
                                    <Skeleton className="h-3 w-24 bg-primary/10" />
                                    <Skeleton className="h-3 w-16 opacity-40" />
                                </div>

                                {/* Title Lines */}
                                <div className="space-y-3">
                                    <Skeleton className="h-7 w-full" />
                                    <Skeleton className="h-7 w-[85%]" />
                                </div>

                                {/* Description Lines */}
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-full opacity-40" />
                                    <Skeleton className="h-4 w-[92%] opacity-40" />
                                    <Skeleton className="h-4 w-[80%] opacity-40" />
                                </div>
                            </div>

                            {/* Footer Placeholder with Dashed Border */}
                            <div className="pt-6 mt-auto flex items-center justify-between border-t border-dashed border-border/60">
                                <Skeleton className="h-7 w-7 rounded-full" />
                                <div className="flex items-center gap-3">
                                    <Skeleton className="h-3 w-20" />
                                    <Skeleton className="h-8 w-8 rounded-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};