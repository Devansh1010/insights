"use client";

import { useEffect } from "react";
import { RotateCcw, ShieldAlert } from "lucide-react";
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
        console.error("Profile Fetch Error:", error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-6">
            <div className="max-w-md w-full text-center space-y-8">

                {/* ERROR ICONOGRAPHY */}
                <div className="relative inline-flex">
                    <div className="p-5 rounded-[2rem] bg-destructive/10 text-destructive border border-destructive/20 shadow-2xl shadow-destructive/10">
                        <ShieldAlert className="w-12 h-12" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-destructive rounded-full border-4 border-background" />
                </div>

                <div className="space-y-3">
                    <h2 className="text-3xl font-serif font-bold tracking-tight">
                        Identity Sync Failed
                    </h2>
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-70 mx-auto">
                        We couldn&apos;t verify your developer credentials. Your session may have expired or the connection was severed.
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    <Button
                        onClick={() => reset()}
                        className="rounded-full h-12 font-bold uppercase tracking-widest text-[11px] shadow-lg shadow-primary/20"
                    >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Re-Verify Identity
                    </Button>

                    <Link href="/">
                        <Button variant="ghost" className="rounded-full h-12 text-muted-foreground hover:text-foreground font-bold uppercase tracking-widest text-[11px]">
                            Return to Journal
                        </Button>
                    </Link>
                </div>

                {/* LOG DATA (For Debugging) */}
                {error.digest && (
                    <p className="text-[10px] font-mono opacity-30 mt-8">
                        Trace ID: {error.digest}
                    </p>
                )}
            </div>
        </div>
    );
}