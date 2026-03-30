
import { IBlog } from "@/types/blog";
import { models, Schema, model } from "mongoose";

const blogSchema = new Schema<IBlog>({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    title: {
        type: String,
        required: true,
        trim: true,
    },

    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    content: {
        type: Schema.Types.Mixed,
        required: true
    },

    excerpt: String,

    coverImage: String,

    tags: [String],

    isPublished: {
        type: Boolean,
        default: false
    },

    publishedAt: Date

}, { timestamps: true })

const Blog = models.Blog || model<IBlog>('Blog', blogSchema)

export default Blog