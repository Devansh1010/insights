
import { Schema, model, models } from 'mongoose'

export interface IUser {
  _id?: Schema.Types.ObjectId,
  username: string,
  email: string,
  password: string,
  avatar?: string | null,
  resetToken?: string,
  resetTokenExpiry?: Date,
  isVerified: boolean,
  verifyCode?: string,
  verifyExpiry?: Date
  followers: Schema.Types.ObjectId[]
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      minlength: [2, 'Minimum 2 Character required in Username'],
      maxlength: [30, 'Maximum 30 characters allowed'],
      required: [true, 'Username Required'],
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: [true, 'Email Required'],
      lowercase: true,
      unique: true,
    },

    password: {
      type: String,
      required: [true, 'Password Required'],
      select: false,
    },

    avatar: {
      type: String,
      default: null,
    },

    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],

    resetToken: {
      type: String,
      select: false,
    },
    
    resetTokenExpiry: {
      type: Date,
      select: false,
    },

    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },

    verifyCode: {
      type: String,
      select: false,
    },

    verifyExpiry: {
      type: Date,
      select: false,
    },
  },
  { timestamps: true }
)

const User = models.User || model<IUser>('User', userSchema)

export default User