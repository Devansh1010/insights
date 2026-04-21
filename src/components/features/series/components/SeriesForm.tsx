"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChevronRight, Loader2, PlusCircle, Settings2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Button } from "@/components/ui/button";
import { seriesFormSchema } from "@/lib/schemas/series/series.schema";
import { createSeries } from "@/services/series.service";
import { TitleField } from "../../blogs/components/write-blog/TitleField";
import DescriptionField from "./create-series/DescriptionField";
import TagsField from "./create-series/TagsField";
import SaveTypeButtons from "./create-series/SaveTypeButtons";


import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import CoverImageSeries from "./create-series/CoverImageSeries";
import { useState } from "react";

const SeriesForm = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();


  const form = useForm<z.infer<typeof seriesFormSchema>>({
    resolver: zodResolver(seriesFormSchema),
    defaultValues: {
      coverImage: '',
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

      setOpen(false); // 3. Close the dialog on success
      form.reset();   // 4. Clean up the form for the next use

      router.push("/user/series");
    },
    onError: () => toast.error("Failed to create series"),
  });

  const onSubmit = (data: z.infer<typeof seriesFormSchema>) => {
    mutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="group w-full justify-between border-2 hover:border-primary/50 hover:bg-primary/5 transition-all py-6 px-6 rounded-2xl"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary transition-colors">
              <PlusCircle className="h-5 w-5" />
            </div>
            <div className="flex flex-col items-start">
              <span className="font-bold text-sm tracking-tight">Create New Series</span>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
        </Button>
      </DialogTrigger>

      {/* Increased width to max-w-140 for better spacing */}
      <DialogContent className="sm:max-w-[560px] p-0 overflow-hidden border-none shadow-3xl bg-background/95 backdrop-blur-xl flex flex-col max-h-[90vh]">
        {/* High-end Gradient Accent */}
        <div className="h-1 w-full shrink-0 bg-linear-to-r from-violet-600 via-primary to-cyan-400" />

        {/* Header - Fixed at top */}
        <div className="px-8 pt-8 pb-4 shrink-0">
          <DialogHeader className="space-y-1 text-left">
            <DialogTitle className="text-3xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70">
              New Series
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground/80">
              Craft a curriculum. Group your articles into a single learning path.
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto px-8 py-2 custom-scrollbar">
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pb-6">
              <div className="space-y-6">
                {/* Image Uploader - First Priority */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1">
                    Series Identity
                  </label>
                  <CoverImageSeries />
                </div>

                {/* Core Metadata */}
                <div className="grid gap-5">
                  <TitleField />
                  <DescriptionField />
                </div>

                {/* Configuration Section */}
                <div className="p-6 rounded-3xl bg-muted/20 border border-muted/30 backdrop-blur-sm space-y-6">
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
                    <Settings2 className="w-3 h-3" />
                    Discovery & Access
                  </div>

                  <div className="space-y-5">
                    <TagsField />
                    <div className="pt-4 border-t border-muted/40">
                      <SaveTypeButtons />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </FormProvider>
        </div>

        {/* Action Footer - Fixed at bottom with top-border for separation */}
        <div className="px-8 py-6 bg-background/50 backdrop-blur-md border-t shrink-0">
          <div className="flex items-center gap-3">
            <DialogClose asChild>
              <Button
                variant="ghost"
                className="flex-1 text-muted-foreground hover:bg-muted font-bold rounded-xl h-12"
              >
                Dismiss
              </Button>
            </DialogClose>
            <Button
              type="submit"
              onClick={form.handleSubmit(onSubmit)}
              disabled={mutation.isPending}
              className="flex-[2] h-12 bg-primary text-primary-foreground shadow-[0_10px_20px_rgba(var(--primary-rgb),0.2)] hover:shadow-[0_10px_30px_rgba(var(--primary-rgb),0.3)] transition-all duration-300 font-bold rounded-xl active:scale-[0.98]"
            >
              {mutation.isPending ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : (
                "Launch Series"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SeriesForm;