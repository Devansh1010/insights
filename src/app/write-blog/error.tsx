"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
    AlertCircle,
    RefreshCcw,
    FileJson,
    Home,
    ChevronRight
} from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to your analytics (e.g., Sentry)
        console.error("Editor Crash:", error)
    }, [error])

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-6">
            <div className="max-w-xl w-full">
                {/* ICON & HEADER */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 rounded-2xl bg-destructive/10 text-destructive">
                        <AlertCircle className="w-8 h-8" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-serif font-bold tracking-tight">The Editor encountered a glitch</h2>
                        <p className="text-muted-foreground">Don&apos;t worry, your progress might still be in local storage.</p>
                    </div>
                </div>

                {/* ERROR DETAILS BOX */}
                <div className="bg-muted/50 border border-border rounded-2xl p-6 mb-8">
                    <div className="flex items-start gap-3 text-sm font-mono text-muted-foreground">
                        <ChevronRight className="w-4 h-4 mt-1 shrink-0 text-primary" />
                        <p className="leading-relaxed">
                            {error.message || "An unexpected error occurred while rendering the editor components."}
                        </p>
                    </div>
                    {error.digest && (
                        <p className="mt-4 text-[10px] uppercase tracking-widest text-muted-foreground/40">
                            Trace ID: {error.digest}
                        </p>
                    )}
                </div>

                {/* ACTIONS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button
                        onClick={() => reset()}
                        className="rounded-full h-12 font-bold gap-2 hover:scale-[1.02] transition-transform"
                    >
                        <RefreshCcw className="w-4 h-4" /> Try to Resume
                    </Button>

                    <Button
                        variant="outline"
                        onClick={() => window.location.href = "/user/explore"}
                        className="rounded-full h-12 font-bold gap-2"
                    >
                        <Home className="w-4 h-4" /> Back to Dashboard
                    </Button>
                </div>

                <Separator className="my-8 opacity-50" />

                {/* PRO TIP FOR WRITERS */}
                <div className="flex items-center gap-3 text-xs text-muted-foreground bg-primary/5 p-4 rounded-xl border border-primary/10">
                    <FileJson className="w-4 h-4 text-primary" />
                    <span>
                        <strong>Pro Tip:</strong> If the editor keeps crashing, try clearing your browser cache or checking your internet connection.
                    </span>
                </div>
            </div>
        </div>
    )
}