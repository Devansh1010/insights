import { Schema, Types, model, models } from "mongoose";
import { IMPACT_EVENTS, ImpactEventType } from "../constants";

export interface CreateImpactEvent {
  actorId: Types.ObjectId;
  articleId: Types.ObjectId;
  authorId: Types.ObjectId;
  eventType: ImpactEventType;
  metadata?: Record<string, unknown>;
}

const impactEventSchema = new Schema<CreateImpactEvent>(
  {
    actorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    articleId: {
      type: Schema.Types.ObjectId,
      ref: 'Article',
      required: true,
      index: true,
    },

    authorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    eventType: {
      type: String,
      enum: Object.values(IMPACT_EVENTS),
      required: true,
      index: true,
    },

    metadata: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

export const ImpactModel =
  models.Impact || model<CreateImpactEvent>("Impact", impactEventSchema);