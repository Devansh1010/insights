import { Skeleton } from "@/components/ui/skeleton"

export const FormSkeleton = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Series Identity (Image) Placeholder */}
      <div className="space-y-3">
        <Skeleton className="h-3 w-24 rounded-full opacity-60" />
        <Skeleton className="relative aspect-video w-full rounded-3xl" />
      </div>

      {/* Core Metadata Fields */}
      <div className="space-y-6">
        <div className="space-y-3">
          <Skeleton className="h-4 w-32 rounded-lg" />
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>
        <div className="space-y-3">
          <Skeleton className="h-4 w-40 rounded-lg" />
          <Skeleton className="h-32 w-full rounded-2xl" />
        </div>
      </div>

      {/* Configuration Section (The Grey Box) */}
      <div className="p-6 rounded-3xl bg-muted/20 border border-muted/30 space-y-6">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-3 w-32 rounded-full" />
        </div>

        <div className="space-y-4">
          <Skeleton className="h-10 w-full rounded-xl" />
          <div className="pt-4 border-t border-muted/40 flex gap-3">
            <Skeleton className="h-10 flex-1 rounded-xl" />
            <Skeleton className="h-10 flex-1 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};