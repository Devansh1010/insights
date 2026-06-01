import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { seriesFormSchema } from '@/lib/schemas/series/series.schema';
import { cn } from '@/lib/utils';
import { getTags } from '@/services/series.service';
import { useQuery } from '@tanstack/react-query';
import { Check, ChevronsUpDown, X } from 'lucide-react';
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form';
import z from 'zod';

const TagsField = () => {
    const [open, setOpen] = React.useState(false);

    const {
        control,
        formState: { errors },
    } = useFormContext<z.infer<typeof seriesFormSchema>>()

    const { data: Tags, isPending: isTagPendding } = useQuery({
        queryKey: ['tags'],
        queryFn: () => getTags(),
    });

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
                                            {Tags && Tags.map((tag: { _id: string, name: string }) => (
                                                <CommandItem
                                                    key={tag._id}
                                                    value={tag.name}
                                                    onSelect={() => {
                                                        const newValue = field.value.includes(tag.name)
                                                            ? field.value.filter((v) => v !== tag.name)
                                                            : [...field.value, tag.name];
                                                        field.onChange(newValue);
                                                    }}
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            field.value.includes(tag.name) ? "opacity-100" : "opacity-0"
                                                        )}
                                                    />
                                                    {tag.name}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>

                        {/* Visual Badges for selected tags */}
                        <div className="flex flex-wrap gap-2">
                            {field.value?.length > 0 && (
                                <div className="flex flex-wrap gap-2 pt-1">
                                    {field.value.map((tagName: string) => {
                                        const tag = Tags.find(
                                            (t: { _id: string; name: string }) =>
                                                t.name === tagName
                                        );

                                        return (
                                            <Badge
                                                key={tagName}
                                                variant="secondary"
                                                className="
                        flex items-center gap-1
                        px-2.5 py-1
                        rounded-md
                        text-xs
                        font-medium
                    "
                                            >
                                                {tag?.name ?? tagName}

                                                <Button
                                                    type="button"
                                                    onClick={() =>
                                                        field.onChange(
                                                            field.value.filter(
                                                                (value: string) =>
                                                                    value !== tagName
                                                            )
                                                        )
                                                    }
                                                    className="
                            ml-1
                            rounded-sm
                            hover:text-destructive
                            transition-colors
                        "
                                                >
                                                    <X className="h-3 w-3" />
                                                </Button>
                                            </Badge>
                                        );
                                    })}
                                </div>
                            )}
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