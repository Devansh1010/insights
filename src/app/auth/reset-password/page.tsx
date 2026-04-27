'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { passwordSchema } from '@/lib/schemas/auth/passwordSchema'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { resetPassword } from '@/utils/reset-password'
import { toast } from 'sonner'
import { KeyRound, Loader2, ShieldCheck } from 'lucide-react'

export default function NewPasswordPage() {
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
                toast.success("Password reset successful! Please log in with your new password.")
                router.push('/auth/signin')
            }
        } catch (error) {
            console.log(error)
            toast.error(error instanceof Error ? error.message : "An unknown error occurred while resetting your password.")
        } finally { setIsSubmitting(false) }
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            {/* 1. FORM CONTAINER */}
            <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

                {/* 2. HEADER SECTION */}
                <header className="text-center space-y-3">
                    <div className="mx-auto w-14 h-14 bg-zinc-900 dark:bg-zinc-50 rounded-2xl flex items-center justify-center text-white dark:text-zinc-900 shadow-2xl mb-4">
                        <ShieldCheck size={28} strokeWidth={1.5} />
                    </div>
                    <h1 className="text-3xl font-serif font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                        Set New Password
                    </h1>
                    <p className="text-sm text-zinc-500 max-w-70 mx-auto leading-relaxed">
                        Establish a robust master password to secure your developer identity.
                    </p>
                </header>

                {/* 3. THE FORM */}
                <form
                    id="form-reset-form"
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-5">
                        {/* PASSWORD FIELD */}
                        <Controller
                            name="password"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <div className="space-y-2">
                                    <label
                                        htmlFor="form-reset-form-password"
                                        className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1"
                                    >
                                        New Password
                                    </label>
                                    <div className="relative group">
                                        <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 group-focus-within:text-zinc-900 dark:group-focus-within:text-zinc-50 transition-colors" />
                                        <Input
                                            {...field}
                                            id="form-reset-form-password"
                                            type="password"
                                            placeholder="••••••••"
                                            className={`h-12 pl-11 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border-zinc-100 dark:border-zinc-800 focus:ring-4 focus:ring-primary/5 transition-all ${fieldState.invalid ? "border-destructive focus:ring-destructive/5" : ""
                                                }`}
                                        />
                                    </div>
                                    {fieldState.error && (
                                        <p className="text-[11px] font-medium text-destructive ml-1 animate-in fade-in slide-in-from-top-1">
                                            {fieldState.error.message}
                                        </p>
                                    )}
                                </div>
                            )}
                        />

                        {/* CONFIRM PASSWORD FIELD */}
                        <Controller
                            name="confirmPassword"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <div className="space-y-2">
                                    <label
                                        htmlFor="form-reset-form-confirmPassword"
                                        className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1"
                                    >
                                        Confirm Password
                                    </label>
                                    <Input
                                        {...field}
                                        id="form-reset-form-confirmPassword"
                                        type="password"
                                        placeholder="••••••••"
                                        className={`h-12 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border-zinc-100 dark:border-zinc-800 focus:ring-4 focus:ring-primary/5 transition-all ${fieldState.invalid ? "border-destructive focus:ring-destructive/5" : ""
                                            }`}
                                    />
                                    {fieldState.error && (
                                        <p className="text-[11px] font-medium text-destructive ml-1 animate-in fade-in slide-in-from-top-1">
                                            {fieldState.error.message}
                                        </p>
                                    )}
                                </div>
                            )}
                        />
                    </div>

                    {/* 4. SUBMIT ACTION */}
                    <div className="pt-2">
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full h-12 rounded-2xl font-bold text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all active:scale-[0.98]"
                        >
                            {isSubmitting ? (
                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            ) : null}
                            {isSubmitting ? "Updating System..." : "Reset Password"}
                        </Button>
                    </div>
                </form>

                {/* 5. FOOTER DECOR */}
                <footer className="text-center">
                    <p className="text-[10px] text-zinc-400 font-medium tracking-wide">
                        SECURE END-TO-END ENCRYPTION ACTIVE
                    </p>
                </footer>
            </div>
        </div>
    )
}