import React from 'react'
import { Skeleton } from '../ui/skeleton'

const TiptapLoader = () => {
    return (
        <div><div className="space-y-3 border rounded-md p-4">
            {/* Skeleton for the Toolbar area */}
            <div className="flex items-center space-x-2 pb-2 border-b">
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-8 w-24 rounded-md" /> {/* For dropdowns */}
                <div className="flex-1" />
                <Skeleton className="h-8 w-8 rounded-md" />
            </div>

            {/* Skeleton for the Writing area */}
            <div className="space-y-4 pt-4">
                <Skeleton className="h-6 w-[90%]" />
                <Skeleton className="h-6 w-[80%]" />
                <Skeleton className="h-6 w-[95%]" />
                <Skeleton className="h-40 w-full rounded-md" /> {/* Image or long block placeholder */}
                <Skeleton className="h-6 w-[70%]" />
            </div>
        </div></div>
    )
}

export default TiptapLoader