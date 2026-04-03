import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export function EditorHeader({ isPending }: { isPending: boolean }) {
    const { formState: { isDirty, isValid } } = useFormContext();

    return (
        <header className="sticky top-0 z-50 w-full">
            <div className="absolute inset-0 bg-background/80 backdrop-blur-md border-b border-border/40" />
            <div className="relative max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">

                <div className="flex items-center gap-5">
                    <Link href="/user/dashboard">
                        <Button variant="ghost" size="icon" className="rounded-xl">
                            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
                        </Button>
                    </Link>

                    <div className="flex items-center gap-2.5 px-3 py-1 bg-muted/40 rounded-full border border-border/50">
                        <span className={`w-2 h-2 rounded-full ${isDirty ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
                        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                            {isDirty ? "Unsaved Draft" : "Saved"}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        disabled={!isDirty || isPending}
                        className="text-muted-foreground hover:text-foreground font-medium"
                    >
                        <Save className="w-4 h-4 mr-2" />
                        Save Draft
                    </Button>

                    <Button
                        type="submit"
                        size="sm"
                        disabled={isPending || !isValid}
                        className="rounded-full px-6 bg-foreground text-background hover:opacity-90 shadow-lg transition-all active:scale-[0.98]"
                    >
                        {isPending ? "Publishing..." : "Publish"}
                    </Button>
                </div>
            </div>
        </header>
    );
}