import { ISeries } from "@/types/series";
import { Schema, model, models, Model } from "mongoose";

// 1. Define the Schema
const seriesSchema = new Schema<ISeries>(
    {
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Series must have an author"],
            index: true,
        },
        title: {
            type: String,
            required: [true, "Series title is required"],
            trim: true,
            maxlength: [100, "Title cannot exceed 100 characters"],
        },
        slug: {
            type: String,
            required: [true, "Series slug is required"],
            unique: true, // Ensures no two series have the same URL
            lowercase: true,
            trim: true,
            index: true,
        },
        desc: {
            type: String,
            maxlength: [500, "Description is too long"],
        },
        blogs: [
            {
                type: Schema.Types.ObjectId,
                ref: "Blog",
            },
        ],
        coverImage: {
            type: String,
            default: "",
        },
        tags: {
            type: [String],
            default: [],
        },
        isPublished: {
            type: Boolean,
            default: false,
        },
        publishedAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// If isPublished changes to true, automatically set publishedAt
seriesSchema.pre("save", function () {
    if (this.isModified("isPublished") && this.isPublished && !this.publishedAt) {
        this.publishedAt = new Date();
    }
});


const Series: Model<ISeries> = models.Series || model<ISeries>("Series", seriesSchema);

export default Series;