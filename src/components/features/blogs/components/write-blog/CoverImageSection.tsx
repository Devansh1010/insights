import UploadImage, { ImageKitData } from "@/components/Imagekit/ImageUpload";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { useController, useFormContext } from "react-hook-form";

export function CoverImageSection({ url }: { url?: string }) {

    const { control, setValue } = useFormContext();

    const { field, fieldState } = useController({
        name: "coverImage",
        control,
    });

    // 1. Sync the incoming URL to the form state ONCE
    useEffect(() => {
        if (url && !field.value) {
            // Assuming your form expects a string URL or an object with a URL
            setValue("coverImage", url);
        }
    }, [url, setValue, field.value]);

    return (
        <section className="relative group">
            <div className="group relative flex flex-col w-full aspect-16/6 rounded-xl border-2 border-dashed border-muted-foreground/20 bg-muted/5 transition-all hover:bg-muted/10">

                {/* 1. Main Interaction Area */}
                <div className="relative flex-1 flex flex-col items-center justify-center overflow-hidden rounded-t-xl">
                    {!field.value ? (
                        /* UPLOAD STATE */
                        <div className="flex flex-col items-center gap-4 p-10 text-center">
                            <UploadImage onUploadSuccess={(data: ImageKitData) => field.onChange(data.url)} />
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-foreground">Click to upload cover image</p>
                                <p className="text-xs text-muted-foreground">High resolution recommended (1200x600)</p>
                            </div>
                        </div>
                    ) : (
                        /* PREVIEW STATE */
                        <div className="relative h-full w-full group">
                            <Image
                                src={field.value}
                                alt="Cover preview"
                                fill
                                priority
                                sizes="(max-width: 1200px) 100vw, 1200px"
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />

                            {/* Actions Overlay */}
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => field.onChange(null)}
                                    className="bg-white text-black hover:bg-zinc-200 border-none font-semibold px-6"
                                >
                                    Replace Image
                                </Button>
                            </div>
                        </div>
                    )}
                </div>

                {/* 2. Persistent Error/Status Bar */}
                {fieldState.error && (
                    <div className="border-t border-destructive/20 bg-destructive/5 p-3 flex items-center justify-center gap-2 animate-in slide-in-from-bottom-2">
                        <AlertCircle className="w-4 h-4 text-destructive" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-destructive">
                            {fieldState.error?.message || "Cover image is required"}
                        </span>
                    </div>
                )}
            </div>
        </section>
    );
}