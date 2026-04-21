
import { useState, useMemo } from "react";
import { JSONContent } from "@tiptap/react";

export interface Blog {
    _id: string;
    slug: string;
    tags?: string[];
    coverImage: string;
    content: JSONContent;
    title: string;
    hook: string;
    desc: string;
    excerpt?: string;
    insights?: string[];
    username: string
    views: number
    likes: number
    readTime: number
    level: "Beginner" | "Intermediate" | "Advanced"
    publishedAt: Date
    isPublished: boolean
    createdAt: Date
}

export const useBlogsFilters = (blogs: Blog[], currentPage: number) => {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredBlogs = useMemo(() => {
        return blogs.filter((item) => {
            const searchMatch =
                item.title?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
                item.desc?.toLowerCase()?.includes(searchQuery.toLowerCase());
            return searchMatch;
        });
    }, [blogs, searchQuery]);

    // SENIOR LOGIC: Feature content only on Page 1 and only if not searching
    const isInitialState = currentPage === 1 && searchQuery === "";

    return {
        searchQuery,
        setSearchQuery,
        filteredBlogs,
        // If we are on Page 1, pick a "Featured" item (could be based on a 'isFeatured' flag)
        // Otherwise, featured is null and everything goes to 'rest'
        featured: filteredBlogs[0],
        rest: isInitialState
            ? filteredBlogs.slice(1) // Remove the featured one from the list
            : filteredBlogs          // Show everything normally
    };
};