'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { passwordSchema } from '@/lib/schemas/auth/passwordSchema'
import { Button } from '@/components/ui/button'
import { useState, Suspense } from 'react' // Import Suspense
import { resetPassword } from '@/utils/reset-password'
import { toast } from 'sonner'
import { KeyRound, Loader2, ShieldCheck } from 'lucide-react'

// 1. Create a sub-component for the actual form logic
function NewPasswordForm() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const token = searchParams.get('token')

    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<z.infer<typeof passwordSchema>>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    })

    async function onSubmit(data: z.infer<typeof passwordSchema>) {
        setIsSubmitting(true)
        try {
            const result = await resetPassword(data.password, token || "")
            if (result) {
                toast.success("Password reset successful! Please log in.")
                router.push('/auth/signin')
            }
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "An error occurred.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form id="form-reset-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-5">
                {/* PASSWORD FIELD */}
                <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">
                                New Password
                            </label>
                            <div className="relative group">
                                <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 group-focus-within:text-zinc-900" />
                                <Input
                                    {...field}
                                    type="password"
                                    placeholder="••••••••"
                                    className={`h-12 pl-11 rounded-2xl  border-zinc-100 ${fieldState.invalid ? "border-destructive" : ""}`}
                                />
                            </div>
                            {fieldState.error && <p className="text-[11px] text-destructive">{fieldState.error.message}</p>}
                        </div>
                    )}
                />

                {/* CONFIRM PASSWORD FIELD */}
                <Controller
                    name="confirmPassword"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">
                                Confirm Password
                            </label>
                            <Input
                                {...field}
                                type="password"
                                placeholder="••••••••"
                                className={`h-12 rounded-2x border-zinc-100 ${fieldState.invalid ? "border-destructive" : ""}`}

                            />
                            {fieldState.error && <p className="text-[11px] text-destructive">{fieldState.error.message}</p>}
                        </div>
                    )}
                />
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full h-12 rounded-2xl font-bold uppercase tracking-widest shadow-xl">
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                {isSubmitting ? "Updating System..." : "Reset Password"}
            </Button>
        </form>
    )
}

// 2. The main Page component wraps the form in Suspense
export default function NewPasswordPage() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <header className="text-center space-y-3">
                    <div className="mx-auto w-14 h-14 bg-zinc-900 rounded-2xl flex items-center justify-center text-white shadow-2xl mb-4">
                        <ShieldCheck size={28} strokeWidth={1.5} />
                    </div>
                    <h1 className="text-3xl font-serif font-bold tracking-tight text-zinc-900">
                        Set New Password
                    </h1>
                </header>

                {/* CRITICAL FIX: Wrap the component using useSearchParams in Suspense */}
                <Suspense fallback={
                    <div className="flex flex-col items-center justify-center p-8 space-y-4">
                        <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
                        <p className="text-xs text-zinc-400 animate-pulse">Initializing Secure Protocol...</p>
                    </div>
                }>
                    <NewPasswordForm />
                </Suspense>

                <footer className="text-center">
                    <p className="text-[10px] text-zinc-400 font-medium tracking-wide">
                        SECURE END-TO-END ENCRYPTION ACTIVE
                    </p>
                </footer>
            </div>
        </div>
    )
}