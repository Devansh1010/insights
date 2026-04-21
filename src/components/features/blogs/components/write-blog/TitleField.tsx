import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";

export function TitleField({ articleTitle }: { articleTitle?: string }) {
    const { register, watch, setValue } = useFormContext();
    const titleRef = useRef<HTMLTextAreaElement | null>(null);
    const titleValue = watch("title");

    useEffect(() => {
        if (articleTitle) {
            setValue("title", articleTitle);
        }
    }, [articleTitle, setValue]);

    // Auto-resize logic
    // useEffect(() => {
    //     if (titleRef.current) {
    //         titleRef.current.style.height = "auto";
    //         titleRef.current.style.height = `${titleRef.current.scrollHeight}px`;
    //     }

    // }, [titleValue]);

    const { ref, ...rest } = register("title");

    return (
        <Textarea
            {...rest}
            ref={(e) => {
                ref(e);
                titleRef.current = e;
            }}
            placeholder="Enter a title..."
            className="w-full text-2xl md:text-2xl font-black bg-transparent outline-none border-none placeholder:text-muted-foreground/20 leading-[1.1] tracking-tight"
            rows={1}
        />
    );
}