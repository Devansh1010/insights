// File: app/api/upload-auth/route.ts
import { createResponse, StatusCode } from "@/lib/createResponse";
import { VerifyUser } from "@/lib/verifyUser/userVerification";
import { getUploadAuthParams } from "@imagekit/next/server"

export async function GET() {
    // Your application logic to authenticate the user
    // For example, you can check if the user is logged in or has the necessary permissions
    const auth = await VerifyUser();

    if (!auth.success || !auth.user?._id) {
        return createResponse(
            { success: false, message: "Unauthorized" },
            StatusCode.UNAUTHORIZED
        );
    }
    // If the user is not authenticated, you can return an error response

    const { token, expire, signature } = getUploadAuthParams({
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string, // Never expose this on client side
        publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
        // expire: 30 * 60, // Optional, controls the expiry time of the token in seconds, maximum 1 hour in the future
        // token: "random-token", // Optional, a unique token for request
    })

    return Response.json({ token, expire, signature, publicKey: process.env.IMAGEKIT_PUBLIC_KEY })
}