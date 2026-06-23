import { CreateImpactEvent } from "../models/impact.model";
import { createImpactEvent, getAllUserEvents }
  from "../repositories/impact.repository";
import { createImpactEventSchema } from "../validators/request-data";
import { UserInputData } from "@/domains/impact/type";
import { Types } from "mongoose";

export async function recordImpact({ actorId, articleId, authorId, eventType, metadata }: UserInputData) {

  const validated =
    createImpactEventSchema.parse({ actorId, articleId, authorId, eventType, metadata });

  const impactEvent: CreateImpactEvent = {
    actorId: new Types.ObjectId(validated.actorId),

    articleId: new Types.ObjectId(validated.articleId),

    authorId: new Types.ObjectId(validated.authorId),

    eventType,

    metadata

  };

  return await createImpactEvent(impactEvent);
}

export async function getRecordImpact({ articleId, actorId }: { articleId: string, actorId: string }) {

  const filter = {
    actorId: new Types.ObjectId(actorId),

    articleId: new Types.ObjectId(articleId),
  }

  return await getAllUserEvents({ filter });
}