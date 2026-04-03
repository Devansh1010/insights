import { Skeleton } from "@/components/ui/skeleton"

export const WriteBlogLoader = () => {
    return (
        <div className="min-h-screen bg-background">
            {/* Match Header Height */}
            <div className="h-16 border-b border-border/40 flex items-center px-6 max-w-5xl mx-auto justify-between">
                <Skeleton className="h-8 w-32 rounded-xl" />
                <Skeleton className="h-9 w-24 rounded-full" />
            </div>

            <main className="max-w-4xl mx-auto px-6 pt-12 space-y-12">
                {/* Cover Image Skeleton */}
                <Skeleton className="aspect-21/9 w-full rounded-[2rem]" />

                <div className="max-w-3xl mx-auto space-y-8">
                    {/* Series Selection Skeleton */}
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-6 w-40" />
                    </div>

                    {/* Title and Content Skeleton */}
                    <div className="space-y-6">
                        <Skeleton className="h-16 w-3/4" />
                        <div className="space-y-3">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-2/3" />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}