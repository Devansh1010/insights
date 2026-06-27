import { IMPACT_EVENTS, ImpactEventType } from "@/domains/impact/constants"

type userEventProps = {
    eventType: ImpactEventType
}
export const useEventExist = (userEvents: userEventProps[]) => {
    const eventStates = userEvents?.reduce(
        (acc, event) => {
            switch (event.eventType) {
                case IMPACT_EVENTS.LEARNED:
                    acc.learned = true;
                    break;

                case IMPACT_EVENTS.SAVED:
                    acc.saved = true;
                    break;

                case IMPACT_EVENTS.APPLIED:
                    acc.applied = true;
                    break;

                case IMPACT_EVENTS.THANK_YOU:
                    acc.thankYou = true;
                    break;
            }

            return acc;
        },
        {
            learned: false,
            saved: false,
            applied: false,
            thankYou: false,
        }
    );

    return eventStates
}