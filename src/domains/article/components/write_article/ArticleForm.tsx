'use client'

import { Settings2 } from "lucide-react";

import { useEffect } from "react";
import { FormProvider } from "react-hook-form";

//Nested Components
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
import { CreateBlogVariables } from "@/services/blog.service";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useGetUserSeries } from "@/domains/series/hooks/useGetUserSeries";
import { useArticle } from "../../hooks/useArticle";
import { useTags } from "../../hooks/useTags";
import { useFormSchema } from "../../hooks/useFormSchema";
import { useResetFormSchema } from "../../hooks/useResetFormSchema";
import { useCreateArticle, useUpdateArticle } from "../../hooks/useMutationFrom";

export default function ArticleForm({ slug }: { slug?: string }) {

    // Series data for dropdown
    const { data, isPending, isError } = useGetUserSeries()

    // Fetch existing article data if in edit mode
    const { article, isArticleFetching } = useArticle(slug)

    // Fetching Tags
    const { Tags, isTagPendding } = useTags()

    //Form Defination
    const methods = useFormSchema()

    //destructure methods
    const { handleSubmit, formState: { isDirty } } = methods;

    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (isDirty) {
                e.preventDefault();
            }
        };
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }, [isDirty]);

    useResetFormSchema({ existingArticle: article, methods })

    // Create Article
    const mutation = useCreateArticle()

    // New Update Mutation
    const updateMutation = useUpdateArticle(slug)

    const onSubmit = (formData: CreateBlogVariables) => {

        if (slug) {
            updateMutation.mutate({ ...formData, slug: slug });
        } else {
            mutation.mutate(formData);
        }
    };

    if (isPending || (slug && isArticleFetching) || isTagPendding) return <WriteBlogLoader />

    if (isError) return <WriteBlogError />

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="min-h-screen bg-background selection:bg-primary/20">

                <EditorHeader isPending={isPending} isEditMode={!!slug} />

                <main className="max-w-4xl mx-auto px-6 pt-6 pb-32">
                    {/* 1. Cover Image - Reduced margin to pull content up */}
                    <div className="mb-6">

                        <CoverImageSection />

                    </div>

                    {/* 2. Unified Meta & Configuration Row */}
                    <div className="space-y-4 mb-8">
                        {/* Core Metadata: Series & Tags */}
                        <div className="flex items-center gap-3 pb-4 border-b border-border/40">

                            <SeriesSelector availableSeries={data} />
                            <div className="h-4 w-px bg-border/60" />

                            <TagSelector availableTags={Tags} />

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

                                            <HookField />

                                            <LevelSelector />

                                        </div>
                                        <div>

                                            <InsightsField />

                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>

                    {/* 3. The Main Writing Canvas */}
                    <article className="space-y-4">

                        <TitleField />

                        <div className="relative">

                            <EditorField articleContent={article?.content} articleSlug={slug} />

                        </div>
                    </article>
                </main>
            </form>
        </FormProvider>
    )
}