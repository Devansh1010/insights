    export const EmptyState = ({ message }: { message: string }) => (
        <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed rounded-xl opacity-60">
            <p className="text-lg font-medium text-muted-foreground">{message}</p>
        </div>
    );