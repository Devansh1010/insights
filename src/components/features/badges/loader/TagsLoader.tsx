import { Skeleton } from "@/components/ui/skeleton";

export default function TagsLoader() {
    return (
        <div className="mt-8 flex max-w-2xl flex-wrap justify-center gap-3">
            {Array.from({ length: 8 }).map((_, index) => (
                <Skeleton
                    key={index}
                    className="h-8 w-20 rounded-full"
                />
            ))}
        </div>
    );
}