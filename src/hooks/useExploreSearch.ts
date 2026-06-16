import { useDebounce } from "@/helpers/useDebounce";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// hooks/useExploreSearch.ts
export function useExploreSearch() {
    const router = useRouter();

    const searchParams = useSearchParams();
    const q = searchParams.get("q") ?? "";

    const [search, setSearch] = useState(q);
    const { debouncedValue } = useDebounce(search, 500);

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());

        if (debouncedValue.trim()) {
            params.set("q", debouncedValue);
        } else {
            params.delete("q");
        }

        params.delete("page");

        const newUrl = `/user/explore?${params.toString()}`;

        const currentUrl = `/user/explore?${searchParams.toString()}`;

        if (newUrl !== currentUrl) {
            router.replace(newUrl);
        }
    }, [debouncedValue]);

    return {
        search,
        setSearch,
        q,
    };
}