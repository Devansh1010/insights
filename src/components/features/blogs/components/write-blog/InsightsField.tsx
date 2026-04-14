"use client";

import { useFormContext, useFieldArray } from "react-hook-form";
import { Lightbulb, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function InsightsField({articleInsights}: { articleInsights?: string[] }) {
  const { control, register, watch } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "insights",
  });

  const insights = watch("insights") || [];

  const handleAdd = () => {
    if (insights.length >= 5) return;
    append("");
  };

  return (
    <div className="group space-y-4 transition-all duration-300">
      {/* 1. Header with Metadata Branding */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-1 h-3 bg-primary/40 rounded-full" />
          <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
            Key Insights
          </Label>
        </div>

        <div className="flex items-center gap-2">
          <span className={cn(
            "text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border transition-all",
            fields.length >= 5
              ? "bg-primary/10 text-primary border-primary/20"
              : "bg-muted/50 text-muted-foreground border-transparent"
          )}>
            {fields.length} <span className="opacity-40">/ 5</span>
          </span>
        </div>
      </div>

      {/* 2. Dynamic Input List */}
      <div className="space-y-3">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex items-center gap-3 group/item animate-in fade-in slide-in-from-left-2 duration-300"
          >
            {/* Animated Bullet Point */}
            <div className="flex flex-col items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-primary/30 group-hover/item:bg-primary transition-colors" />
              <div className="w-px h-4 bg-muted-foreground/10" />
            </div>

            {/* Clean Input Field */}
            <div className="flex-1 relative">
              <Input
                {...register(`insights.${index}`)}
                placeholder="Key takeaway from this article..."
                className="h-8 bg-transparent border-none shadow-none px-0 focus-visible:ring-0 text-sm font-medium placeholder:text-muted-foreground/30 text-foreground/80"
                maxLength={120}
              />
              <div className="absolute bottom-0 left-0 h-px w-0 bg-primary/20 transition-all duration-500 group-focus-within/item:w-full" />
            </div>

            {/* Minimalist Remove Action */}
            <Button
              type="button"
              onClick={() => remove(index)}
              variant="ghost"
              className="h-7 w-7 p-0 opacity-0 group-hover/item:opacity-100 transition-all hover:bg-destructive/10 hover:text-destructive rounded-full"
            >
              <X className="w-3.5 h-3.5" />
            </Button>
          </div>
        ))}
      </div>

      {/* 3. Integrated Action & Hint Row */}
      <div className="flex flex-col gap-3 pt-2">
        {fields.length < 5 && (
          <Button
            type="button"
            variant="ghost"
            onClick={handleAdd}
            className="w-fit h-8 px-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-primary hover:bg-primary/5 rounded-lg border border-dashed border-primary/20 hover:border-primary/40 transition-all"
          >
            <Plus className="w-3 h-3" />
            Add Insight
          </Button>
        )}

        <div className="flex items-center gap-2 px-1">
          <div className="p-1 rounded bg-primary/5">
            <Lightbulb className="w-3 h-3 text-primary/60" />
          </div>
          <p className="text-[10px] text-muted-foreground/60 font-medium leading-tight">
            Add clear, single-line takeaways to help readers scan your technical depth.
          </p>
        </div>
      </div>
    </div>
  );
}