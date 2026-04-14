"use client";

import { useFormContext, useController } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { AlertCircle, Sparkles } from "lucide-react";

export function HookField({articleHook}: { articleHook?: string }) {
    const { control } = useFormContext();

    const {
        field: { value = "", onChange },
        fieldState: { error },
    } = useController({
        control,
        name: "hook",
    });

    const length = value.length;


    return (
        <div className="group space-y-3 max-w-3xl transition-all duration-300">
            {/* 1. Header with Semantic Styling */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-1 h-3 bg-primary/40 rounded-full" />
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                        The Hook
                    </Label>
                </div>

                {/* Dynamic Character Counter */}
                <div className={cn(
                    "text-[10px] font-mono px-2 py-0.5 rounded-full border transition-all duration-300",
                    length > 110
                        ? "bg-destructive/10 text-destructive border-destructive/20"
                        : length > 80
                            ? "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
                            : "bg-muted/50 text-muted-foreground border-transparent"
                )}>
                    {length} <span className="opacity-40">/ 120</span>
                </div>
            </div>

            {/* 2. Interactive Input Area */}
            <div className="relative">
                <Input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Write something that makes people stop scrolling..."
                    maxLength={120}
                    className="text-lg font-semibold border-none shadow-none px-0 focus-visible:ring-0 placeholder:text-muted-foreground/30 bg-transparent"
                />
                {/* Subtle focus underline animation */}
                <div className="absolute bottom-0 left-0 h-px w-0 bg-primary/40 transition-all duration-500 group-focus-within:w-full" />
            </div>

            {/* 3. Smart Feedback System */}
            <div className="flex flex-col gap-1.5 min-h-6">
                {/* Only show "Too Short" warning if they have actually started typing */}
                {length > 0 && length < 15 ? (
                    <div className="flex items-center gap-1.5 text-[11px] text-yellow-600 font-medium animate-in fade-in slide-in-from-left-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>Hook is too short to be impactful</span>
                    </div>
                ) : (
                    <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground/60 italic transition-all">
                        <Sparkles className="w-3 h-3 text-primary/40" />
                        <span>💡 Tip: Lead with a bold claim or a curiosity gap</span>
                    </div>
                )}

                {/* Form Error Handling */}
                {error && (
                    <p className="text-[11px] text-destructive font-semibold animate-in shake-1">
                        {error.message}
                    </p>
                )}
            </div>
        </div>
    );
}