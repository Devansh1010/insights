import Editor from "@/components/editor";
import { useController, useFormContext } from "react-hook-form";


export function EditorField() {
  const { control } = useFormContext();

  const {
    field: { onChange, value },
    fieldState: { error }
  } = useController({
    name: "content",
    control,
    defaultValue: {},
  });

  return (
    <div className="space-y-2">
      <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none 
          prose-headings:font-bold prose-p:text-muted-foreground prose-p:leading-relaxed
          focus-within:prose-p:text-foreground transition-colors duration-500">

        <Editor
          data={value}
          onChange={(data) => onChange(data)}
        />

      </div>

      {/* Validation feedback */}
      {error && (
        <p className="text-xs text-destructive font-medium animate-in fade-in slide-in-from-top-1">
          {error.message || "Content is required to publish."}
        </p>
      )}
    </div>
  );
}