import { Button } from "@/components/ui/button";
import { Loader2, Lightbulb } from "lucide-react";
import { createImpact } from "../axios/impact.axios";
import { IMPACT_EVENTS } from "../constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function LearnedButton({
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

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createImpact,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["impact", articleId],
      });
    },
  });

  const pending = isPending || mutation.isPending;

  return (
    <Button
      disabled={pending}
      variant={isEventExist ? "default" : "outline"}
      onClick={() =>
        mutation.mutate({
          articleId,
          authorId,
          eventType: IMPACT_EVENTS.LEARNED,
        })
      }
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Updating...
        </>
      ) : isEventExist ? (
        <>
          <Lightbulb className="h-4 w-4" />
          Learned
        </>
      ) : (
        <>
          <Lightbulb className="h-4 w-4" />
          Mark as Learned
        </>
      )}
    </Button>
  );
}