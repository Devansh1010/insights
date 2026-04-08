'use client'
import { getUserSeries } from "@/services/series.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createBlog, CreateBlogVariables } from "@/services/blog.service";
import { WriteBlogLoader } from "./features/blogs/loader/WriteBlogLoader";
import { WriteBlogError } from "./features/blogs/error/WriteBlogError";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createBlogSchema } from "@/lib/schemas/blog/blog-create";
import { SeriesSelector } from "./features/blogs/components/write-blog/SelectSeries";
import { TitleField } from "./features/blogs/components/write-blog/TitleField";
import { CoverImageSection } from "./features/blogs/components/write-blog/CoverImageSection";
import { EditorField } from "./features/blogs/components/write-blog/EditorContent";
import { EditorHeader } from "./features/blogs/components/write-blog/EditorHeader";
import { TagSelector } from "./features/blogs/components/write-blog/TagSelector";
import { useEffect } from "react";
import { Library } from "lucide-react";
import { LevelSelector } from "./features/blogs/components/write-blog/LevelSelector";
import { InsightsField } from "./features/blogs/components/write-blog/InsightsField";
import { HookField } from "./features/blogs/components/write-blog/HookField";

export default function BlogForm({ slug }: { slug?: string }) {
    const router = useRouter();
    const queryClient = useQueryClient();

    const { data, isPending, isError } = useQuery({
        queryKey: ['user-series'],
        queryFn: getUserSeries,
    })

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

    if (isPending) return <WriteBlogLoader />
    if (isError) return <WriteBlogError />

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="min-h-screen bg-background">
                <EditorHeader isPending={isPending} />

                <main className="max-w-5xl mx-auto px-6 pt-8 pb-24 selection:bg-primary/10">
                    {/* 1. Subtle Cover Section */}
                    <div className="mb-12">
                        <CoverImageSection />
                    </div>

                    {/* 2. The Unified Meta Row (Series + Tags) */}
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-4 mb-10 pb-6 border-b border-border/40">
                        <div className="flex items-center gap-2 group">
                            <div className="p-1.5 rounded-md bg-primary/5 text-primary group-hover:bg-primary/10 transition-colors">
                                <Library className="w-4 h-4" />
                            </div>
                            <SeriesSelector availableSeries={data} />
                        </div>

                        <div className="h-4 w-px bg-border hidden md:block" />

                        <div className="flex-1">
                            <TagSelector availableTags={categories} />
                        </div>
                    </div>

                    {/* 3. The Writing Canvas */}
                    <div className="space-y-10">
                        <TitleField />
                        <div className="space-y-6 max-w-3xl">

                            {/* HOOK */}
                            <HookField />

                            {/* INSIGHTS */}
                            <InsightsField />

                            {/* LEVEL */}
                            <LevelSelector />

                        </div>
                        <EditorField />
                    </div>
                </main>
            </form>
        </FormProvider>
    )
}