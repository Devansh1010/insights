import { auth } from "@/auth"

export async function VerifyUser() {
  const session = await auth()

  if (!session || !session.user) {
    return {
      success: false,
      user: null
    }
  }

  return {
    success: true,
    user: session.user
  }
}