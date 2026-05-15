import User from '@/models/user_models/user.model'
import { dbConnect } from '@/lib/db'
import { userValidation } from '@/lib/schemas/auth/signUpSchema'
import * as z from 'zod'
import { createResponse, StatusCode } from '@/lib/createResponse'

const usernameValidationSchema = z.object({
    username: userValidation,
})

export async function GET(request: Request) {
    await dbConnect()

    try {
        //get the entire url
        const { searchParams } = new URL(request.url)
        //get only username from entire url
        const queryParam = {
            username: searchParams.get('username'),
        }

        //zod validation
        const result = usernameValidationSchema.safeParse(queryParam)

        if (!result.success) {
            const usernameError = result.error.format().username?._errors || []

            return createResponse(
                { success: false, message: `usernameError ${usernameError}` },
                StatusCode.UNAUTHORIZED
            );
        }

        const { username } = result.data

        const existingUser = await User.findOne({ username: username })

        if (existingUser) {

            return createResponse(
                { success: false, message: 'Username not available' },
                StatusCode.UNAUTHORIZED
            );
        }

        return createResponse(
            { success: true, message: 'Username Available' },
            StatusCode.OK
        );

    } catch (error: unknown) {
        console.log('catch uername-abailable.ts: Error checking username ', error)

        return createResponse(
            { success: false, message: 'Error checking username availability.' },
            StatusCode.INTERNAL_ERROR
        );

    }
}