
import { Lightbulb } from "lucide-react";
import { IMPACT_EVENTS } from "../constants";
import { ImpactButton } from "./_components/ImpactButton";

function LearnedButton({
  articleId,
  authorId,
  isEventExist,
  isPending,
}: {
  articleId: string;
  authorId: string;
  isEventExist: boolean;
  isPending: boolean;
}) {

  return (
    <>
      <ImpactButton
        articleId={articleId}
        authorId={authorId}
        isEventExist={isEventExist}
        isPending={isPending}
        eventType={IMPACT_EVENTS.LEARNED}
        icon={Lightbulb}
        activeText="Learned"
        inactiveText="Mark as Learned"
      />
    </>
  );
}

export default LearnedButton