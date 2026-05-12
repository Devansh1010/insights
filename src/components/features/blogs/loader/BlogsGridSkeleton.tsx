import { Skeleton } from "@/components/ui/skeleton"

export const BlogsGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex flex-col space-y-5">
          {/* Article Thumbnail */}
          <Skeleton className="aspect-video w-full bg-foreground/5 rounded-none border border-foreground/5" />
          
          <div className="space-y-3">
            {/* Meta tags (Date/Category) */}
            <div className="flex gap-3">
              <Skeleton className="h-3 w-16 bg-foreground/10 rounded-none" />
              <Skeleton className="h-3 w-20 bg-foreground/10 rounded-none" />
            </div>
            
            {/* Title */}
            <Skeleton className="h-7 w-full bg-foreground/10 rounded-none" />
            
            {/* Excerpt */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full bg-foreground/5 rounded-none" />
              <Skeleton className="h-4 w-2/3 bg-foreground/5 rounded-none" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}