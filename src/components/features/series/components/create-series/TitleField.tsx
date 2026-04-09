import { Input } from '@/components/ui/input'
import { seriesFormSchema } from '@/lib/schemas/series/series.schema'
import { useFormContext } from 'react-hook-form'
import z from 'zod'

const TitleField = () => {
    const {
        register,
        formState: { errors }, 
    } = useFormContext<z.infer<typeof seriesFormSchema>>()
    return (
        <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Title</label>
            <Input
                {...register("title")}
                placeholder="e.g., Mastering Microservices"
                className="border-slate-200 focus:border-primary transition-all"
            />
            {errors.title && (
                <p className="text-xs text-destructive">{errors.title.message}</p>
            )}
        </div>
    )
}

export default TitleField