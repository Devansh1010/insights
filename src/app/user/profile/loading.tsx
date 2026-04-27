import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="min-h-screen pt-24 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] bg-size-[32px_32px]">
            <div className="max-w-4xl mx-auto px-6">

                {/* CARD SKELETON */}
                <div className="bg-background/40 backdrop-blur-md rounded-[2rem] p-8 md:p-12 border border-border/20 shadow-xl">
                    <div className="flex flex-col md:flex-row gap-10 items-center">

                        {/* AVATAR SKELETON */}
                        <Skeleton className="w-32 h-32 md:w-40 md:h-40 rounded-[2.5rem]" />

                        {/* IDENTITY SKELETON */}
                        <div className="flex-1 space-y-4">
                            <div className="space-y-2">
                                <Skeleton className="h-10 w-48 rounded-lg" />
                                <Skeleton className="h-4 w-32 rounded-md" />
                            </div>
                            <div className="flex gap-3">
                                <Skeleton className="h-10 w-32 rounded-full" />
                                <Skeleton className="h-10 w-10 rounded-full" />
                            </div>
                        </div>
                    </div>

                    <div className="h-px bg-border/20 my-10" />

                    {/* GRID SKELETON */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="space-y-3">
                                <Skeleton className="h-3 w-24 rounded-full opacity-50" />
                                <Skeleton className="h-6 w-full rounded-lg" />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}