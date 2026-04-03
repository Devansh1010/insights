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
            tags: [],
            content: {},
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
        console.log(formData)
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

                <main className="max-w-4xl mx-auto px-6 pt-12 pb-24 space-y-12">
                    <CoverImageSection />

                    <div className="max-w-3xl mx-auto space-y-8">
                        <div className="flex flex-col gap-4">
                            <SeriesSelector availableSeries={data} />
                            <TagSelector availableTags={categories} />
                        </div>

                        <div className="space-y-6">
                            <TitleField />
                            <EditorField />
                        </div>
                    </div>
                </main>
            </form>
        </FormProvider>
    )
}