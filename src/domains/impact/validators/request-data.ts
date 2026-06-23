import { z } from "zod";
import { IMPACT_EVENTS } from "@/domains/impact/constants";

export const createImpactEventSchema = z.object({
    actorId: z.string(),

    articleId: z.string(),

    authorId: z.string(),

    eventType: z.enum(
        Object.values(IMPACT_EVENTS) as [
            string,
            ...string[]
        ]
    ),

    metadata: z.record(z.string(), z.unknown()).optional(),
});

export type CreateImpactEventInput =
    z.infer<typeof createImpactEventSchema>;