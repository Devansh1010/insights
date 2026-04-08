"use client";

import { useFormContext, useFieldArray } from "react-hook-form";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function InsightsField() {
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
    <div className="space-y-3">
      
      {/* LABEL */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">
          Insights
        </span>
        <span className="text-xs text-muted-foreground">
          {insights.length}/5
        </span>
      </div>

      {/* INPUT LIST */}
      <div className="space-y-2">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex items-center gap-2 group"
          >
            {/* BULLET */}
            <span className="text-muted-foreground">•</span>

            {/* INPUT */}
            <Input
              {...register(`insights.${index}`)}
              placeholder="Write a key insight..."
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground/40"
              maxLength={120}
            />

            {/* REMOVE */}
            <Button
              type="button"
              onClick={() => remove(index)}
              className="opacity-0 group-hover:opacity-100 transition"
            >
              <X className="w-4 h-4 text-muted-foreground hover:text-destructive" />
            </Button>
          </div>
        ))}
      </div>

      {/* ADD BUTTON */}
      <Button
        type="button"
        variant={"outline"}
        onClick={handleAdd}
        disabled={insights.length >= 5}
        className="text-xs text-primary hover:underline disabled:opacity-40"
      >
        + Add insight
      </Button>

      {/* HELP TEXT */}
      <p className="text-xs text-muted-foreground">
        Add up to 5 short, clear takeaways (1 line each)
      </p>
    </div>
  );
}