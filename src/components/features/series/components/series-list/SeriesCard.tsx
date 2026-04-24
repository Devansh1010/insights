import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Calendar, Eye, Layers, Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Series } from "@/types/frontend/series";
import { useState } from "react";
import SeriesForm from "../SeriesForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSeries } from "@/services/series.service";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { TagBadge } from "@/components/features/badges/MetaBedge";

export const SeriesCard = ({ series }: { series: Series }) => {
  const [openEdit, setOpenEdit] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteSeries,
    onSuccess: () => {
      // Invalidate both the list and the specific item
      queryClient.invalidateQueries({ queryKey: ["series"] });
      toast.success("Series deleted");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to delete series");
    },
  });

  return (
    <div className="group relative">
      {/* Decorative Stack Effect */}
      <div className="absolute inset-0 bg-muted rounded-[2rem] translate-x-2 translate-y-2 -z-10 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-300" />

      <div className="relative bg-background border rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

        {/* Aspect Ratio Container */}
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={series?.coverImage || '/fallback.jpg'}
            alt={series?.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4">
            <Badge className="bg-background/80 backdrop-blur-md text-foreground border-none px-3">
              <Layers className="w-3 h-3 mr-1" /> Series
            </Badge>
          </div>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-3">
            <div className="flex gap-2">
              {series?.tags?.slice(0, 2).map((tag: string) => (
                <TagBadge key={tag} >
                  {tag}
                </TagBadge>
              ))}
            </div>

            {/* --- EDIT/Delete BUTTON START --- */}
            <div className="flex items-center gap-1">
              {/* Edit Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpenEdit(true)}
                className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-colors"
              >
                <Pencil className="w-4 h-4" />
              </Button>

              {/* Delete Alert Dialog */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent className="rounded-3xl border-none shadow-2xl bg-background/95 backdrop-blur-xl">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl font-bold">Delete Series?</AlertDialogTitle>
                    <AlertDialogDescription className="text-sm">
                      This will permanently remove <span className="font-semibold text-foreground">&quot;{series.title}&quot;</span>.
                      This action cannot be undone and will remove the learning path for your readers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter className="flex gap-2 sm:gap-1">
                    <AlertDialogCancel className="rounded-xl border-none hover:bg-muted font-bold transition-all">
                      Keep it
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => mutation.mutate(series._id)}
                      className="rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90 font-bold shadow-lg shadow-destructive/20 transition-all active:scale-95"
                    >
                      Confirm Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              {/* Series Edit Form */}
              <SeriesForm
                id={series._id}
                open={openEdit}
                setOpen={setOpenEdit}
              />
            </div>

          </div>

          <Link href={`/user/series/${series._id}`}>
            <h3 className="text-xl font-bold leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-1">
              {series?.title}
            </h3>
          </Link>

          <p className="text-sm text-muted-foreground line-clamp-2 mb-6 min-h-10">
            {series?.desc}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-border/50">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full relative overflow-hidden border">
                <Image src={series.author?.avatar} fill alt="author" className="object-cover" />
              </div>
              <span className="text-xs font-medium">{series.author?.username}</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center text-muted-foreground text-[11px] gap-1 bg-muted/30 px-2 py-0.5 rounded-full">
                <Eye className="w-3 h-3" />
                <span>{series.views?.toLocaleString() || 0}</span>
              </div>
              <div className="flex items-center text-muted-foreground text-[11px] gap-1">
                <Calendar className="w-3 h-3" />
                <span>{format(new Date(series.createdAt), "MMM dd, yyyy")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};