import { createResponse, StatusCode } from '@/lib/createResponse'
import { dbConnect } from '@/lib/db';
import { VerifyUser } from '@/lib/verifyUser/userVerification'
import Series from '@/models/series_models/series.model';

export async function GET() {
    try {
        const auth = await VerifyUser();

        if (!auth.success || !auth.user?._id) {
            return createResponse(
                { success: false, message: "Unauthorized" },
                StatusCode.UNAUTHORIZED
            );
        }

        const userId = auth.user._id;

        await dbConnect()

        const userSeries = await Series.find({ author: userId })
            .select('title _id slug coverImage desc createdAt tags')
            .populate('author', 'username avatar')
            .lean()

        if (!userSeries) {
            return createResponse(
                {
                    success: false,
                    message: "Didn't find any series",
                },
                StatusCode.OK
            )

        }

        return createResponse(
            {
                success: true,
                message: 'Find Some Series(s)',
                data: userSeries || []
            },
            StatusCode.OK
        )

    } catch (error) {
        console.error('Error Finding User Series:', error)
        return createResponse(
            {
                success: false,
                message: 'Error Finding User Series',
                error: {
                    code: '500',
                    message: 'Internal Server Error',
                },
            },
            StatusCode.INTERNAL_ERROR
        )
    }
}