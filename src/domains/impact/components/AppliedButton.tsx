import {CheckCheck} from "lucide-react";
import { ImpactButton } from "./_components/ImpactButton";
import { IMPACT_EVENTS } from "../constants";

const AppliedButton = ({
    articleId,
    authorId,
    isApplied,
    isPending,
}: {
    articleId: string;
    authorId: string;
    isApplied: boolean;
    isPending: boolean;
}) => {
    return (
        <>
            

            <ImpactButton
                articleId={articleId}
                authorId={authorId}
                isEventExist={isApplied}
                isPending={isPending}
                eventType={IMPACT_EVENTS.APPLIED}
                icon={CheckCheck}
                activeText="Applied"
                inactiveText="Mark as Applied"
            />
        </>
    )
}

export default AppliedButton