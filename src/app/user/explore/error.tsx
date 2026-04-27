"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import {  
  RefreshCcw, 
  ArrowLeft,
  SearchX
} from "lucide-react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // In a Google-level environment, you'd log this to Sentry/GCP Logging
    console.error("Explore Feed Error:", error)
  }, [error])

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-background px-6 text-center">
      
      {/* 1. MINIMALIST ERROR ICON */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full" />
        <div className="relative p-6 rounded-full bg-background border border-border shadow-sm">
          <SearchX className="w-12 h-12 text-muted-foreground/60" />
        </div>
      </div>

      {/* 2. TYPOGRAPHY (Matching your Serif style) */}
      <div className="max-w-md space-y-4 mb-12">
        <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight">
          Lost in <span className="text-muted-foreground/40 italic">Thought.</span>
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          We couldn&apos;t retrieve the latest articles. This might be a temporary connection issue or a brief moment of maintenance.
        </p>
      </div>

      {/* 3. RECOVERY ACTIONS */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Button 
          onClick={() => reset()} 
          className="rounded-full h-12 px-8 font-bold gap-2 bg-primary hover:scale-[1.02] transition-all"
        >
          <RefreshCcw className="w-4 h-4" /> Refresh Feed
        </Button>
        
        <Link href="/">
          <Button variant="ghost" className="rounded-full h-12 px-8 font-semibold gap-2">
            <ArrowLeft className="w-4 h-4" /> Return Home
          </Button>
        </Link>
      </div>

      {/* 4. TECHNICAL FOOTNOTE (For Debugging) */}
      {error.digest && (
        <div className="mt-16 pt-8 border-t w-full max-w-xs opacity-30 italic">
          <p className="text-[10px] uppercase tracking-[0.2em]">Reference ID: {error.digest}</p>
        </div>
      )}
    </div>
  )
}