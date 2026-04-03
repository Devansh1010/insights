
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

type Series = {
    _id: string;
    title: string;
};

export function SeriesSelector({ availableSeries }: { availableSeries: Series[] }) {
    const { control } = useFormContext();

    const {
        field: { value, onChange },
        fieldState: { error } } = useController({
            control,
            name: 'seriesId'
        })

    // Find the actual object so we can display the Title in the input
    const currentSeries = availableSeries.find(s => s._id === value);

    return (
        <div className="flex items-center gap-4">
            <span className="text-muted-foreground font-medium whitespace-nowrap">In series:</span>

            <Combobox
                items={availableSeries}
                onInputValueChange={(data) => onChange(data)}
            >
                <ComboboxInput
                    value={currentSeries?.title || ""}
                    placeholder="Select a series..."
                    className="bg-transparent border-none p-0 focus:ring-0 text-foreground font-medium"
                />

                <ComboboxContent>
                    <ComboboxEmpty>No items found.</ComboboxEmpty>
                    <ComboboxList>
                        {availableSeries.map((item) => (
                            <ComboboxItem
                                key={item._id}
                                value={item._id}
                            >
                                {item.title}
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