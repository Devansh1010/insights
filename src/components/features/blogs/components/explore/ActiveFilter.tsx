import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

const ActiveFilter = ({ tag }: { tag: string | null }) => {
    const router = useRouter()
    return (
        <div>
            {/* Active Filters */}
            {(tag) && (
                <div className="mb-6 flex flex-wrap items-center gap-2">

                    {tag && (
                        <Badge variant="secondary">
                            #{tag}
                        </Badge>
                    )}

                    {/* {q && (
                            <Badge variant="secondary">
                                {q}
                            </Badge>
                        )} */}

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                            router.push("/user/explore")
                        }
                    >
                        Clear
                    </Button>

                </div>
            )}
        </div>
    )
}

export default ActiveFilter