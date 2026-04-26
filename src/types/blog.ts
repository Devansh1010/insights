// @/types/blog.ts

import { Schema } from "mongoose";

export interface TiptapMark {
  type: string;
  attrs?: Record<string, unknown>;
}

export interface TiptapNode {
  type: string;
  attrs?: Record<string, unknown>;
  content?: TiptapNode[];
  marks?: TiptapMark[];
  text?: string;
}

export interface TiptapContent {
  type: "doc";
  content: TiptapNode[];
}

export interface TiptapContent {
  type: "doc";
  content: TiptapNode[];
}


export interface IBlog {
  id?: Schema.Types.ObjectId;

  author: Schema.Types.ObjectId;
  seriesPartOf?: Schema.Types.ObjectId;

  username: string;

  title: string;
  slug: string;

  content: TiptapContent;

  hook?: string;
  insights?: string[];

  readTime?: number;
  level?: "Beginner" | "Intermediate" | "Advanced";

  excerpt?: string;
  coverImage?: string;
  tags?: string[];

  views?: number;
  likes?: number;

  isPublished: boolean;
  publishedAt?: Date;

  createdAt: Date;
  updatedAt: Date;
}
