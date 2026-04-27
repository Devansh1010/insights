import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

type Props = {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

export function PaginationUI({ page, totalPages, onPageChange }: Props) {
    return (
        <Pagination className="mt-6">
            <PaginationContent>

                {/* Previous */}
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => page > 1 && onPageChange(page - 1)}
                    />
                </PaginationItem>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, i) => (
                    <PaginationItem key={i}>
                        <PaginationLink
                            isActive={page === i + 1}
                            onClick={() => onPageChange(i + 1)}
                        >
                            {i + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {/* Next */}
                <PaginationItem>
                    <PaginationNext
                        onClick={() =>
                            page < totalPages && onPageChange(page + 1)
                        }
                    />
                </PaginationItem>

            </PaginationContent>
        </Pagination>
    );
}