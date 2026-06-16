import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";


interface ExploreSearchProps {
    value: string;
    onChange: (value: string) => void;
}

export function ExploreSearch({
    value,
    onChange,
}: ExploreSearchProps) {

    return (
        <div className="relative w-full max-w-md">
            <Search
                className="
            absolute
            left-3
            top-1/2
            h-4
            w-4
            -translate-y-1/2
            text-muted-foreground
            pointer-events-none
        "
            />

            <Input
                value={value}
                placeholder="Search..."
                onChange={(e) => onChange(e.target.value)}
                className="
            h-11
            pl-10
            pr-4
            rounded-xl
        "
            />
        </div>
    );
}