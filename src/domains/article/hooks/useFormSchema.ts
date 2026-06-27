import { createBlogSchema } from "@/lib/schemas/blog/blog-create";
import { CreateBlogVariables } from "@/services/blog.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const useFormSchema = () => {

    const method = useForm<CreateBlogVariables>({
        resolver: zodResolver(createBlogSchema),
        mode: "onChange",
        defaultValues: {
            title: "",
            hook: "",
            level: "Beginner",
            insights: [""],
            tags: [],
            content: {},
            isPublished: false,
            seriesId: "",
            coverImage: "",
        },
    });

    return method
}