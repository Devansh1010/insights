"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Settings2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Button } from "@/components/ui/button";
import { seriesFormSchema } from "@/lib/schemas/series/series.schema";
import { createSeries, getSeriesFormData, updateSeries } from "@/services/series.service";
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
import { useEffect } from "react";
import { FormSkeleton } from "../loader/FormSkeleton";
import { cn } from "@/lib/utils";

interface SeriesFormProps {
  slug?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  trigger?: React.ReactNode;
}

const SeriesForm = ({ slug, open, setOpen, trigger }: SeriesFormProps) => {
  const isEdit = !!slug;
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: seriesData, isPending: isSeriesDataPending } = useQuery({
    queryKey: ['user-series-by-id', slug],
    queryFn: () => getSeriesFormData({ slug: slug! }),
    enabled: !!slug,
  })


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

  useEffect(() => {
    if (seriesData) {

      form.reset(
        {
          coverImage: seriesData.coverImage || '',
          title: seriesData.title,
          desc: seriesData.desc || '',
          tags: seriesData.tags || [],
          isPublished: seriesData.isPublished || false,
        }
      );
    }
  }, [seriesData, form]);

  const mutation = useMutation({
    // The mutationFn now accepts an object containing both data and the optional id
    mutationFn: ({ data, slug }: { data: z.infer<typeof seriesFormSchema>; slug?: string }) => {
      return slug ? updateSeries(slug, data) : createSeries(data);
    },
    onSuccess: () => {
      // Invalidate both the list and the specific item
      queryClient.invalidateQueries({ queryKey: ["series"] });
      if (slug) {
        queryClient.invalidateQueries({ queryKey: ["user-series", slug] });
      }

      toast.success(slug ? "Series updated" : "Series created");

      setOpen(false);
      form.reset();

      // Only redirect on creation, or stay on page for edits
      if (!slug) {
        router.push("/user/series");
      }
    },
    onError: (error) => {
      console.error(error);
      toast.error(slug ? "Failed to update series" : "Failed to create series");
    },
  });

  const onSubmit = (data: z.infer<typeof seriesFormSchema>) => {
    // Pass the id from your component props into the mutation
    mutation.mutate({ data, slug });
  };

  if (isEdit && isSeriesDataPending) return <FormSkeleton />

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      {/* Increased width to max-w-140 for better spacing */}
      <DialogContent className="sm:max-w-140 p-0 overflow-hidden border-none shadow-3xl bg-background/95 backdrop-blur-xl flex flex-col max-h-[90vh]">
        <div className="h-1 w-full shrink-0 bg-linear-to-r from-violet-600 via-primary to-cyan-400" />

        {/* Header - Fixed at top */}
        <div className="px-8 pt-8 pb-4 shrink-0">
          <DialogHeader className="space-y-1 text-left">
            <DialogTitle className="text-3xl font-black tracking-tighter bg-clip-text text-transparent bg-linear-to-br from-foreground to-foreground/70">
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
              className="relative flex-2 h-12 bg-primary text-primary-foreground shadow-[0_10px_20px_rgba(var(--primary-rgb),0.2)] hover:shadow-[0_10px_30px_rgba(var(--primary-rgb),0.3)] transition-all duration-300 font-bold rounded-xl active:scale-[0.98] overflow-hidden"
            >
              {/* 1. Visible Text when not loading */}
              <span className={cn(mutation.isPending ? "opacity-0" : "opacity-100")}>
                {slug ? "Save Changes" : "Launch Series"}
              </span>

              {/* 2. Loading Overlay (Keep your styling, but wrap in condition) */}
              {mutation.isPending && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-primary transition-all duration-300">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span className="text-xs uppercase tracking-widest animate-pulse">
                      Deploying...
                    </span>
                  </div>
                </div>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SeriesForm;