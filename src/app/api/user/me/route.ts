import { createResponse, StatusCode } from '@/lib/createResponse'
import { dbConnect } from '@/lib/db'
import valkey from '@/lib/valkey'
import { VerifyUser } from '@/lib/verifyUser/userVerification'
import User from '@/models/user_models/user.model'

export async function GET() {
  try {
    const auth = await VerifyUser()

    if (!auth.success) {
      return createResponse(
        { success: false, message: "Unauthorized" },
        StatusCode.UNAUTHORIZED
      )
    }

    await dbConnect()

    let userId = null
    //User can be either from session or from database based on email, this is to handle the case when user is not fully logged in but has email in session
    if (auth.user?._id) {
      userId = auth.user._id.toString()
    } else {
      
      const user = await User.findOne(
        { email: auth.user?.email },
      ).select("_id")

      if (!user) {
        return createResponse(
          { success: false, message: "User not found" },
          StatusCode.NOT_FOUND
        )
      }

      userId = user._id.toString()
    }

    //try to fetch from catchMemory
    const cachedUser = await valkey.get(`user_profile_${userId}`)

    if (cachedUser) {
      return createResponse(
        {
          success: true,
          message: 'User found (cached)',
          data: JSON.parse(cachedUser),
        },
        StatusCode.OK
      )
    }

    const userInfo = await User.findOne({ _id: userId }).select('-password')

    if (!userInfo)
      return createResponse(
        {
          success: false,
          message: 'No User found',
          data: {},
        },
        StatusCode.NOT_FOUND
      )

    await valkey.setEx(`user_profile_${userId}`, 600, JSON.stringify(userInfo))

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