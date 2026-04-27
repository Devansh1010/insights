import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-10 space-y-10 animate-pulse">

            {/* HEADER SKELETON */}
            <div className="flex justify-between items-center">
                <div className="space-y-2">
                    <Skeleton className="h-10 w-64 rounded-lg" />
                    <Skeleton className="h-4 w-48 rounded-md" />
                </div>
                <Skeleton className="h-10 w-32 rounded-full" />
            </div>

            {/* METRIC CARDS SKELETON */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-muted/20 border border-border/50 space-y-4">
                        <div className="flex justify-between">
                            <Skeleton className="h-3 w-20" />
                            <Skeleton className="h-4 w-4" />
                        </div>
                        <Skeleton className="h-8 w-16" />
                        <Skeleton className="h-2 w-24" />
                    </div>
                ))}
            </div>

            {/* LIST SKELETON */}
            <div className="space-y-4">
                <div className="flex justify-between border-b pb-4">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-4 w-16" />
                </div>
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-border/30">
                        <div className="flex items-center gap-4">
                            <Skeleton className="h-3 w-3 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-64" />
                                <Skeleton className="h-3 w-32" />
                            </div>
                        </div>
                        <Skeleton className="h-8 w-8 rounded-full" />
                    </div>
                ))}
            </div>
        </div>
    );
}