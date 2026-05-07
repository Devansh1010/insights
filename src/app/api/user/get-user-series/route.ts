import { createResponse, StatusCode } from '@/lib/createResponse'
import { dbConnect } from '@/lib/db';
import { VerifyUser } from '@/lib/verifyUser/userVerification'
import Series from '@/models/series_models/series.model';
import mongoose from 'mongoose';

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


        const userSeries = await Series.aggregate([
            { $match: { author: new mongoose.Types.ObjectId(userId) } },

            {
                $lookup: {
                    from: 'users',
                    localField: 'author',
                    foreignField: '_id',
                    as: 'author'
                }
            },

            { $unwind: { path: '$author' } },

            {
                $project: {
                    slug: 1,
                    title: 1,
                    desc: 1,
                    coverImage: 1,
                    tags: 1,
                    views: 1,
                    createdAt: 1,
                    isPublished: 1,
                    author: {
                        _id: 1,
                        username: 1,
                        avatar: 1
                    }
                }
            }

        ])

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