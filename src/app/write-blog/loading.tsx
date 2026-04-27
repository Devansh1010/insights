import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <div className="min-h-screen flex flex-col items-center bg-background">

            {/* 1. TOP NAVIGATION SKELETON */}
            <nav className="fixed top-0 w-full z-50 border-b bg-background/60 backdrop-blur-md px-6 py-3 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <Skeleton className="w-10 h-10 rounded-full" /> {/* Back Button */}
                    <Skeleton className="h-3 w-24" /> {/* Draft Status */}
                </div>
            </nav>

            {/* 2. PROGRESS BAR SKELETON (Static) */}
            <div className="fixed top-14.25 left-0 w-full h-0.5 bg-muted z-50">
                <div className="h-full bg-primary/20 w-[10%]" />
            </div>

            <main className="w-full max-w-3xl px-6 pt-32 pb-40">
                {/* 3. TITLE SECTION SKELETON */}
                <div className="space-y-4 mb-12">
                    <Skeleton className="h-16 w-full md:w-[80%]" /> {/* Title Line 1 */}
                    <Skeleton className="h-16 w-[40%]" />          {/* Title Line 2 */}
                </div>

                {/* 4. EDITOR BLOCK SKELETONS */}
                <div className="space-y-8">
                    {/* Mimicking Paragraph Blocks */}
                    <div className="space-y-3">
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-[96%]" />
                        <Skeleton className="h-5 w-[92%]" />
                    </div>

                    {/* Mimicking a Heading Block */}
                    <Skeleton className="h-10 w-[30%] mt-12 mb-4" />

                    {/* Mimicking another Paragraph */}
                    <div className="space-y-3">
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-[98%]" />
                    </div>

                    {/* Mimicking an Image/Media Block */}
                    <Skeleton className="h-75 w-full rounded-xl mt-8" />
                </div>
            </main>

            {/* 5. FLOATING DOCK SKELETON */}
            <footer className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
                <div className="flex items-center gap-2 bg-muted/80 px-4 py-2 rounded-full shadow-xl border border-border/50 backdrop-blur-sm">
                    <Skeleton className="h-8 w-24 rounded-full" /> {/* Auto-save info */}
                    <div className="w-px h-4 bg-border" />
                    <Skeleton className="h-8 w-32 rounded-full" /> {/* Publish Button */}
                </div>
            </footer>
        </div>
    )
}