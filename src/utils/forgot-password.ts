import api from "@/lib/authAxios"

export const forgotPassword = async (email: string) => {
    try {

        const res = await api.post('/forgot-password', { email })

        if (res.status === 200) {
            return res.data
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred."
        console.error("Error forgot password:", errorMessage)
        throw new Error(errorMessage)
    }
}
