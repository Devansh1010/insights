import { Textarea } from '@/components/ui/textarea'
import { seriesFormSchema } from '@/lib/schemas/series/series.schema'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import z from 'zod'

const DescriptionField = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext<z.infer<typeof seriesFormSchema>>()
    return (
        <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Description</label>
            <Textarea
                {...register("desc")}
                placeholder="Briefly explain the goal of this series..."
                className="min-h-25 resize-none border-slate-200"
            />
            {errors.title && (
                <p className="text-xs text-destructive">{errors.title.message}</p>
            )}
        </div>
    )
}

export default DescriptionField