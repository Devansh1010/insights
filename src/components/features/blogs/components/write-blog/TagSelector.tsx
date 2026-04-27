import { useController, useFormContext } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { X, Hash, AlertCircle, Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export function TagSelector({ availableTags, articleTags }: { availableTags: string[]; articleTags?: string[] }) {
    const { control, setValue } = useFormContext();

    const {
        field: { value: selectedTags, onChange },
        fieldState: { error }
    } = useController({
        name: "tags",
        control,
        defaultValue: []
    });

    useEffect(() => {
        if (articleTags && articleTags.length > 0) {
            setValue("tags", articleTags);
        }
    }, [articleTags, setValue]);

    const addTag = (tag: string) => {
        if (!selectedTags.includes(tag)) {
            onChange([...selectedTags, tag]);
        }
    };

    const removeTag = (tag: string) => {
        onChange(selectedTags.filter((t: string) => t !== tag));
    };

    return (
        <div className="group inline-flex flex-col gap-2 w-full">
            {/* 1. Technical Label Header */}
            <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                    <label className={`text-[9px] font-black uppercase tracking-[0.2em] leading-none ${error ? 'text-destructive' : 'text-muted-foreground'}`}>
                        Tag Selection
                    </label>
                    <div className={`h-px w-3 ${error ? 'bg-destructive/40' : 'bg-primary/20'}`} />
                </div>
            </div>

            {/* 2. Main Container - Changes border and ring on error */}
            <div className={`
                flex items-center gap-3 px-3 py-1.5 rounded-full border transition-all duration-300 w-fit max-w-full shadow-sm
                ${error
                    ? "border-destructive bg-destructive/5 ring-4 ring-destructive/10"
                    : "border-input bg-background/50 hover:border-primary/30 hover:bg-primary/3"}
            `}>

                {/* Leading Icon */}
                <div className="relative shrink-0">
                    <div className={`
                        p-1.5 rounded-lg transition-all duration-300
                        ${error
                            ? "bg-destructive text-white"
                            : "bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground"}
                    `}>
                        {error ? <AlertCircle className="w-3.5 h-3.5" /> : <Hash className="w-3.5 h-3.5" />}
                    </div>
                </div>

                {/* Tag Container */}
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
                                        className="ml-1 p-0.5 text-muted-foreground hover:text-destructive transition-colors"
                                    >
                                        <X size={10} />
                                    </Button>
                                </Badge>
                            ))}
                        </div>
                    ) : (
                        <span className={`text-[10px] font-black uppercase tracking-widest px-1 ${error ? 'text-destructive/60' : 'text-muted-foreground/40'}`}>
                            Uncategorized
                        </span>
                    )}

                    {/* Add Tag Trigger */}
                    <Select onValueChange={addTag}>
                        <SelectTrigger className={`
                            h-7 w-auto border-none px-2 rounded-md transition-all font-bold text-[11px] gap-1.5 focus:ring-0
                            ${error ? 'bg-destructive/20 text-destructive hover:bg-destructive/30' : 'bg-primary/5 text-primary hover:bg-primary/10'}
                        `}>
                            <Plus className="w-3 h-3" />
                            <SelectValue placeholder="Add" />
                        </SelectTrigger>

                        <SelectContent className="shadow-2xl border-muted/50 backdrop-blur-xl bg-background/95 rounded-xl p-1">
                            {availableTags.map((tag, index) => (
                                <SelectItem
                                    key={index}
                                    value={tag}
                                    disabled={selectedTags.includes(tag)}
                                    className="rounded-lg text-xs font-semibold"
                                >
                                    {tag}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* 3. Dedicated Error Message Slot */}
            {error && (
                <div className="flex items-center gap-1.5 ml-2 mt-0.5 animate-in slide-in-from-top-1 fade-in duration-300">
                    <p className="text-[10px] font-bold text-destructive uppercase tracking-wider">
                        {error.message || "Select at least one tag"}
                    </p>
                </div>
            )}
        </div>
    );
}