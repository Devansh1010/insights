
import { CreateBlogVariables } from "@/services/blog.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import axios from "axios";
import { createArticle, updateArticle } from "../axios/article.axios";

export const useCreateArticle = () => {

    const router = useRouter();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (variables: CreateBlogVariables) => createArticle(variables),

        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["blogs"] });
            toast.success(data.message || "Blog published successfully!");
            router.push("/user/explore");
        },

        onError: (error) => {

            if (axios.isAxiosError(error)) {

                toast.error(error.response?.data.message || "Failed to create article")
            }
        }
    });

    return mutation
}


export const useUpdateArticle = (slug?: string) => {

    const router = useRouter();
    const queryClient = useQueryClient();

    const updateMutation = useMutation({
        mutationFn: (variables: CreateBlogVariables & { slug: string }) =>
            updateArticle(variables, slug),

        onSuccess: (data) => {
            queryClient
                .invalidateQueries({ queryKey: ["blogs"] });

            queryClient
                .invalidateQueries({ queryKey: ["blog", slug] });

            toast.success(data.message || "Article updated successfully!");
            router.push("/user/explore");
        },

        onError: (error) => {
            if (axios.isAxiosError(error)) {

                toast.error(error.response?.data.message || "Failed to update article")
            }
        }
    });

    return updateMutation
}