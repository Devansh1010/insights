"use client";

import { useFormContext, useWatch } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { FileEdit, Globe, Check } from 'lucide-react';
import { cn } from '@/lib/utils'; // Standard shadcn utility

const SaveTypeButtons = () => {
    // 1. Get setValue from Context
    const { setValue, control } = useFormContext();

    // 2. Watch the specific field
    const isPublished = useWatch({
        control,
        name: 'isPublished',
    });

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
                    Visibility Status
                </label>
                <span className={cn(
                    "text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors",
                    isPublished ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600"
                )}>
                    {isPublished ? "Ready to Launch" : "Personal Draft"}
                </span>
            </div>

            <div className="flex p-1 gap-1 bg-muted/50 rounded-xl border border-muted/80">
                {/* Draft Option */}
                <Button
                    type="button"
                    onClick={() => setValue("isPublished", false, { shouldDirty: true })}
                    variant="ghost"
                    className={cn(
                        "flex-1 gap-2 h-10 rounded-lg transition-all duration-200",
                        !isPublished
                            ? "bg-background shadow-sm text-amber-600 hover:text-amber-600 hover:bg-background"
                            : "text-muted-foreground hover:bg-transparent"
                    )}
                >
                    <FileEdit className={cn("w-3.5 h-3.5", !isPublished && "animate-pulse")} />
                    <span className="text-xs font-bold">Draft</span>
                    {!isPublished && <Check className="w-3 h-3 ml-auto" />}
                </Button>

                {/* Public Option */}
                <Button
                    type="button"
                    onClick={() => setValue("isPublished", true, { shouldDirty: true })}
                    variant="ghost"
                    className={cn(
                        "flex-1 gap-2 h-10 rounded-lg transition-all duration-200",
                        isPublished
                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary"
                            : "text-muted-foreground hover:bg-transparent"
                    )}
                >
                    <Globe className="w-3.5 h-3.5" />
                    <span className="text-xs font-bold">Public</span>
                    {isPublished && <Check className="w-3 h-3 ml-auto" />}
                </Button>
            </div>
        </div>
    );
};

export default SaveTypeButtons;