import { getUserSeries } from "@/services/series.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Editor from "./editor";
import { useState } from "react";
import { OutputData } from "@editorjs/editorjs";
import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "@/components/ui/combobox"
import UploadImage, { responceData } from "./Imagekit/ImageUpload";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createBlog, CreateBlogVariables } from "@/services/blog.service";



export default function BlogForm({ slug }: { slug?: string }) {

    const [title, setTitle] = useState("");
    const [selectedSeries, setSelectedSeries] = useState<string | undefined>();
    const [imageData, setImageData] = useState<responceData | null>(null);
    const [content, setContent] = useState<OutputData>();

    const router = useRouter();

    const { data, isPending, isError, refetch } = useQuery({
        queryKey: ['user-series'],
        queryFn: getUserSeries,
    })

    const queryClient = useQueryClient();

    const mutation = useMutation({
        // React Query passes the object from mutate() as the first argument here
        mutationFn: (variables: CreateBlogVariables) => createBlog(variables),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blogs"] });
            toast.success("Blog published successfully!");
            router.push("/user/explore");
        },
        onError: () => toast.error("Failed to create blog"),
    });

    const handlePublish = () => {
        mutation.mutate({
            title,
            content,
            isPublished: true,
            seriesId: selectedSeries,
            coverImage: imageData?.url
        });
    };


    const handleUploadSuccess = (data: responceData) => {
        setImageData(data);
    };

    return (
        <div className="min-h-screen bg-background selection:bg-primary/10">
            {/* Header: Enhanced Glassmorphism */}
            <header className="sticky top-0 z-50 w-full">
                <div className="absolute inset-0 bg-background/80 backdrop-blur-md border-b border-border/40" />

                <div className="relative max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                    {/* LEFT: Context & Back */}
                    <div className="flex items-center gap-5">
                        <Link href="/user/dashboard">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-xl hover:bg-muted/80 transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5 text-muted-foreground" />
                            </Button>
                        </Link>

                        <div className="flex items-center gap-2.5 px-3 py-1 bg-muted/40 rounded-full border border-border/50">
                            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                Draft
                            </span>
                        </div>
                    </div>

                    {/* RIGHT: Action Hierarchy */}
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground hover:text-foreground font-medium"
                        >
                            Save Draft
                        </Button>
                        <Button
                            size="sm"
                            className="rounded-full px-6 bg-foreground text-background hover:opacity-90 shadow-lg shadow-foreground/5 transition-all active:scale-[0.98]"
                            onClick={handlePublish}
                        >
                            Publish
                        </Button>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 pt-12 pb-24 space-y-12">

                {/* Cover Image Section: Rounded & Cinematic */}
                <section className="relative group">
                    <div className="relative aspect-21/9 w-full rounded-[2rem] overflow-hidden bg-muted transition-all duration-500 ring-1 ring-border shadow-2xl">
                        {!imageData ? (
                            <UploadImage onUploadSuccess={handleUploadSuccess} />
                        ) : (
                            <>
                                <Image
                                    src={imageData.url || ''}
                                    alt="cover"
                                    fill
                                    className="object-cover transition duration-700 group-hover:scale-105"
                                />
                                {/* Elegant Overlay */}
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                                    <Button
                                        onClick={() => setImageData(null)}
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

                {/* Metadata & Series: Minimalist */}
                <div className="max-w-3xl mx-auto space-y-8">
                    <div className="flex items-center gap-4 text-sm">
                        <span className="text-muted-foreground font-medium">In series:</span>
                        <div className="flex-1 max-w-60">
                            <Combobox items={data} onInputValueChange={setSelectedSeries}>
                                <ComboboxInput
                                    placeholder="Select a series..."
                                    className="bg-transparent border-none p-0 focus:ring-0 text-foreground font-medium placeholder:text-muted-foreground/30"
                                />
                                <ComboboxContent>

                                    <ComboboxEmpty>No items found.</ComboboxEmpty>

                                    <ComboboxList>

                                        {(item) => (

                                            <ComboboxItem key={item._id} value={item._id}>

                                                {item.title}

                                            </ComboboxItem>

                                        )}

                                    </ComboboxList>

                                </ComboboxContent>
                            </Combobox>
                        </div>
                    </div>

                    {/* Writing Surface */}
                    <div className="space-y-6">
                        <textarea
                            placeholder="Enter a title..."
                            className="w-full text-5xl md:text-6xl font-black bg-transparent outline-none placeholder:text-muted-foreground/20 resize-none leading-[1.1] tracking-tight"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            rows={1}
                        />

                        {/* Editor: Styled via Tailwind Typography */}
                        <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none 
          prose-headings:font-bold prose-p:text-muted-foreground prose-p:leading-relaxed
          focus-within:prose-p:text-foreground transition-colors duration-500">
                            <Editor
                                onChange={(data) => setContent(data)}
                                data={content}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}