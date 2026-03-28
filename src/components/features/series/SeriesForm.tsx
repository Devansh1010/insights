"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Loader2, X } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { seriesFormSchema } from "@/lib/schemas/series/series.schema";
import { createSeries } from "@/services/series";

const AVAILABLE_TAGS = [
  { label: "Frontend", value: "frontend" },
  { label: "Backend", value: "backend" },
  { label: "DevOps", value: "devops" },
  { label: "System Design", value: "system-design" },
  { label: "Architecture", value: "architecture" },
];

const SeriesForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [open, setOpen] = React.useState(false);

  const form = useForm<z.infer<typeof seriesFormSchema>>({
    resolver: zodResolver(seriesFormSchema),
    defaultValues: {
      title: "",
      desc: "",
      tags: [],
      isPublished: false,
    },
  });

  const mutation = useMutation({
    mutationFn: createSeries,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["series"] });
      toast.success("Series created");
      router.push("/user/series");
    },
    onError: () => toast.error("Failed to create series"),
  });

  const onSubmit = (data: z.infer<typeof seriesFormSchema>) => {
    mutation.mutate(data);
  };

  return (
    <div className="max-w-xl min-h-screen mx-auto py-20 px-6">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
        {/* Simple Header */}
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">New Series</h1>
          <p className="text-sm text-muted-foreground">Fill in the details to start your technical series.</p>
        </header>

        <div className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Title</label>
            <Input 
              {...form.register("title")} 
              placeholder="e.g., Mastering Microservices" 
              className="border-slate-200 focus:border-primary transition-all"
            />
            {form.formState.errors.title && (
              <p className="text-xs text-destructive">{form.formState.errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Description</label>
            <Textarea 
              {...form.register("desc")} 
              placeholder="Briefly explain the goal of this series..." 
              className="min-h-25 resize-none border-slate-200"
            />
          </div>

          {/* Tag Taxonomy Dropdown */}
          <div className="space-y-3">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Taxonomy</label>
            <Controller
              name="tags"
              control={form.control}
              render={({ field }) => (
                <div className="space-y-3">
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between font-normal border-slate-200"
                      >
                        {field.value.length > 0 
                          ? `${field.value.length} tags selected` 
                          : "Select categories..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-(--radix-popover-trigger-width) p-0">
                      <Command>
                        <CommandInput placeholder="Search tags..." />
                        <CommandList>
                          <CommandEmpty>No tag found.</CommandEmpty>
                          <CommandGroup>
                            {AVAILABLE_TAGS.map((tag) => (
                              <CommandItem
                                key={tag.value}
                                value={tag.value}
                                onSelect={() => {
                                  const newValue = field.value.includes(tag.value)
                                    ? field.value.filter((v) => v !== tag.value)
                                    : [...field.value, tag.value];
                                  field.onChange(newValue);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    field.value.includes(tag.value) ? "opacity-100" : "opacity-0"
                                  )}
                                />
                                {tag.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>

                  {/* Visual Badges for selected tags */}
                  <div className="flex flex-wrap gap-2">
                    {field.value.map((val) => {
                      const label = AVAILABLE_TAGS.find(t => t.value === val)?.label || val;
                      return (
                        <Badge key={val} variant="secondary" className="gap-1 px-2 py-1">
                          {label}
                          <X 
                            className="h-5 w-5 cursor-pointer hover:text-destructive" 
                            onClick={() => field.onChange(field.value.filter(v => v !== val))}
                          />
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              )}
            />
          </div>

          {/* Simple Visibility Select */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</label>
            <div className="flex gap-2">
               {[
                 { label: "Draft", value: false },
                 { label: "Public", value: true }
               ].map((opt) => (
                 <Button
                    key={opt.label}
                    type="button"
                    variant={form.watch("isPublished") === opt.value ? "default" : "outline"}
                    className="flex-1 text-xs h-9"
                    onClick={() => form.setValue("isPublished", opt.value)}
                 >
                   {opt.label}
                 </Button>
               ))}
            </div>
          </div>
        </div>

        <Button 
          type="submit" 
          disabled={mutation.isPending} 
          className="w-full"
        >
          {mutation.isPending ? <Loader2 className="animate-spin" /> : "Create Series"}
        </Button>
      </form>
    </div>
  );
};

export default SeriesForm;