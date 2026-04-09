"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, PlusCircle, Settings2 } from "lucide-react";
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

const SeriesForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();


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
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-primary hover:bg-primary/10 hover:text-primary-foreground font-semibold py-5"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Series
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-125 p-0 overflow-hidden border-none shadow-2xl">
        {/* Visual Accent Header */}
        <div className="h-2 bg-linear-to-r from-primary via-purple-500 to-blue-500" />

        <div className="p-8">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-2xl font-black tracking-tight">New Series</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Organize your technical deep-dives into a structured collection.
            </DialogDescription>
          </DialogHeader>

          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-6">
                {/* Grouping Fields visually */}
                <div className="space-y-4">
                  <TitleField />
                  <DescriptionField />
                </div>

                <div className="p-4 rounded-xl bg-muted/30 border border-muted/50 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase text-muted-foreground/80">
                    <Settings2 className="w-3 h-3" />
                    Discovery & Visibility
                  </div>
                  <TagsField />
                  <SaveTypeButtons />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <DialogClose asChild>
                  <Button variant="outline" className="flex-1">Cancel</Button>
                </DialogClose>
                <Button
                  type="submit"
                  disabled={mutation.isPending}
                  className="flex-2 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-[0.98]"
                >
                  {mutation.isPending ? (
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  ) : (
                    "Launch Series"
                  )}
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SeriesForm;