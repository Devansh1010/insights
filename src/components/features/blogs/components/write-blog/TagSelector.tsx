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
        <div className="group inline-flex flex-col gap-2">
            <div className="flex items-center gap-2 ml-1 opacity-60 group-hover:opacity-100 transition-opacity">
                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground leading-none">
                    Tag Selection
                </label>
                <div className="h-px w-3 bg-primary/20" />
            </div>

            <div className="group flex items-center gap-3 px-3 py-1.5 rounded-full border border-input bg-background/50 hover:border-primary/30 hover:bg-primary/3 transition-all duration-300 w-fit max-w-full">

                {/* 1. Leading Icon with Theme-consistent styling */}
                <div className="relative shrink-0">
                    <div className="p-1.5 rounded-lg bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                        <Hash className="w-3.5 h-3.5" />
                    </div>
                </div>

                {/* 2. Tag Container with smooth horizontal scroll */}
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
                    {selectedTags.length > 0 ? (
                        <div className="flex items-center gap-1.5">
                            {selectedTags.map((tag: string) => (
                                <Badge
                                    key={tag}
                                    className="flex items-center gap-1 bg-secondary/50 hover:bg-secondary/80 border border-transparent hover:border-primary/20 text-foreground/80 transition-all px-2.5 py-0.5 rounded-md text-[11px] font-bold tracking-tight shadow-sm whitespace-nowrap"
                                >
                                    {tag}
                                    <Button
                                        type="button"
                                        onClick={() => removeTag(tag)}
                                        className="ml-1 p-0.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-sm transition-all"
                                    >
                                        <X className="w-3 h-3" />
                                    </Button>
                                </Badge>
                            ))}
                        </div>
                    ) : (
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 px-1">
                            Uncategorized
                        </span>
                    )}

                    {/* 3. The "Add Tag" Trigger styled as a sleek ghost button */}
                    <Select onValueChange={addTag}>
                        <SelectTrigger className="h-7 w-auto border-none bg-primary/5 hover:bg-primary/10 px-2 rounded-md transition-all text-primary font-bold text-[11px] gap-1.5 focus:ring-0">
                            <SelectValue>
                                
                            </SelectValue>
                        </SelectTrigger>

                        <SelectContent className="shadow-2xl border-muted/50 backdrop-blur-xl bg-background/95 rounded-xl p-1">
                            {availableTags.map((tag, index) => (
                                <SelectItem
                                    key={index}
                                    value={tag}
                                    disabled={selectedTags.includes(tag)}
                                    className="rounded-lg text-xs font-semibold data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground"
                                >
                                    {tag}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div >
    );
}