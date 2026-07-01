import { Skeleton } from "@/components/ui/skeleton";

const Header_loader = () => {
    return (
        <header className="relative w-full h-[60vh] md:h-[70vh] flex items-end overflow-hidden">
            {/* Background Skeleton */}
            <div className="absolute inset-0">
                <Skeleton className="h-full w-full rounded-none" />
            </div>

            {/* Same Gradient */}
            <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent z-10" />

            {/* Hero Content */}
            <div className="container max-w-7xl mx-auto px-6 pb-12 relative z-20">

                {/* Tags */}
                <div className="flex gap-2 mb-4">
                    <Skeleton className="h-7 w-20 rounded-full" />
                    <Skeleton className="h-7 w-24 rounded-full" />
                    <Skeleton className="h-7 w-16 rounded-full" />
                </div>

                {/* Title */}
                <div className="space-y-3 mb-8">
                    <Skeleton className="h-12 md:h-16 lg:h-20 w-[90%]" />
                    <Skeleton className="h-12 md:h-16 lg:h-20 w-[65%]" />
                </div>

                {/* Author + Date + Read Time */}
                <div className="flex flex-wrap items-center gap-6">

                    {/* Author */}
                    <div className="flex items-center gap-3">
                        <Skeleton className="w-10 h-10 rounded-full" />
                        <Skeleton className="h-5 w-28" />
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-2">
                        <Skeleton className="w-4 h-4 rounded" />
                        <Skeleton className="h-5 w-28" />
                    </div>

                    {/* Read Time */}
                    <div className="flex items-center gap-2">
                        <Skeleton className="w-4 h-4 rounded" />
                        <Skeleton className="h-5 w-20" />
                    </div>

                </div>
            </div>
        </header>
    )
}

export default Header_loader