import { JSONContent } from "@tiptap/react";

export interface Blog {
    _id: string;
    slug: string;
    tags?: string[];
    coverImage?: string;
    content: JSONContent;
    title: string;
    hook: string;
    desc: string;
    username: string;
    views: number;
    likes: number;
    readTime: number;
    level: "Beginner" | "Intermediate" | "Advanced";
    publishedAt?: Date;
    isPublished?: boolean;
    createdAt?: Date;
}

export interface BlogResponse {
    blogs: Blog[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}