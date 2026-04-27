import { Button } from "@/components/ui/button";

export const BlogListError = ({ reset }: { reset: () => void }) => {
    return (
        <div className="max-w-4xl mx-auto min-h-screen flex flex-col items-center justify-center text-center px-6">
            <div className="mb-6 rounded-full bg-destructive/10 p-4">
                {/* Lucid-react AlertTriangle or similar icon */}
                <svg className="w-8 h-8 text-destructive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            </div>

            <h2 className="text-2xl font-semibold tracking-tight">Sync interrupted</h2>
            <p className="mt-2 mb-8 text-muted-foreground max-w-100">
                We encountered a technical hurdle while fetching the blog. This might be a temporary connection issue.
            </p>

            <div className="flex gap-4">
                <Button
                    onClick={() => reset()}
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                >
                    Try Again
                </Button>
                <Button
                    onClick={() => window.location.href = '/user/explore'}
                    className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground"
                >
                    Return Home
                </Button>
            </div>
        </div>
    );
};