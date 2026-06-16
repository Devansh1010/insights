import { createResponse, StatusCode } from '@/lib/createResponse'
import { dbConnect } from '@/lib/db'
// import valkey from '@/lib/valkey'
import { VerifyUser } from '@/lib/verifyUser/userVerification'
import User from '@/models/user_models/user.model'
import { NextRequest } from 'next/server'

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

    //try to fetch from catchMemory
    // const cachedUser = await valkey.get(`user_profile_${userId}`)

    // if (cachedUser) {
    //   return createResponse(
    //     {
    //       success: true,
    //       message: 'User found (cached)',
    //       data: JSON.parse(cachedUser),
    //     },
    //     StatusCode.OK
    //   )
    // }

    const userInfo = await User.findOne({ _id: userId })
      .select('-password')
      .lean()

    if (!userInfo)
      return createResponse(
        {
          success: false,
          message: 'No User found',
          data: {},
        },
        StatusCode.NOT_FOUND
      )

    // await valkey.setEx(`user_profile_${userId}`, 600, JSON.stringify(userInfo))

    return createResponse(
      {
        success: true,
        message: 'User found',
        data: userInfo,
      },
      StatusCode.OK
    )
  } catch (error) {
    console.error('Error Finding User:', error)
    return createResponse(
      {
        success: false,
        message: 'Error Finding User',
        error: {
          code: '500',
          message: 'Internal Server Error',
        },
      },
      StatusCode.INTERNAL_ERROR
    )
  }
}

export async function PATCH(req: NextRequest) {
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

    const { email, username, profileImage } = await req.json()

    //validate the data

    const updatedUser = await User.findByIdAndUpdate(userId,
      {
        email,
        username,
        avatar: profileImage.url
      }
    )

    if (!updatedUser) {
      return createResponse(
        { success: false, message: "Not Fouond" },
        StatusCode.NOT_FOUND
      );
    }

    // await valkey.del(`user_profile_${userId}`)

    return createResponse(
      { success: true, message: "Updated Successfully" },
      StatusCode.OK
    );

  } catch (error) {
    console.error('Error Updating User Details:', error)
    return createResponse(
      {
        success: false,
        message: 'Error Updating User Details',
        error: {
          code: '500',
          message: 'Internal Server Error',
        },
      },
      StatusCode.INTERNAL_ERROR
    )
  }
}