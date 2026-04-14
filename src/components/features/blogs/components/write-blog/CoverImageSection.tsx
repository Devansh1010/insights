import UploadImage, { ImageKitData } from "@/components/Imagekit/ImageUpload";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import Image from "next/image";
import { useController, useFormContext } from "react-hook-form";

export function CoverImageSection({ url }: { url: string }) {
    const { control } = useFormContext();

    const { field, fieldState } = useController({
        name: "coverImage",
        control,
    });

    return (
        <section className="relative group">
            <div className="relative aspect-21/9 w-full rounded-[2rem] overflow-hidden bg-muted transition-all duration-500 ring-1 ring-border shadow-2xl">
                {!field.value && !url ? (
                    <div className="h-full w-full">
                        <UploadImage onUploadSuccess={(data: ImageKitData) => field.onChange({ ...data })} />

                        {fieldState.error && (
                            <div className="flex items-center gap-2 mt-2 text-destructive animate-in fade-in slide-in-from-top-1 duration-300">
                                <AlertCircle className="w-4 h-4" />
                                <p className="text-xs font-medium tracking-wide">
                                    {fieldState.error?.message}
                                </p>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <Image
                            src={url || field.value?.url}
                            alt="cover"
                            fill
                            sizes="(max-width: 1200px) 100vw, 1200px"
                            className="object-cover transition duration-700 group-hover:scale-105"
                        />
                        {/* Elegant Overlay */}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                            <Button
                                onClick={() => field.onChange(null)}
                                variant="secondary"
                                className="rounded-full bg-white/90 text-black hover:bg-white shadow-xl"
                            >
                                Change Cover
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}