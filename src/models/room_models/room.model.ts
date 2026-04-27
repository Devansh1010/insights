import { models, Schema, model } from "mongoose";

export enum UserRole {
    LEADER = 'leader',
    MEMBER = 'member',
}

interface Member {
    userId: Schema.Types.ObjectId,
    role: UserRole,
    joinedAt: Date
}

interface RoomBlog {
    blogId: Schema.Types.ObjectId
    addedBy: Schema.Types.ObjectId
    addedAt: Date
}

export enum JoinRequestStatus {
    PENDING = "pending",
    ACCEPTED = "accepted",
    REJECTED = "rejected"
}

interface JoinRequest {
    userId: Schema.Types.ObjectId
    requestedAt: Date
    status: JoinRequestStatus
    handledBy?: Schema.Types.ObjectId
    handledAt?: Date
}

export interface IRoom {
    _id?: Schema.Types.ObjectId

    name: string
    description?: string

    createdBy: Schema.Types.ObjectId

    members: Member[]

    blogs: RoomBlog[]

    isPrivate: boolean

    joinRequests: JoinRequest[]

    createdAt: Date
    updatedAt: Date
}

const roomSchema = new Schema<IRoom>(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            default: ""
        },

        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        members: [
            {
                userId: {
                    type: Schema.Types.ObjectId,
                    ref: "User",
                    required: true
                },

                role: {
                    type: String,
                    enum: Object.values(UserRole),
                    default: UserRole.MEMBER
                },

                joinedAt: {
                    type: Date,
                    default: Date.now
                }
            }
        ],

        blogs: [
            {
                blogId: {
                    type: Schema.Types.ObjectId,
                    ref: "Blog",
                    required: true
                },

                addedBy: {
                    type: Schema.Types.ObjectId,
                    ref: "User",
                    required: true
                },

                addedAt: {
                    type: Date,
                    default: Date.now
                }
            }
        ],

        joinRequests: [
            {
                userId: {
                    type: Schema.Types.ObjectId,
                    ref: "User",
                    required: true
                },

                requestedAt: {
                    type: Date,
                    default: Date.now
                },

                status: {
                    type: String,
                    enum: Object.values(JoinRequestStatus),
                    default: JoinRequestStatus.PENDING
                },

                handledBy: {
                    type: Schema.Types.ObjectId,
                    ref: "User"
                },

                handledAt: Date
            }
        ],

    isPrivate: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
)

const Room = models.Room || model<IRoom>('Room', roomSchema)

export default Room