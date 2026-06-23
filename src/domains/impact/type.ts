
import { ImpactEventType } from "./constants";

export interface UserInputData {
    actorId: string;
    articleId: string;
    authorId: string;
    eventType: ImpactEventType;
    metadata?: Record<string, unknown>;
}
