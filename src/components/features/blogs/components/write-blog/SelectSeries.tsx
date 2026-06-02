import { useController, useFormContext } from "react-hook-form";
import { AlertCircle, Library, ChevronDown, PlusCircle } from "lucide-react";
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "@/components/ui/combobox";
import SeriesForm from "@/components/features/series/components/SeriesForm";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type Series = {
    _id: string;
    title: string;
};

export function SeriesSelector({ availableSeries }: { availableSeries: Series[] }) {

    console.log(availableSeries)
    const [openCreate, setOpenCreate] = useState(false);
    
    const { control } = useFormContext();

    const {
        field: { value, onChange },
        fieldState: { error }
    } = useController({
        control,
        name: 'seriesId'
    });

    const currentSeries = availableSeries.find(s => s._id === value);

    return (
        <div className="group inline-flex flex-col gap-2 w-full max-w-70">
            {/* 1. Header: Label + Status */}
            <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                    <label className={`text-[9px] font-black uppercase tracking-[0.2em] leading-none ${error ? 'text-destructive' : 'text-muted-foreground'}`}>
                        Series Placement
                    </label>
                    <div className={`h-px w-3 ${error ? 'bg-destructive/40' : 'bg-primary/20'}`} />
                </div>

                {/* Micro-interaction: Error indicator */}
                {error && (
                    <span className="text-[9px] font-bold text-destructive uppercase animate-pulse">
                        Required
                    </span>
                )}
            </div>

            <Combobox
                items={availableSeries}
                onInputValueChange={onChange}
            >
                {/* 2. Enhanced Trigger: Visualizes Error State */}
                <div className={`
                    flex items-center gap-3 px-3 py-1.5 rounded-full border transition-all duration-300 cursor-pointer shadow-sm
                    ${error
                        ? "border-destructive bg-destructive/5 ring-4 ring-destructive/10"
                        : "border-input bg-background/50 hover:border-primary/30 hover:bg-primary/3 group-focus-within:ring-2 group-focus-within:ring-primary/10 group-focus-within:border-primary"}
                `}>

                    {/* Icon: Swaps theme based on error */}
                    <div className="relative">
                        <div className={`
                            p-1.5 rounded-lg transition-all duration-300
                            ${error
                                ? "bg-destructive text-white"
                                : "bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground"}
                        `}>
                            {error ? <AlertCircle className="w-3.5 h-3.5" /> : <Library className="w-3.5 h-3.5" />}
                        </div>

                        {/* Status Dot: Hidden on error */}
                        {!error && (
                            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-500 border-2 border-background rounded-full" />
                        )}
                    </div>

                    <div className="flex flex-col flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                            <ComboboxInput
                                value={currentSeries?.title || ""}
                                placeholder="Select collection..."
                                className="bg-transparent border-none p-0 focus:ring-0 text-xs font-bold text-foreground/80 placeholder:text-muted-foreground/40 cursor-pointer w-full truncate"
                            />
                            <ChevronDown className={`w-3 h-3 transition-colors ${error ? 'text-destructive' : 'text-muted-foreground/40'}`} />
                        </div>
                    </div>
                </div>

                {/* 3. Popover */}
                <ComboboxContent className="mt-2 min-w-65 shadow-2xl border-muted/50 backdrop-blur-xl bg-background/95 rounded-2xl overflow-hidden p-1.5">
                    <ComboboxEmpty className="py-8 text-center text-[11px] text-muted-foreground font-medium italic">
                        No collection matches.
                    </ComboboxEmpty>

                    <ComboboxList className="max-h-60 overflow-y-auto space-y-1">
                        {availableSeries.map((item: Series) => (
                            <ComboboxItem
                                key={item._id}
                                value={item._id}
                                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground cursor-pointer"
                            >
                                <div className="w-1 h-3 rounded-full bg-primary/20 group-data-[selected=true]:bg-white/40" />
                                <span className="truncate">{item.title}</span>
                            </ComboboxItem>
                        ))}
                    </ComboboxList>

                    <div className="mt-1.5 p-1 border-t border-muted/40 bg-muted/20 rounded-b-[14px]">
                        <SeriesForm
                            open={openCreate}
                            setOpen={setOpenCreate}
                            trigger={
                                <Button variant="outline">
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    New Series
                                </Button>
                            }
                        />
                    </div>
                </ComboboxContent>
            </Combobox>

            {/* 4. Semantic Error Message */}
            {error && (
                <div className="flex items-center gap-1.5 ml-2 mt-0.5 animate-in slide-in-from-top-1 fade-in duration-300">
                    <p className="text-[10px] font-bold text-destructive uppercase tracking-wider">
                        {error.message || "Collection Selection Required"}
                    </p>
                </div>
            )}
        </div>
    );
}