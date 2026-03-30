'use client'

import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCcw } from "lucide-react"

interface SeriesErrorProps {
    message?: string
    reset: () => void
}

export const SeriesPageError = ({
    message = "Something went wrong while loading this series.",
    reset
}: SeriesErrorProps) => {
    return (
        <div className="w-full flex flex-col items-center justify-center py-20 px-4 text-center">

            {/* Icon */}
            <div className="bg-red-100 text-red-600 p-4 rounded-full mb-6">
                <AlertTriangle className="w-8 h-8" />
            </div>

            {/* Title */}
            <h2 className="text-2xl font-semibold mb-2">
                Failed to load series
            </h2>

            {/* Message */}
            <p className="text-muted-foreground max-w-md mb-6">
                {message}
            </p>

            {/* Actions */}
            <div className="flex gap-3">
                {reset && (
                    <Button onClick={() => reset()} className="flex items-center gap-2">
                        <RefreshCcw className="w-4 h-4" />
                        Retry
                    </Button>
                )}

                <Button
                    variant="outline"
                    onClick={() => window.location.href = "/"}
                >
                    Go Home
                </Button>
            </div>

        </div>
    )
}