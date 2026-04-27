import { Types } from "mongoose"

export interface ISeries {
    id?: Types.ObjectId,
    author: Types.ObjectId | string; // Creator of Series

    title: string, //Series Name
    slug: string, //Series Slug
    desc?: string,

    blogs: Types.ObjectId[]

    coverImage?: string
    tags?: string[]
    views?: number

    isPublished: boolean
    publishedAt?: Date | null

    createdAt: Date,
    updatedAt: Date,
}

export interface ISeriesBlog {
  series: Types.ObjectId;
  blog: Types.ObjectId;
  order: number;
  isFeatured?: boolean;
  addedAt?: Date;
}