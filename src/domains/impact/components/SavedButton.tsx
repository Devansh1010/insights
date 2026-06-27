import { Bookmark } from "lucide-react";
import { IMPACT_EVENTS } from "@/domains/impact/constants";
import { ImpactButton } from "./_components/ImpactButton";


export function SaveButton({
    articleId,
    authorId,
    isSaved,
    isPending,
}: {
    articleId: string;
    authorId: string;
    isSaved: boolean;
    isPending: boolean;
}) {

    return (
        <>
            <ImpactButton
                articleId={articleId}
                authorId={authorId}
                isEventExist={isSaved}
                isPending={isPending}
                eventType={IMPACT_EVENTS.SAVED}
                icon={Bookmark}
                activeText="Save"
                inactiveText="Saved"
            />
        </>
    );
}