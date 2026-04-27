import api from "@/lib/authAxios"
import { toast } from "sonner"

interface SignUpData {
    username: string
    email: string
    password: string
}

export const signup = async (data: SignUpData) => {
    try {

        const res = await api.post("/sign-up", data)

        if (res.data.success) {
            toast.success("Signup successful")
        } else {
            toast.error(res.data.message || "Something went wrong")
        }

        return res.data

    } catch (error) {

        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred"

        const message = errorMessage || "Something went wrong during signup"

        toast.error(message)

        throw error
    }
}