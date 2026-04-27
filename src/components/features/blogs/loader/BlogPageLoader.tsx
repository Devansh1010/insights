import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"

export default function BlogPageLoader() {
  return (
    <div className="w-full">
      {/* HEADER SKELETON */}
      <header className="relative w-full h-[60vh] md:h-[70vh] flex items-end bg-muted/30">
        <div className="container max-w-4xl mx-auto px-6 pb-12 relative z-20 w-full">
          {/* Tag Badges */}
          <div className="flex gap-2 mb-6">
            <Skeleton className="h-8 w-24 rounded-full bg-primary/10" />
            <Skeleton className="h-8 w-20 rounded-full bg-primary/10" />
          </div>

          {/* Title Lines */}
          <div className="space-y-4 mb-8">
            <Skeleton className="h-12 md:h-16 w-[90%] lg:w-[80%]" />
            <Skeleton className="h-12 md:h-16 w-[60%] lg:w-[50%]" />
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-3">
              <Skeleton className="w-10 h-10 rounded-full" />
              <Skeleton className="h-4 w-28" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        </div>
      </header>

      {/* CONTENT GRID SKELETON */}
      <div className="container max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-16 py-16">
        
        <main className="max-w-3xl mx-auto w-full">
          {/* Upper Tags */}
          <div className="flex gap-4 mb-10">
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-3 w-16" />
          </div>

          {/* Excerpt Block */}
          <div className="border-l-4 border-muted pl-6 mb-12">
            <Skeleton className="h-6 w-full mb-3" />
            <Skeleton className="h-6 w-[95%] mb-3" />
            <Skeleton className="h-6 w-[40%]" />
          </div>

          {/* Main Body Paragraphs */}
          <div className="space-y-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[90%]" />
                <Skeleton className="h-4 w-[40%]" />
              </div>
            ))}
          </div>

          <Separator className="my-20" />

          {/* Footer Buttons */}
          <div className="flex gap-4">
            <Skeleton className="h-9 w-24 rounded-full" />
            <Skeleton className="h-9 w-24 rounded-full" />
          </div>
        </main>

        {/* SIDEBAR SKELETON */}
        <aside className="hidden lg:block space-y-12 sticky top-24 h-fit">
          <div className="space-y-4">
            <Skeleton className="h-3 w-32" />
            <div className="space-y-3">
              <Skeleton className="aspect-video rounded-lg w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-2/3" />
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-border/50 bg-muted/10">
            <Skeleton className="h-5 w-3/4 mb-3" />
            <Skeleton className="h-3 w-full mb-2" />
            <Skeleton className="h-3 w-2/3 mb-6" />
            <Skeleton className="h-10 w-full rounded-full" />
          </div>
        </aside>
      </div>
    </div>
  )
}