import { Bookmark, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { createImpact } from "@/domains/impact/axios/impact.axios";
import { IMPACT_EVENTS } from "@/domains/impact/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";


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
            aria-pressed={isSaved}
            variant={isSaved ? "default" : "outline"}
            onClick={() =>
                mutation.mutate({
                    articleId,
                    authorId,
                    eventType: IMPACT_EVENTS.SAVED,
                })
            }
        >
            {pending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}

            <Bookmark className="h-4 w-4" />

            {isSaved ? "Saved" : "Save"}
        </Button>
    );
}