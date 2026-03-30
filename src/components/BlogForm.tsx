import { createBlog } from "@/utils/create-blog";
import { OutputData } from "@editorjs/editorjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { ModeToggle } from "./theme";
import { Textarea } from "./ui/textarea";
import Editor from "./editor";
import { updateBlog } from "@/utils/edit-blog";
import { getBlog } from "@/utils/get-blog";

export default function BlogForm({ slug }: { slug?: string }) {
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState<OutputData | null>(null);
    const [loading, setLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(!!slug);

    const isEditMode = !!slug;
    useEffect(() => {
        setIsFetching(true)
        console.log(slug)
        try {
            if (isEditMode) {
                const fetchBlogData = async () => {
                    const res = await getBlog(slug)
                    console.log("Res:-------", res)
                };
                fetchBlogData();
            }
        } catch (error) {

        } finally {
            setIsFetching(false)
        }
    }, [slug, isEditMode]);

    const handlePublish = async () => {
        if (!title.trim() || !content) {
            toast.error("Title and content cannot be empty.");
            return;
        }

        setLoading(true);
        try {
            let res;
            if (isEditMode) {
                // Call your UPDATE API (PUT/PATCH)
                res = await updateBlog(slug as string, title, content, true);
                toast.success("Blog updated successfully!");
            } else {
                // Call your CREATE API (POST)
                res = await createBlog(title, content, true);
                toast.success("Blog published successfully!");
            }

            if (res) router.push("/user/my-blogs");
        } catch (error) {
            console.error("Action failed:", error);
            toast.error(isEditMode ? "Update failed" : "Publish failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center">
            {/* TOP NAVIGATION BAR */}
            <nav className="fixed top-0 w-full z-50 border-b bg-background/60 backdrop-blur-md px-6 py-3 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Draft saved</span>
                </div>
                {/* <div className="flex items-center gap-3">
                    <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
                        <Eye className="w-4 h-4" /> Preview
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <MoreHorizontal className="w-5 h-5" />
                    </Button>
                </div> */}

                {/* Theme Toggle */}
                <div className="absolute right-6">
                    <ModeToggle />
                </div>
            </nav>

            {/* READING PROGRESS BAR */}
            <div className="fixed top-14.25 left-0 w-full h-0.5 bg-muted z-50">
                <div className="h-full bg-primary w-[30%] transition-all duration-300" />
            </div>

            <main className="w-full max-w-3xl px-6 pt-32 pb-40">
                {/* TITLE SECTION */}
                <div className="group mb-8">
                    <Textarea
                        rows={1}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Article Title"
                        className="w-full text-5xl md:text-6xl font-serif font-bold leading-tight resize-none bg-transparent border-none p-0 focus-visible:ring-0 placeholder:text-muted-foreground/30 selection:bg-primary/20"
                    />
                    {/* <div className="flex items-center gap-4 mt-6 text-sm font-medium text-muted-foreground/60">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-linear-to-tr from-orange-400 to-rose-400" />
                            <span>Your Name</span>
                        </div>
                        <span>•</span>
                        <span>5 min read</span>
                    </div> */}
                </div>

                {/* EDITOR CONTAINER */}
                <div className="relative">
                    <Editor onChange={setContent} data={content} />
                </div>
            </main>

            {/* FLOATING ACTION DOCK */}
            <footer className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
                <div className="flex items-center gap-2 bg-black/90 dark:bg-white/90 text-white dark:text-black px-4 py-2 rounded-full shadow-2xl backdrop-blur-sm border border-white/10">
                    <Button variant="ghost" className="text-xs font-semibold hover:bg-white/10 rounded-full h-8">
                        Auto-save: ON
                    </Button>
                    <div className="w-px h-4 bg-white/20" />
                    <Button className="bg-primary text-primary-foreground hover:scale-105 transition-transform text-xs font-bold px-6 rounded-full h-8 cursor-pointer"
                        onClick={handlePublish}
                        disabled={loading}>
                        {loading ? "Saving..." : isEditMode ? "Update Changes" : "Publish Article"}
                    </Button>
                </div>
            </footer>
        </div>
    )
}