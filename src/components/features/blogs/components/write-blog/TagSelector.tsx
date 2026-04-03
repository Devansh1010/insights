import { useController, useFormContext } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
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
        <div className="space-y-3">
            <div className="flex items-center gap-4 text-sm">
                <span className="text-muted-foreground font-medium whitespace-nowrap">Tags:</span>
                <Select onValueChange={addTag}>
                    <SelectTrigger className="w-fit h-7 border-dashed border-muted-foreground/30 bg-transparent hover:bg-muted/50 transition-colors px-3 rounded-full text-xs">
                        <Plus className="w-3 h-3 mr-1" />
                        <SelectValue placeholder="Add tag" />
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

            {/* Selected Badges */}
            <div className="flex flex-wrap gap-2">
                {selectedTags.map((tag: string, index: number) => {
                    return (
                        <Badge
                            key={index}
                            variant="secondary"
                            className="pl-3 pr-1 py-1 rounded-full bg-muted/50 text-xs flex items-center gap-1 group"
                        >
                            {tag}
                            <Button
                                type="button"
                                onClick={() => removeTag(tag)}
                                className="p-0.5 rounded-full hover:bg-destructive hover:text-white transition-colors"
                            >
                                <X className="w-3 h-3" />
                            </Button>
                        </Badge>
                    );
                })}
            </div>
        </div>
    );
}