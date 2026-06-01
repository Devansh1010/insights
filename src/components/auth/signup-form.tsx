'use client'
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { signUpSchema } from "@/lib/schemas/auth/signUpSchema"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { signup } from "@/utils/signup"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import axios from "axios"
import { Loader2 } from "lucide-react"
import { useDebounceCallback } from 'usehooks-ts'
import { signIn } from "next-auth/react"


export function SignupForm() {

  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState<string>('')
  const [usernameMessage, setUsernameMessage] = useState<string>('')
  const [isCheckUsername, setIsCheckUsername] = useState<boolean>(false)
  const debounced = useDebounceCallback(setUsername, 300)

  //React Hook Form setup with Zod validation
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  })

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (username) {
        setIsCheckUsername(true)
        try {
          const responce = await axios.get(`/api/auth/check-username-unique?username=${username}`);
          console.log(responce)
          setUsernameMessage(responce.data.message)
        } catch (error: unknown) {
          // we are not using any in ts for error handling so we need to cast error to any to access response data
          const axiosError = error ? error as { response?: { data?: { message?: string } } } : null;
          setUsernameMessage(
            axiosError?.response?.data?.message || "Error Checking username"
          )
        } finally {
          setIsCheckUsername(false);
        }
      }
    }
    checkUsernameUnique();
  }, [username])

  const router = useRouter();

  // Form submission handler
  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setLoading(true)
    try {
      const res = await signup(data)
      if (res.success) {
        form.reset()
        router.push("/auth/verifyCode")
      }
    } catch (error) {
      console.error("Signup error:", error)
    } finally {
      setLoading(false)
    }

  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-full min-w-md rounded-xl bg-background shadow-sm">

        <form id="form-rhf-signup" onSubmit={form.handleSubmit(onSubmit)} >
          <FieldGroup className="space-y-2">
            <div className="text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create your account
              </h1>
              <p className="text-sm text-muted-foreground">
                Fill in the form below to create your account
              </p>
            </div>
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
                    id="username"
                    aria-invalid={fieldState.invalid}
                    onChange={(e) => {
                      field.onChange(e)
                      debounced(e.target.value)
                    }}
                    placeholder="John Doe"
                    autoComplete="off"
                    className="h-10"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                  {isCheckUsername && <Loader2 className="animate-spin" />}
                  <p className={`text-sm ${usernameMessage === "Username Available" ? 'text-green-600' : 'text-red-600'}`}>
                    {usernameMessage}
                  </p>
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Email
                  </FieldLabel>
                  <Input
                    {...field}
                    id="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="john@example.com"
                    autoComplete="off"
                    className="h-10"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="********"
                    autoComplete="off"
                    className="h-10"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Field orientation="horizontal">
              <Button type="submit" className="w-full">
                Create Account
              </Button>
            </Field>
            <FieldSeparator>Or continue with</FieldSeparator>
            <Field>
              <Button 
              variant="outline" 
              type="button" 
              disabled={loading} 
              onClick={() => signIn("github")}
                >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                    fill="currentColor"
                  />
                </svg>
                Sign up with GitHub
              </Button>
              <FieldDescription className="px-6 text-center">
                Already have an account? <Link href={'/auth/signin'}> Sign in </Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>

      </div>
    </div>

  )
}



