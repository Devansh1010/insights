import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"

export default function Loading() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-20 bg-background">
            {/* 1. HEADER SECTION (Same as before) */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                <div className="space-y-4">
                    <Skeleton className="h-6 w-24 rounded-full" />
                    <Skeleton className="h-14 w-64 md:h-20 md:w-112.5" />
                </div>
                <div className="w-full md:w-72 h-10 border-b border-muted flex items-center">
                    <Skeleton className="h-4 w-4 rounded-full ml-3 mr-4" />
                    <Skeleton className="h-4 w-32" />
                </div>
            </div>

            {/* 2. MATCHING FEATURED HERO (Updated to match your specific layout) */}
            <section className="mb-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-center">

                    {/* TEXT SIDE (lg:col-span-5, order-2 lg:order-1) */}
                    <div className="lg:col-span-5 space-y-7 order-2 lg:order-1">
                        {/* Meta Top */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Skeleton className="h-4 w-16" />
                                <div className="w-1 h-1 rounded-full bg-muted" />
                                <Skeleton className="h-4 w-24" />
                            </div>
                            <Skeleton className="h-5 w-12 rounded-full" />
                        </div>

                        {/* Hook & Title */}
                        <div className="space-y-4">
                            <Skeleton className="h-6 w-full" /> {/* Hook */}
                            <div className="space-y-2">
                                <Skeleton className="h-12 w-full" /> {/* Title Line 1 */}
                                <Skeleton className="h-12 w-[85%]" /> {/* Title Line 2 */}
                            </div>
                        </div>

                        {/* Meta Icons (Clock, Eye, Heart) */}
                        <div className="flex items-center gap-4">
                            <Skeleton className="h-3 w-16" />
                            <Skeleton className="h-3 w-12" />
                            <Skeleton className="h-3 w-12" />
                        </div>

                        {/* Excerpt (Serif lines) */}
                        <div className="space-y-3">
                            <Skeleton className="h-4 w-full opacity-60" />
                            <Skeleton className="h-4 w-full opacity-60" />
                            <Skeleton className="h-4 w-[70%] opacity-60" />
                        </div>

                        {/* Tags */}
                        <div className="flex gap-2">
                            <Skeleton className="h-6 w-16 rounded-full" />
                            <Skeleton className="h-6 w-20 rounded-full" />
                            <Skeleton className="h-6 w-14 rounded-full" />
                        </div>

                        {/* Author Footer */}
                        <div className="pt-5 border-t border-border/50 flex items-center justify-between">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-4 w-12" />
                        </div>
                    </div>

                    {/* IMAGE SIDE (lg:col-span-7, order-1 lg:order-2) */}
                    <div className="lg:col-span-7 order-1 lg:order-2">
                        <Skeleton className="aspect-video w-full rounded-[1rem] shadow-2xl" />
                    </div>
                </div>
            </section>

            <Separator className="mb-16 opacity-50" />

            {/* 3. FEED (Rows) */}
            <div className="space-y-20">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                        <div className="md:col-span-4">
                            <Skeleton className="aspect-4/3 w-full rounded-xl" />
                        </div>
                        <div className="md:col-span-8 flex flex-col h-full py-2 space-y-4">
                            <div className="flex items-center gap-3">
                                <Skeleton className="h-3 w-24" />
                                <Skeleton className="h-3 w-16" />
                            </div>
                            <Skeleton className="h-10 w-3/4" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-[85%]" />
                            </div>
                            <div className="mt-auto pt-6 flex justify-between items-center">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-4 w-20" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}