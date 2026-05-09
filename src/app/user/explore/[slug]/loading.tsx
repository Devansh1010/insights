import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      {/* 1. HERO SKELETON */}
      <div className="relative w-full h-[60vh] md:h-[70vh] bg-muted animate-pulse flex items-end">
        <div className="container max-w-4xl mx-auto px-6 pb-12 relative z-20">
          <Skeleton className="h-6 w-24 mb-6 rounded-full bg-primary/10" />
          <div className="space-y-4 mb-8">
            <Skeleton className="h-12 md:h-16 lg:h-20 w-full" />
            <Skeleton className="h-12 md:h-16 lg:h-20 w-[60%]" />
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <Skeleton className="w-10 h-10 rounded-full" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </div>

      {/* 2. CONTENT LAYOUT SKELETON */}
      <div className="container max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-16 py-16">
        
        {/* MAIN COLUMN */}
        <main className="max-w-3xl mx-auto w-full">
          <div className="flex gap-2 mb-10">
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-3 w-12" />
          </div>

          <div className="space-y-6">
            {/* Excerpt Skeleton */}
            <div className="border-l-4 border-muted pl-6 mb-12">
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-6 w-[90%] mb-2" />
              <Skeleton className="h-6 w-[40%]" />
            </div>

            {/* Content Blocks */}
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[95%]" />
              <Skeleton className="h-4 w-[98%]" />
              <Skeleton className="h-4 w-[40%]" />
            </div>
            
            <Skeleton className="aspect-video w-full rounded-lg mt-12" />
          </div>
        </main>

        {/* ASIDE SKELETON */}
        <aside className="hidden lg:block space-y-12 h-fit">
          <div className="space-y-4">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="aspect-video w-full rounded-lg" />
            <Skeleton className="h-5 w-full" />
          </div>
          <div className="p-6 rounded-2xl border border-border/50">
            <Skeleton className="h-5 w-3/4 mb-4" />
            <Skeleton className="h-8 w-full rounded-full" />
          </div>
        </aside>
      </div>
    </div>
  )
}