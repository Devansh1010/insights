import TipTapEditor from "@/components/editor/tiptap-editor";

import { useController, useFormContext } from "react-hook-form";

export function EditorField({ existingArticleId }: { existingArticleId: string }) {
  const { control } = useFormContext();

  const {
    fieldState: { error }

  } = useController({
    name: "content",
    control,
  });


  return (
    <div className="space-y-4">
      <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none">
        <TipTapEditor
          key={existingArticleId}
        />
      </div>
      {error && (
        <span className="text-[9px] font-bold text-destructive uppercase animate-pulse">
          Required
        </span>
      )}
    </div>
  );
}