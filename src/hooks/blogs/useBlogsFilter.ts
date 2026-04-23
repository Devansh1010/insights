
import { useState, useMemo } from "react";
import { Blog } from "@/types/frontend/blog";

export const useBlogsFilters = (blogs: Blog[]) => {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredBlogs = useMemo(() => {
        return blogs.filter((item) => {
            const searchMatch =
                item.title?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
                item.desc?.toLowerCase()?.includes(searchQuery.toLowerCase());
            return searchMatch;
        });
    }, [blogs, searchQuery]);

    return {
        searchQuery,
        setSearchQuery,
        filteredBlogs,
    };
};