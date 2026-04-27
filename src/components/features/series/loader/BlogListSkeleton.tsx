import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Separator } from "@/components/ui/separator"

export const BlogListSkeleton = () => {
    return (
        <div className="flex flex-col gap-32 w-full">
            {[1, 2, 3].map((index) => (
                <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start animate-pulse"
                >
                    {/* Index Number Skeleton */}
                    <div className="hidden md:block md:col-span-1">
                        <div className="h-16 w-12 bg-muted/20 rounded-md" />
                    </div>

                    {/* Image Section Skeleton */}
                    <div className="md:col-span-5">
                        <div className="rounded-xl overflow-hidden shadow-sm">
                            <AspectRatio ratio={16 / 9}>
                                <div className="w-full h-full bg-muted/20" />
                            </AspectRatio>
                        </div>
                    </div>

                    {/* Text Content Skeleton */}
                    <div className="md:col-span-6 flex flex-col justify-center space-y-6">
                        <div className="space-y-4">
                            {/* Title Lines */}
                            <div className="h-10 w-3/4 bg-muted/30 rounded-sm" />
                            <div className="h-10 w-1/2 bg-muted/30 rounded-sm" />

                            {/* Excerpt Lines */}
                            <div className="space-y-2 pt-2">
                                <div className="h-4 w-full bg-muted/10 rounded-sm" />
                                <div className="h-4 w-full bg-muted/10 rounded-sm" />
                                <div className="h-4 w-2/3 bg-muted/10 rounded-sm" />
                            </div>
                        </div>

                        {/* Bottom Row Skeleton */}
                        <div className="flex items-center gap-4 pt-4">
                            <div className="flex gap-2">
                                <div className="h-5 w-12 bg-muted/20 rounded-none" />
                                <div className="h-5 w-12 bg-muted/20 rounded-none" />
                            </div>
                            <Separator className="flex-1 opacity-20" />
                            <div className="h-4 w-24 bg-muted/20 rounded-sm" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}