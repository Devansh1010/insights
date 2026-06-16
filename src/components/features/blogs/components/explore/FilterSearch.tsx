import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { SlidersHorizontal } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

type Tag = {
    _id: string;
    name: string;
}
interface FilterSearchProps {
    tagSearch: string;
    setTagSearch: (value: string) => void;
    isTagPending: boolean,
    filteredTags: Tag[],
    
}

const FilterSearch = ({ tagSearch, setTagSearch, isTagPending, filteredTags }: FilterSearchProps) => {

    const searchParams = useSearchParams();
    const router = useRouter()

    return (
        <div>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                    >
                        <SlidersHorizontal className="h-4 w-4" />
                    </Button>
                </PopoverTrigger>

                <PopoverContent
                    align="end"
                    className="w-80 p-0"
                >
                    <div className="border-b p-3">
                        <Input
                            placeholder="Search tags..."
                            value={tagSearch}
                            onChange={(e) =>
                                setTagSearch(e.target.value)
                            }
                        />
                    </div>

                    <div className="max-h-80 overflow-y-auto p-2">

                        {isTagPending ? (
                            <div className="p-2 text-sm text-muted-foreground">
                                Loading tags...
                            </div>
                        ) : filteredTags.length > 0 ? (
                            filteredTags.map(
                                (tagItem: Tag) => (
                                    <Button
                                        key={tagItem._id}
                                        className="
                            flex w-full items-center
                            rounded-md px-3 py-2
                            text-left text-sm
                            hover:bg-muted
                        "
                                        onClick={() => {

                                            const params =
                                                new URLSearchParams(
                                                    searchParams.toString()
                                                );

                                            params.set(
                                                "tag",
                                                tagItem.name
                                            );

                                            params.delete("page");

                                            router.push(
                                                `/user/explore?${params.toString()}`
                                            );
                                        }}
                                    >
                                        #{tagItem.name}
                                    </Button>
                                )
                            )
                        ) : (
                            <div className="p-3 text-sm text-muted-foreground">
                                No tags found
                            </div>
                        )}

                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default FilterSearch