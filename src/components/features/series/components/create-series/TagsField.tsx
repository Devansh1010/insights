import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { seriesFormSchema } from '@/lib/schemas/series/series.schema';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown, X } from 'lucide-react';
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form';
import z from 'zod';

const AVAILABLE_TAGS = [
    { label: "Frontend", value: "frontend" },
    { label: "Backend", value: "backend" },
    { label: "DevOps", value: "devops" },
    { label: "System Design", value: "system-design" },
    { label: "Architecture", value: "architecture" },
];

const TagsField = () => {
    const [open, setOpen] = React.useState(false);

    const {
        control,
        formState: { errors },
    } = useFormContext<z.infer<typeof seriesFormSchema>>()

    return (
        <div className="space-y-3">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Taxonomy</label>
            <Controller
                name="tags"
                control={control}
                render={({ field }) => (
                    <div className="space-y-3">
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className="w-full justify-between font-normal border-slate-200"
                                >
                                    {field.value.length > 0
                                        ? `${field.value.length} tags selected`
                                        : "Select categories..."}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-(--radix-popover-trigger-width) p-0">
                                <Command>
                                    <CommandInput placeholder="Search tags..." />
                                    <CommandList>
                                        <CommandEmpty>No tag found.</CommandEmpty>
                                        <CommandGroup>
                                            {AVAILABLE_TAGS.map((tag) => (
                                                <CommandItem
                                                    key={tag.value}
                                                    value={tag.value}
                                                    onSelect={() => {
                                                        const newValue = field.value.includes(tag.value)
                                                            ? field.value.filter((v) => v !== tag.value)
                                                            : [...field.value, tag.value];
                                                        field.onChange(newValue);
                                                    }}
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            field.value.includes(tag.value) ? "opacity-100" : "opacity-0"
                                                        )}
                                                    />
                                                    {tag.label}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>

                        {/* Visual Badges for selected tags */}
                        <div className="flex flex-wrap gap-2">
                            {field.value.map((val) => {
                                const label = AVAILABLE_TAGS.find(t => t.value === val)?.label || val;
                                return (
                                    <Badge key={val} variant="secondary" className="gap-1 px-2 py-1">
                                        {label}
                                        <X
                                            className="h-5 w-5 cursor-pointer hover:text-destructive"
                                            onClick={() => field.onChange(field.value.filter(v => v !== val))}
                                        />
                                    </Badge>
                                );
                            })}
                        </div>
                    </div>
                )}
            />

            {errors.title && (
                <p className="text-xs text-destructive">{errors.title.message}</p>
            )}
        </div>
    )
}

export default TagsField