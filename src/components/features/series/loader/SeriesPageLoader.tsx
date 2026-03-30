'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

export const SeriesPageLoader = () => {
  return (
    <div className="min-h-screen bg-background pb-20 mt-20">
      {/* Hero Section Skeleton */}
      <div className="relative w-full bg-slate-950 dark:bg-black overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-24 grid md:grid-cols-2 gap-12 items-center relative z-10">

          {/* Left: Text Content Skeleton */}
          <div className="space-y-6">
            <div className="space-y-4">
              <Skeleton className="h-6 w-32 bg-white/10" /> {/* Badge */}
              <div className="space-y-2">
                <Skeleton className="h-12 w-full md:w-[80%] bg-white/20" /> {/* Title Line 1 */}
                <Skeleton className="h-12 w-[60%] bg-white/20" /> {/* Title Line 2 */}
              </div>
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-full bg-white/10" /> {/* Desc Line 1 */}
              <Skeleton className="h-4 w-[90%] bg-white/10" /> {/* Desc Line 2 */}
            </div>

            <div className="flex gap-2">
              <Skeleton className="h-6 w-16 bg-white/10 rounded-full" />
              <Skeleton className="h-6 w-20 bg-white/10 rounded-full" />
            </div>

            <Separator className="bg-white/10" />

            <div className="flex gap-4">
              <Skeleton className="h-4 w-24 bg-white/10" />
              <Skeleton className="h-4 w-24 bg-white/10" />
            </div>
          </div>

          {/* Right: Featured Image Skeleton */}
          <div className="relative aspect-16/10 rounded-2xl overflow-hidden border border-white/10">
            <Skeleton className="h-full w-full bg-white/5" />
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <main className="max-w-7xl mx-auto px-6 mt-20">
        <div className="flex items-center justify-between mb-8">
          <Skeleton className="h-8 w-64" />
          <div className="h-1 w-20 bg-muted rounded-full" />
        </div>

        {/* Grid Layout Skeleton */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="border-none bg-card/50 shadow-md overflow-hidden">
              {/* Image Area */}
              <Skeleton className="h-52 w-full rounded-none" />

              <CardContent className="p-6 space-y-4">
                {/* Title */}
                <div className="space-y-2">
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-2/3" />
                </div>

                {/* Excerpt */}
                <div className="space-y-2">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-4/5" />
                </div>

                {/* Tags */}
                <div className="flex gap-2 pt-2">
                  <Skeleton className="h-3 w-10" />
                  <Skeleton className="h-3 w-10" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}