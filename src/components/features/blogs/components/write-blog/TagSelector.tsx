import { useController, useFormContext } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Hash } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";


export function TagSelector({ availableTags }: { availableTags: string[] }) {
    const { control } = useFormContext();
    const { field: { value: selectedTags, onChange } } = useController({
        name: "tags",
        control,
        defaultValue: []
    });

    const addTag = (tag: string) => {
        if (!selectedTags.includes(tag)) {
            onChange([...selectedTags, tag]);
        }
    };

    const removeTag = (tag: string) => {
        onChange(selectedTags.filter((t: string) => t !== tag));
    };

    return (
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <Hash className="w-4 h-4 text-muted-foreground/50 shrink-0" />
            <div className="flex items-center gap-1.5">
                {selectedTags.map((tag: string) => (
                    <Badge key={tag} className="bg-secondary/40 hover:bg-secondary/60 border-none text-muted-foreground transition-all px-2 py-0.5 rounded-md">
                        {tag}
                        <Button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="p-0.5 bg-transparent hover:text-destructive rounded-sm transition-colors group border-none"
                            variant={"outline"}
                        >
                            <X className="w-3 h-3 cursor-pointer" />
                        </Button>
                    </Badge>
                ))}
                <Select onValueChange={addTag}>
                    <SelectTrigger className="h-7 w-auto border-none bg-transparent hover:bg-muted p-2 rounded-md transition-all text-muted-foreground">
                        <SelectValue>
                            <Plus className="w-4 h-4" /> Add Tag
                        </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        {availableTags.map((tag, index) => (
                            <SelectItem
                                key={index}
                                value={tag}
                                disabled={selectedTags.includes(tag)}
                            >
                                {tag}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}