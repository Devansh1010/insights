import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { CreateBlogVariables } from "../type";



export const useResetFormSchema = ({ existingArticle, methods }: { existingArticle: CreateBlogVariables, methods: UseFormReturn<CreateBlogVariables, unknown, CreateBlogVariables> }) => {

    useEffect(() => {
        if (!existingArticle) return;

        methods.reset({
            title: existingArticle.title,
            hook: existingArticle.hook ?? "",
            level: existingArticle.level ?? "Beginner",
            insights: existingArticle.insights ?? [""],
            tags: existingArticle.tags ?? [],
            content: existingArticle.content ?? {},
            isPublished: existingArticle.isPublished ?? false,
            seriesId: existingArticle.seriesPartOf ?? "",
            coverImage: existingArticle.coverImage ?? "",
        });
        
    }, [existingArticle, methods]);

}