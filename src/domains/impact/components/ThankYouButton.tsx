import { HeartHandshake } from "lucide-react";
import { ImpactButton } from "./_components/ImpactButton";
import { IMPACT_EVENTS } from "../constants";

const ThankYouButton = ({
    articleId,
    authorId,
    isThanked,
    isPending,
}: {
    articleId: string;
    authorId: string;
    isThanked: boolean;
    isPending: boolean;
}) => {
    return (
        <>


            <ImpactButton
                articleId={articleId}
                authorId={authorId}
                isEventExist={isThanked}
                isPending={isPending}
                eventType={IMPACT_EVENTS.THANK_YOU}
                icon={HeartHandshake}
                activeText="Thanked"
                inactiveText="Say Thank You"
            />
        </>
    )
}

export default ThankYouButton