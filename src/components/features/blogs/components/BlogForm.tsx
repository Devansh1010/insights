'use client'

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Library, Settings2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

import { CoverImageSection } from "@/components/features/blogs/components/write-blog/CoverImageSection";
import { EditorField } from "@/components/features/blogs/components/write-blog/EditorContent";
import { EditorHeader } from "@/components/features/blogs/components/write-blog/EditorHeader";
import { HookField } from "@/components/features/blogs/components/write-blog/HookField";
import { InsightsField } from "@/components/features/blogs/components/write-blog/InsightsField";
import { LevelSelector } from "@/components/features/blogs/components/write-blog/LevelSelector";
import { SeriesSelector } from "@/components/features/blogs/components/write-blog/SelectSeries";
import { TagSelector } from "@/components/features/blogs/components/write-blog/TagSelector";
import { TitleField } from "@/components/features/blogs/components/write-blog/TitleField";
import { WriteBlogError } from "@/components/features/blogs/error/WriteBlogError";
import { WriteBlogLoader } from "@/components/features/blogs/loader/WriteBlogLoader";
import { createBlogSchema } from "@/lib/schemas/blog/blog-create";
import { createBlog, CreateBlogVariables, getBlog } from "@/services/blog.service";
import { getUserSeries } from "@/services/series.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function BlogForm({ blogId }: { blogId?: string }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isPending, isError } = useQuery({
    queryKey: ['user-series'],
    queryFn: getUserSeries,
  })

  const { data: existingBlog, isPending: isBlogLoading } = useQuery({
    queryKey: ['blog', blogId],
    queryFn: () => getBlog(blogId!),
    enabled: !!blogId, // Only run this query if slug is truthy
  });

  const methods = useForm<CreateBlogVariables>({
    resolver: zodResolver(createBlogSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      hook: '',
      tags: [],
      content: {},
      insights: [],
      level: '',
      isPublished: false,
      seriesId: "",
      coverImage: '',
    }
  });

  const { handleSubmit, formState: { isDirty } } = methods;

  const mutation = useMutation({
    mutationFn: (variables: CreateBlogVariables) => createBlog(variables),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      toast.success("Blog published successfully!");
      router.push("/user/explore");
    },

    onError: () => toast.error("Failed to create blog"),
  });

  const onSubmit = (formData: CreateBlogVariables) => {

    mutation.mutate({
      ...formData,
      isPublished: true,
      coverImage: formData.coverImage,
    });
  };

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  const categories = ['All Series', 'Architecture', 'Frontend', 'Backend', 'System Design', 'Soft Skills']

  if (isPending || isBlogLoading) return <WriteBlogLoader />
  if (isError) return <WriteBlogError />

  console.log(existingBlog)

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="min-h-screen bg-background selection:bg-primary/20">
        <EditorHeader isPending={isPending} />

        <main className="max-w-4xl mx-auto px-6 pt-6 pb-32">
          {/* 1. Cover Image - Reduced margin to pull content up */}
          <section className="mb-6">
            <CoverImageSection url={existingBlog?.coverImage || ''} />
          </section>

          {/* 2. Unified Meta & Configuration Row */}
          <div className="space-y-4 mb-8">
            {/* Core Metadata: Series & Tags */}
            <div className="flex items-center gap-3 pb-4 border-b border-border/40">
              <SeriesSelector availableSeries={data}  />
              <div className="h-4 w-px bg-border/60" />
              <TagSelector availableTags={categories} articleTags={existingBlog?.tags || []} />
            </div>

            {/* Technical Configuration: Using shadcn Accordion */}
            <Accordion type="single" collapsible className="border-none">
              <AccordionItem value="technical-details" className="border-none">
                <AccordionTrigger className="py-2 hover:no-underline group">
                  <div className="flex items-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                    <Settings2 className="w-3.5 h-3.5 text-primary" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                      Configure Technical Metadata
                    </span>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="pt-4 pb-6 px-1">
                  {/* Using a grid to save even more vertical space */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-muted/20 p-6 rounded-2xl border border-muted/50">
                    <div className="space-y-6">
                      <HookField articleHook={existingBlog?.hook || ''} />
                      <LevelSelector articleLevel={existingBlog?.level || ''} />
                    </div>
                    <div>
                      <InsightsField articleInsights={existingBlog?.insights || ['']} />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* 3. The Main Writing Canvas */}
          <article className="space-y-4">
            {/* The user is now only ~250px from the top when they start writing */}
            <TitleField articleTitle={existingBlog?.title || ''} />

            <div className="relative">
              <EditorField articleContent={existingBlog?.content} />
            </div>
          </article>
        </main>
      </form>
    </FormProvider>
  )
}