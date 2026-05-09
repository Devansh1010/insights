"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle, RefreshCcw, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Article Load Error:", error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6 text-center">
      <div className="p-4 rounded-full bg-primary/5 text-primary mb-8 border border-primary/10">
        <AlertCircle className="w-10 h-10" />
      </div>

      <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 tracking-tight">
        Technical <span className="text-muted-foreground italic">Interruption.</span>
      </h1>
      
      <p className="text-muted-foreground max-w-md mb-10 leading-relaxed">
        We were unable to render this article. This could be due to a broken link or a temporary server synchronization issue.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          onClick={() => reset()} 
          className="rounded-full px-8 h-12 font-bold gap-2 hover:scale-[1.02] transition-transform"
        >
          <RefreshCcw className="w-4 h-4" /> Try Again
        </Button>
        
        <Link href="/user/explore">
          <Button variant="outline" className="rounded-full px-8 h-12 font-bold gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Explore
          </Button>
        </Link>
      </div>

      {error.digest && (
        <div className="mt-20 opacity-20">
          <p className="text-[10px] font-mono uppercase tracking-[0.3em]">
            System Trace: {error.digest}
          </p>
        </div>
      )}
    </div>
  )
}