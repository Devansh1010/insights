import { JSONContent } from "@tiptap/react";

export interface CreateBlogVariables {
    blogId?: string
    title?: string;
    hook?: string
    content?: JSONContent;
    level?: string,
    insights?: string[],
    isPublished?: boolean;
    seriesId?: string;
    coverImage?: string;
    tags?: string[];
    seriesPartOf: string
}