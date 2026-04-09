
import { useController, useFormContext } from "react-hook-form";

//shadcn
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "@/components/ui/combobox"
import { AlertCircle, BarChart3, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const LEVELS = ["Beginner", "Intermediate", "Advanced"] as const;

export function LevelSelector() {
    const { control } = useFormContext();

    const {
        field: { value, onChange },
        fieldState: { error } } = useController({
            control,
            name: 'level',
            defaultValue: "Beginner",
        })


    return (
        <div className="group flex flex-col gap-2">
            {/* 1. Technical Label with the same visual language as Series */}
            <div className="flex items-center gap-2 ml-1">
                <div className="h-1.5 w-1.5 rounded-full bg-primary/40" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50">
                    Difficulty Level
                </span>
            </div>

            <div className="flex items-center gap-3">
                <Combobox
                    items={LEVELS}
                    onInputValueChange={(data) => onChange(data)}
                >
                    {/* 2. Interactive Trigger styled as a 'Smart Pill' */}
                    <div className={cn(
                        "flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all duration-300 cursor-pointer shadow-sm",
                        "bg-background/50 border-input hover:border-primary/30 group-focus-within:ring-2 group-focus-within:ring-primary/10",
                        // Senior Touch: Conditional border colors based on value
                        value === "Advanced" && "hover:border-red-500/30 group-focus-within:ring-red-500/10",
                        value === "Intermediate" && "hover:border-yellow-500/30 group-focus-within:ring-yellow-500/10",
                        value === "Beginner" && "hover:border-emerald-500/30 group-focus-within:ring-emerald-500/10"
                    )}>

                        {/* Dynamic Icon Color */}
                        <BarChart3 className={cn(
                            "w-3.5 h-3.5 transition-colors",
                            value === "Advanced" ? "text-red-500" :
                                value === "Intermediate" ? "text-yellow-500" :
                                    value === "Beginner" ? "text-emerald-500" : "text-muted-foreground"
                        )} />

                        <ComboboxInput
                            value={value || ""}
                            placeholder="Select proficiency..."
                            className="bg-transparent border-none p-0 focus:ring-0 text-xs font-bold text-foreground/80 placeholder:text-muted-foreground/30 cursor-pointer w-37.5"
                        />

                    </div>

                    {/* 3. Popover Content with same Glassmorphism */}
                    <ComboboxContent className="mt-2 min-w-50 shadow-2xl border-muted/50 backdrop-blur-xl bg-background/95 rounded-xl p-1">
                        <ComboboxEmpty className="py-4 text-center text-[11px] text-muted-foreground">
                            No levels found.
                        </ComboboxEmpty>
                        <ComboboxList className="space-y-1">
                            {LEVELS.map((item: string) => (
                                <ComboboxItem
                                    key={item}
                                    value={item}
                                    className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground transition-all cursor-pointer"
                                >
                                    {item}
                                    {value === item && <Check className="w-3 h-3" />}
                                </ComboboxItem>
                            ))}
                        </ComboboxList>
                    </ComboboxContent>
                </Combobox>

                {/* 4. Inline Error Message to save vertical space */}
                {error && (
                    <div className="flex items-center gap-1.5 text-destructive animate-in fade-in slide-in-from-left-2">
                        <AlertCircle className="w-3 h-3" />
                        <p className="text-[10px] font-bold uppercase tracking-tight">
                            Required
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}