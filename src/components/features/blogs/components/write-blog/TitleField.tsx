import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";

export function TitleField({articleTitle}: { articleTitle?: string }) {
    const { register, watch } = useFormContext();
    const titleRef = useRef<HTMLTextAreaElement | null>(null);
    const titleValue = watch("title");

    // Auto-resize logic
    useEffect(() => {
        if (titleRef.current) {
            titleRef.current.style.height = "auto";
            titleRef.current.style.height = `${titleRef.current.scrollHeight}px`;
        }
    }, [titleValue]);

    const { ref, ...rest } = register("title");

    return (
        <Textarea
            {...rest}
            ref={(e) => {
                ref(e);
                titleRef.current = e;
            }}
            placeholder="Enter a title..."
            className="w-full text-4xl md:text-5xl font-black bg-transparent outline-none border-none placeholder:text-muted-foreground/20 leading-[1.1] tracking-tight"
            rows={1}
        />
    );
}