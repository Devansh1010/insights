// @/types/blog.ts

import { Schema } from "mongoose";

export type EditorJSBlock =

  | { type: "header"; data: { text: string; level: number } }
  | { type: "paragraph"; data: { text: string } }
  | { type: "list"; data: { style: "ordered" | "unordered"; items: string[] } }
  | { type: "image"; data: { file: { url: string }; caption?: string } }
  | { type: "code"; data: { code: string } };

export interface EditorJSData {
  time?: number;
  blocks: EditorJSBlock[];
  version?: string;
}
export interface IBlog {
  id?: Schema.Types.ObjectId,
  author: Schema.Types.ObjectId
  username: string,
  
  title: string,
  slug: string,
  content: EditorJSData,
  excerpt?: string,

  coverImage?: string

  tags?: string[]

  isPublished: boolean
  publishedAt?: Date

  createdAt: Date,
  updatedAt: Date,
}
