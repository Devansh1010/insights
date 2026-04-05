import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "@/components/theme";

export function EditorHeader({ isPending }: { isPending: boolean }) {
    const { formState: { isDirty, isValid } } = useFormContext();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/70 backdrop-blur-xl supports-backdrop-filter:bg-background/60">
            <div className="max-w-5xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-4">

                {/* Left Section: Navigation & Status */}
                <div className="flex items-center gap-4">
                    <Link href="/user/dashboard">
                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-muted/80 transition-colors">
                            <ArrowLeft className="w-4 h-4 text-muted-foreground" />
                        </Button>
                    </Link>

                    <div className="h-4 w-px bg-border/60 hidden sm:block" /> {/* Vertical Divider */}

                    <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-muted/30 border border-border/20">
                        <div className="relative flex h-2 w-2">
                            {isDirty && (
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                            )}
                            <span className={`relative inline-flex rounded-full h-2 w-2 ${isDirty ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">
                            {isDirty ? "Unsaved" : "Saved"}
                        </span>
                    </div>
                </div>

                {/* Right Section: Actions & Theme */}
                <div className="flex items-center gap-2 md:gap-4">
                    <div className="hidden md:flex items-center">
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            disabled={!isDirty || isPending}
                            className="text-muted-foreground hover:text-foreground h-9 font-medium px-4"
                        >
                            <Save className="w-4 h-4 mr-2 opacity-70" />
                            Save Draft
                        </Button>
                    </div>

                    <Button
                        type="submit"
                        size="sm"
                        disabled={isPending || !isValid}
                        className="rounded-full px-5 h-9 bg-primary text-primary-foreground hover:opacity-90 shadow-sm transition-all active:scale-95 disabled:opacity-50"
                    >
                        {isPending ? "Publishing..." : "Publish"}
                    </Button>

                    <div className="ml-1 border-l pl-3 border-border/50">
                        <ModeToggle />
                    </div>
                </div>
            </div>
        </header>
    );
}