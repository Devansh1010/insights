"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an analytics service like Sentry or LogRocket
        console.error("Dashboard Error:", error);
    }, [error]);

    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
            {/* SYSTEM DIAGNOSTIC ICON */}
            <div className="mb-6 p-4 rounded-full bg-destructive/10">
                <AlertTriangle className="w-10 h-10 text-destructive" />
            </div>

            <h2 className="text-2xl font-serif font-bold tracking-tight mb-2">
                System Interruption
            </h2>

            <p className="text-muted-foreground max-w-md mb-8 text-sm leading-relaxed">
                We encountered a synchronization error while fetching your dashboard metrics.
                <span className="block mt-1 font-mono text-[10px] opacity-50">Error Digest: {error.digest || "unknown_origin"}</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
                <Button
                    onClick={() => reset()}
                    className="rounded-full px-8 gap-2 shadow-lg shadow-primary/20"
                >
                    <RefreshCcw className="w-4 h-4" />
                    Attempt Reconnection
                </Button>

                <Link href="/">
                    <Button variant="outline" className="rounded-full px-8 gap-2">
                        <Home className="w-4 h-4" />
                        Return Home
                    </Button>
                </Link>
            </div>

            {/* SUBTLE BACKGROUND DECOR */}
            <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.03),transparent)] pointer-events-none" />
        </div>
    );
}