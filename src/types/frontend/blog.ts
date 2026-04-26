import { JSONContent } from "@tiptap/react";

export interface Blog {
    _id: string;
    slug: string;
    tags?: string[];
    coverImage?: string;
    content: JSONContent;
    author: {
        _id: string;
        avatar?: string;
    };
    nextBlog: {
        _id: string,
        title: string,
        coverImage: string,
        desc: string
    }
    title: string;
    hook: string;
    excerpt: string;
    insights: string[];
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