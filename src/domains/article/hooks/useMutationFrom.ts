
import { createBlog, CreateBlogVariables } from "@/services/blog.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateArticle } from "../axios/article.axios";
import { useRouter } from "next/navigation";

export const useCreateArticle = () => {

    const router = useRouter();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (variables: CreateBlogVariables) => createBlog(variables),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blogs"] });
            toast.success("Blog published successfully!");
            router.push("/user/explore");
        },

        onError: () => toast.error("Failed to create blog"),
    });

    return mutation
}


export const useUpdateArticle = (slug?: string) => {

    const router = useRouter();
    const queryClient = useQueryClient();

    const updateMutation = useMutation({
        mutationFn: (variables: CreateBlogVariables & { slug: string }) =>
            updateArticle(variables, slug),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blogs"] });
            queryClient.invalidateQueries({ queryKey: ["blog", slug] });
            toast.success("Blog updated successfully!");
            router.push("/user/explore");
        },

        onError: () => toast.error("Failed to update blog"),
    });

    return updateMutation
}