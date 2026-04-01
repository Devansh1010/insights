import { Schema, model, models, Model } from "mongoose";
import { ISeriesBlog } from "@/types/series";

const seriesBlogSchema = new Schema<ISeriesBlog>(
    {
        series: {
            type: Schema.Types.ObjectId,
            ref: "Series",
            required: true,
            index: true,
        },
        blog: {
            type: Schema.Types.ObjectId,
            ref: "Blog",
            required: true,
            index: true,
        },
        order: {
            type: Number,
            required: true,
        },

        isFeatured: {
            type: Boolean,
            default: false,
        },
        addedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

const SeriesBlog: Model<ISeriesBlog> =
    models.SeriesBlog || model<ISeriesBlog>("SeriesBlog", seriesBlogSchema);

export default SeriesBlog;