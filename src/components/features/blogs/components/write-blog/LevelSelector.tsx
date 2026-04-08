
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
import { AlertCircle } from "lucide-react";

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
        <div className="flex items-center gap-4">
            <span className="text-muted-foreground font-medium whitespace-nowrap">Level:</span>

            <Combobox
                items={LEVELS}
                onInputValueChange={(data) => onChange(data)}
            >
                <ComboboxInput
                    value={value || ""}
                    placeholder="Select a Level..."
                    className="bg-transparent border-none p-0 focus:ring-0 text-sm font-semibold text-foreground/80 placeholder:text-muted-foreground/40 hover:text-primary transition-colors cursor-pointer w-auto min-w-30"
                />

                <ComboboxContent>
                    <ComboboxEmpty>No items found.</ComboboxEmpty>
                    <ComboboxList>
                        {LEVELS.map((item: string) => (
                            <ComboboxItem
                                key={item}
                                value={item}
                            >
                                {item}
                            </ComboboxItem>
                        ))}
                    </ComboboxList>
                </ComboboxContent>
            </Combobox>

            {error && (
                <div className="flex items-center gap-2 mt-2 text-destructive animate-in fade-in slide-in-from-top-1 duration-300">
                    <AlertCircle className="w-4 h-4" />
                    <p className="text-xs font-medium tracking-wide">
                        {error.message}
                    </p>
                </div>
            )}
        </div>
    );
}