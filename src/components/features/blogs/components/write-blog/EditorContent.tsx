import TipTapEditor from "@/components/editor/tiptap-editor";
import { TiptapContent } from "@/types/blog";
import { useEffect, useRef } from "react";
import { useController, useFormContext } from "react-hook-form";

export function EditorField({
  articleContent,
  articleSlug
}: {
  articleContent?: TiptapContent;
  articleSlug?: string;
}) {
  const { control, setValue } = useFormContext();
  const isLoaded = useRef<string | null>(null); // Track the specific ID loaded

  const {
    field: { onChange, value },
    // fieldState: { error }
  } = useController({
    name: "content",
    control,
    defaultValue: {},
  });


  useEffect(() => {
    // If we have content and it hasn't been loaded for THIS specific ID yet
    if (articleContent && isLoaded.current !== articleSlug) {
      setValue("content", articleContent.content);
      isLoaded.current = articleSlug || "new"; // Update the ref to the current ID
    }
  }, [articleContent, articleSlug, setValue]);

  return (
    <div className="space-y-4">
      <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none">
        <TipTapEditor
          content={value}
          onChange={onChange}
        />
      </div>
      {/* ... error display ... */}
    </div>
  );
}