import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

export function UserBlogsError({ onRetry }: { onRetry?: () => void }) {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">

            <div className="p-3 rounded-full bg-destructive/10 text-destructive">
                <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="space-y-1">
                <h3 className="text-lg font-semibold">Something went wrong</h3>
                <p className="text-sm text-muted-foreground">
                    We couldn’t load your stories. Try again.
                </p>
            </div>

            {onRetry && (
                <Button variant="outline" onClick={onRetry}>
                    Retry
                </Button>
            )}

        </div>
    )
}