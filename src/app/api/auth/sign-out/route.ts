import { createResponse, StatusCode } from '@/lib/createResponse'
import { VerifyUser } from '@/lib/verifyUser/userVerification'
import { LogoutUser } from '@/lib/verifyUser/userLogout'

export async function POST() {
    try {
        const auth = await VerifyUser()

        if (!auth.success) {
            return auth.response
        }

        const data = auth.user
        if (!data) {
            return createResponse({ success: false, message: 'Unauthorized' }, StatusCode.UNAUTHORIZED)
        }

        LogoutUser()

        return createResponse(
            { success: true, message: 'Logged out successfully' },
            StatusCode.OK
        )

    } catch (error) {
    console.error('Error Finding User:', error)

    return createResponse(
        {
            success: false,
            message: 'Error Logging Out User',
            error: {
                code: '500',
                message: 'Internal Server Error',
            },
        },
        StatusCode.INTERNAL_ERROR
    )
}
}