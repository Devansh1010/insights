
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
import { AlertCircle, Library } from "lucide-react";
import SeriesForm from "@/components/features/series/components/SeriesForm";

type Series = {
    _id: string;
    title: string;
};

export function SeriesSelector({ availableSeries, articleSeries }: { availableSeries: Series[], articleSeries?: Series[] }) {
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
        <div className="group inline-flex flex-col gap-2">
            {/* 1. Subtle Technical Label */}
            <div className="flex items-center gap-2 ml-1 opacity-60 group-hover:opacity-100 transition-opacity">
                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground leading-none">
                    Series Placement
                </label>
                <div className="h-px w-3 bg-primary/20" />
            </div>

            <Combobox
                items={availableSeries}
                onInputValueChange={onChange}
            >
                {/* 2. Consolidated Trigger (Entry Point Styling) */}
                <div className="flex items-center gap-3 px-3 py-1.5 rounded-full border border-input bg-background/50 hover:border-primary/30 hover:bg-primary/3 transition-all duration-300 cursor-pointer shadow-sm group-focus-within:ring-2 group-focus-within:ring-primary/10 group-focus-within:border-primary">

                    {/* Icon Container with Focal Point Styling */}
                    <div className="relative">
                        <div className="p-1.5 rounded-lg bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-sm">
                            <Library className="w-3.5 h-3.5" />
                        </div>
                        {/* Status indicator implies active connection */}
                        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-500 border-2 border-background rounded-full" />
                    </div>

                    <div className="flex flex-col pr-1">
                        <div className="flex items-center gap-2">
                            <ComboboxInput
                                value={currentSeries?.title || ""}
                                placeholder="Select collection..."
                                className="bg-transparent border-none p-0 focus:ring-0 text-xs font-bold text-foreground/80 placeholder:text-muted-foreground/40 cursor-pointer w-auto min-w-25"
                            />
                            {/* Visual cue for dropdown */}
                            <div className="w-1 h-1 rounded-full bg-muted-foreground/30 group-hover:bg-primary/50 transition-colors" />
                        </div>
                    </div>
                </div>

                {/* 3. High-End Popover Content */}
                <ComboboxContent className="mt-2 min-w-65 shadow-[0_10px_40px_rgba(0,0,0,0.1)] border-muted/50 backdrop-blur-xl bg-background/95 rounded-2xl overflow-hidden p-1.5">
                    <ComboboxEmpty className="py-10 text-center text-[11px] text-muted-foreground font-medium italic">
                        No collection matches.
                    </ComboboxEmpty>

                    <ComboboxList className="max-h-60 overflow-y-auto space-y-1">
                        {availableSeries.map((item: Series) => (
                            <ComboboxItem
                                key={item._id}
                                value={item._id}
                                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground cursor-pointer"
                            >
                                {/* Inner accent bar for visual feedback */}
                                <div className="w-1 h-3 rounded-full bg-primary/20 group-data-[selected=true]:bg-white/40" />
                                <span className="truncate">{item.title}</span>
                            </ComboboxItem>
                        ))}
                    </ComboboxList>

                    {/* 4. Integrated Action Footer */}
                    <div className="mt-1.5 p-1 border-t border-muted/40 bg-muted/20 rounded-b-[14px]">
                        <SeriesForm />
                    </div>
                </ComboboxContent>
            </Combobox>
        </div>
    );
}