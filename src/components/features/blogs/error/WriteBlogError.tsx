import { Button } from "@/components/ui/button"
import { AlertCircle, RefreshCcw } from "lucide-react"
import Link from "next/link"

export const WriteBlogError = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
            <div className="w-full max-w-md text-center space-y-6">
                <div className="flex justify-center">
                    <div className="p-4 rounded-full bg-destructive/10">
                        <AlertCircle className="w-10 h-10 text-destructive" />
                    </div>
                </div>

                <div className="space-y-2">
                    <h1 className="text-3xl font-black tracking-tight">Something went wrong</h1>
                    <p className="text-muted-foreground leading-relaxed">
                        We couldn&apos;t load the editor. This might be a temporary connection issue.
                    </p>
                </div>

                <div className="flex items-center justify-center gap-3">
                    <Button
                        variant="outline"
                        className="rounded-full px-6"
                        onClick={() => window.location.reload()}
                    >
                        <RefreshCcw className="w-4 h-4 mr-2" />
                        Retry
                    </Button>
                    <Link href="/user/dashboard">
                        <Button variant="ghost" className="rounded-full px-6">
                            Back to Dashboard
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}