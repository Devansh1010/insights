"use client";

import { useEffect, useState } from "react";
import { useController, useFormContext } from "react-hook-form";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import {
    AlertCircle,
    Check,
    Hash,
    Plus,
    X,
} from "lucide-react";

interface Tag {
    _id: string;
    name: string;
}

interface TagSelectorProps {
    availableTags: Tag[];
    articleTags?: string[];
}

export function TagSelector({
    availableTags,
    articleTags,
}: TagSelectorProps) {
    const [open, setOpen] = useState(false);

    const { control, setValue } = useFormContext();

    const {
        field: { value = [], onChange },
        fieldState: { error },
    } = useController({
        name: "tags",
        control,
        defaultValue: [],
    });

    const selectedTags = value as string[];

    useEffect(() => {
        if (articleTags?.length) {
            setValue("tags", articleTags);
        }
    }, [articleTags, setValue]);

    const addTag = (tag: string) => {
        if (!selectedTags.includes(tag)) {
            onChange([...selectedTags, tag]);
        }

        setOpen(false);
    };

    const removeTag = (tag: string) => {
        onChange(
            selectedTags.filter(
                (t: string) => t !== tag
            )
        );
    };

    return (
        <div className="group flex flex-col gap-2 w-full">
            {/* Label */}
            <div className="flex items-center gap-2 px-1">
                <label
                    className={`
                        text-[9px]
                        font-black
                        uppercase
                        tracking-[0.2em]
                        leading-none
                        ${
                            error
                                ? "text-destructive"
                                : "text-muted-foreground"
                        }
                    `}
                >
                    Tag Selection
                </label>

                <div
                    className={`
                        h-px w-3
                        ${
                            error
                                ? "bg-destructive/40"
                                : "bg-primary/20"
                        }
                    `}
                />
            </div>

            {/* Main Container */}
            <div
                className={`
                    flex items-center gap-3
                    px-3 py-2
                    rounded-2xl
                    border
                    transition-all
                    duration-300
                    flex-wrap

                    ${
                        error
                            ? "border-destructive bg-destructive/5 ring-4 ring-destructive/10"
                            : "border-input bg-background/50 hover:border-primary/30"
                    }
                `}
            >
                {/* Icon */}
                <div className="shrink-0">
                    <div
                        className={`
                            p-1.5 rounded-lg
                            transition-all

                            ${
                                error
                                    ? "bg-destructive text-white"
                                    : "bg-primary/10 text-primary"
                            }
                        `}
                    >
                        {error ? (
                            <AlertCircle className="w-3.5 h-3.5" />
                        ) : (
                            <Hash className="w-3.5 h-3.5" />
                        )}
                    </div>
                </div>

                {/* Selected Tags */}
                <div className="flex flex-wrap items-center gap-2 flex-1">
                    {selectedTags.length > 0 ? (
                        selectedTags.map((tag) => (
                            <Badge
                                key={tag}
                                className="
                                    flex items-center gap-1
                                    px-2.5 py-1
                                    rounded-md
                                    text-[11px]
                                    font-bold
                                "
                            >
                                {tag}

                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="
                                        h-4 w-4
                                        p-0
                                        hover:text-destructive
                                    "
                                    onClick={() =>
                                        removeTag(tag)
                                    }
                                >
                                    <X size={10} />
                                </Button>
                            </Badge>
                        ))
                    ) : (
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">
                            Uncategorized
                        </span>
                    )}

                    {/* Searchable Tag Picker */}
                    <Popover
                        open={open}
                        onOpenChange={setOpen}
                    >
                        <PopoverTrigger asChild>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="
                                    h-8
                                    rounded-md
                                    text-xs
                                    font-bold
                                "
                            >
                                <Plus className="w-3 h-3 mr-1" />
                                Add Tag
                            </Button>
                        </PopoverTrigger>

                        <PopoverContent
                            align="start"
                            className="w-70 p-0"
                        >
                            <Command>
                                <CommandInput placeholder="Search tags..." />

                                <CommandEmpty>
                                    No tags found.
                                </CommandEmpty>

                                <CommandGroup className="max-h-64 overflow-y-auto">
                                    {availableTags.map(
                                        (tag) => {
                                            const isSelected =
                                                selectedTags.includes(
                                                    tag.name
                                                );

                                            return (
                                                <CommandItem
                                                    key={tag._id}
                                                    value={tag.name}
                                                    disabled={
                                                        isSelected
                                                    }
                                                    onSelect={() =>
                                                        addTag(
                                                            tag.name
                                                        )
                                                    }
                                                >
                                                    <Check
                                                        className={`
                                                            mr-2 h-4 w-4
                                                            ${
                                                                isSelected
                                                                    ? "opacity-100"
                                                                    : "opacity-0"
                                                            }
                                                        `}
                                                    />

                                                    {tag.name}
                                                </CommandItem>
                                            );
                                        }
                                    )}
                                </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            {/* Error */}
            {error && (
                <div className="flex items-center gap-1.5 ml-2 mt-0.5">
                    <p className="text-[10px] font-bold text-destructive uppercase tracking-wider">
                        {error.message ||
                            "Select at least one tag"}
                    </p>
                </div>
            )}
        </div>
    );
}