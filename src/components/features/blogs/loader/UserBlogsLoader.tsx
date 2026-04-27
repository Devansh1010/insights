import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function UserBlogsLoader() {
    return (
        <div className="max-w-7xl mx-auto px-6 space-y-8 pt-20">
            {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="border-border/60">
                    <CardContent className="p-4 flex items-center gap-4">

                        {/* IMAGE */}
                        <Skeleton className="w-20 h-[60px] rounded-md" />

                        {/* TEXT */}
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-[60%]" />
                            <Skeleton className="h-3 w-[30%]" />
                        </div>

                        {/* ACTIONS */}
                        <div className="flex gap-2">
                            <Skeleton className="h-8 w-8 rounded-md" />
                            <Skeleton className="h-8 w-8 rounded-md" />
                        </div>

                    </CardContent>
                </Card>
            ))}
        </div>
    )
}