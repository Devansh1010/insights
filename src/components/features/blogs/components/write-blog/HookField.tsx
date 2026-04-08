"use client";

import { useFormContext, useController } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function HookField() {
    const { control } = useFormContext();

    const {
        field: { value = "", onChange },
        fieldState: { error },
    } = useController({
        control,
        name: "hook",
    });

    const length = value.length;

    const isWeak =
        value.toLowerCase().includes("this article") ||
        value.toLowerCase().includes("in this blog");

    return (
        <div className="space-y-3 max-w-3xl">

            {/* HEADER */}
            <div className="flex items-center justify-between">
                <Label className="text-sm text-muted-foreground">
                    Hook
                </Label>
                <span
                    className={cn(
                        "text-xs",
                        length > 120
                            ? "text-destructive"
                            : length > 80
                                ? "text-yellow-500"
                                : "text-muted-foreground"
                    )}
                >
                    {length}/120
                </span>
            </div>

            {/* INPUT */}
            <Input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Write something that makes people stop scrolling..."
                maxLength={120}
                className="text-base font-medium border-none shadow-none px-0 focus-visible:ring-0 placeholder:text-muted-foreground/40"
            />

            {/* HINTS */}
            <div className="space-y-1 text-xs text-muted-foreground">

                <p>💡 Make it curiosity-driven or bold</p>

                {isWeak && (
                    <p className="text-yellow-500">
                        Try to avoid generic phrases like “this article explains...”
                    </p>
                )}

                {length < 10 && (
                    <p className="text-yellow-500">
                        Hook is too short to be impactful
                    </p>
                )}

            </div>

            {/* ERROR */}
            {error && (
                <p className="text-xs text-destructive">
                    {error.message}
                </p>
            )}
        </div>
    );
}