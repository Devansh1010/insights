
import { useState, useMemo } from "react";

export interface Blog {
    _id: string;
    slug: string;
    tags?: string[];
    coverImage: string;
    title: string;
    desc: string;
    excerpt?: string;
    username: string
    createdAt: string
}

export const useBlogsFilters = (blogs: Blog[]) => {
    const [searchQuery, setSearchQuery] = useState("");
    // const [activeCategory, setActiveCategory] = useState("All Series");

    const filteredBlogs = useMemo(() => {
        return blogs.filter((item) => {
            // const categoryMatch =
            //     activeCategory === "All Series" ||
            //     item.tags?.some((tag: string) => tag.toLowerCase() === activeCategory.toLowerCase());

            const searchMatch =
                item.title?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
                item.desc?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
                false;

            // return categoryMatch && searchMatch;
          
            return searchMatch
        });
    }, [blogs, searchQuery]);


    return {
        searchQuery,
        setSearchQuery,
        // activeCategory,
        // setActiveCategory,
        filteredBlogs,
        featured: filteredBlogs[0],
        rest: filteredBlogs.slice(1),
    };
};