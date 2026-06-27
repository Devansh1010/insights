import { Loader2, LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { createImpact } from "@/domains/impact/axios/impact.axios";
import { ImpactEventType } from "../../constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";



type ImpactButtonProps = {
    articleId: string;
    authorId: string;
    isEventExist: boolean;
    isPending: boolean;
    eventType: ImpactEventType;
    icon: LucideIcon;
    activeText: string;
    inactiveText: string;
};

export function ImpactButton({
    articleId,
    authorId,
    isEventExist,
    isPending,
    eventType,
    icon: Icon,
    activeText,
    inactiveText,
}: ImpactButtonProps) {
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
            aria-pressed={isEventExist}
            variant={isEventExist ? "default" : "outline"}
            onClick={() =>
                mutation.mutate({
                    articleId,
                    authorId,
                    eventType,
                })
            }
        >
            {pending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}

            <Icon className="h-4 w-4" />

            <span className="ml-2">
                {isEventExist ? activeText : inactiveText}
            </span>
        </Button>
    );
}