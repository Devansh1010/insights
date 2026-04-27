
import { IBlog } from "@/types/blog";
import { models, Schema, model } from "mongoose";

const blogSchema = new Schema<IBlog>({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  seriesPartOf: {
    type: Schema.Types.ObjectId,
    ref: 'Series',
  },

  username: {
    type: String,
    required: true
  },

  title: {
    type: String,
    required: true,
    trim: true,
  },

  hook: {
    type: String,
    trim: true,
    minlength: 10,
    maxlength: 120,
  },

  insights: [{
    type: String
  }],

  readTime: {
    type: Number,
    default: 3
  },

  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
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

  views: {
    type: Number,
    default: 0
  },

  likes: {
    type: Number,
    default: 0
  },

  isPublished: {
    type: Boolean,
    default: false
  },

  publishedAt: Date

}, { timestamps: true })

const Blog = models.Blog || model<IBlog>('Blog', blogSchema)

export default Blog