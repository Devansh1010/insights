import { Button } from '@/components/ui/button'
import React from 'react'
import { useWatch } from 'react-hook-form'

const SaveTypeButtons = () => {
    const {
        defaultValue: isPublished,
        setValue,
    } = useWatch({
        name: 'isPublished',
        defaultValue: false
    })
    return (
        <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</label>
            <div className="flex gap-2">
                {[
                    { label: "Draft", value: false },
                    { label: "Public", value: true }
                ].map((opt) => (
                    <Button
                        key={opt.label}
                        type="button"
                        variant={isPublished === opt.value ? "default" : "outline"}
                        className="flex-1 text-xs h-9"
                        onClick={() => setValue("isPublished", opt.value)}
                    >
                        {opt.label}
                    </Button>
                ))}
            </div>
        </div>
    )
}

export default SaveTypeButtons