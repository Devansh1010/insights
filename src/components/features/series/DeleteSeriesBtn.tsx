import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { deleteSeries } from "@/services/series";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";


const DeleteSeriesBtn = ({id}: {id: string}) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: deleteSeries,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["series"] });
            toast.success("Series deleted");
        },
        onError: () => toast.error("Failed to Delete series"),
    });
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline">Show Dialog</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your Series
                        from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Button
                            variant={'default'}
                            onClick={() => mutation.mutate(id)}
                        >
                            Continue
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteSeriesBtn