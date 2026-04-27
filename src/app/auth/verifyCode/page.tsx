'use client'

import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Button } from '@/components/ui/button'



export const verifyCodeSchema = z.object({
    username: z.string().min(1, 'Username is required'),
    verifyCode: z.string().min(4, 'Verification code is required'),
})

const VerifyCodePage: React.FC = () => {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<z.infer<typeof verifyCodeSchema>>({
        resolver: zodResolver(verifyCodeSchema),
        defaultValues: {
            username: '',
            verifyCode: '',
        },
    })

    const onSubmit = async (data: z.infer<typeof verifyCodeSchema>) => {
        setIsSubmitting(true)

        try {
            const res = await axios.post('/api/auth/verify-code', data) //! Change the path

            if (res.data.success) {
                toast.success('Code verified successfully!')
            } else {
                toast.error(res.data.message)
            }
            router.push('/user/explore')
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
            console.error('Verification error:', errorMessage)
            toast.error(errorMessage)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <main className="min-h-screen flex flex-col justify-center px-6 py-12 lg:px-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Verify Your Code
                </h1>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Enter the code sent to your registered email
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md p-8 shadow rounded-2xl border border-gray-100">
                <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="username"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-title">
                                        Username
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="form-rhf-demo-title"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter Username"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="verifyCode"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-title">
                                        Verification Code
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="form-rhf-demo-title"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter Verification Code"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                    </FieldGroup>

                    <Button
                        type="submit"
                        className="w-full mt-6"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Verifying...' : 'Verify Code'}
                    </Button>
                </form>
            </div>
        </main>
    )
}

export default VerifyCodePage