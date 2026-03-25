import { createResponse, StatusCode } from "@/lib/createResponse";
import { dbConnect } from "@/lib/db";
import { VerifyUser } from "@/lib/verifyUser/userVerification";
import Series from "@/models/series_models/series.model";
import { NextRequest } from "next/server";
import valkey from '@/lib/valkey'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const auth = await VerifyUser();

        if (!auth.success || !auth.user?._id) {
            return createResponse(
                { success: false, message: "Unauthorized" },
                StatusCode.UNAUTHORIZED
            );
        }

        const userId = auth.user._id;
        const id = params.id;

        //validate the Id

        await dbConnect()

        const series = await Series.findOne({
            _id: id,
            author: userId // for safety check
        })

        if (!series) {
            return createResponse(
                { success: false, message: "Series Not Found" },
                StatusCode.NOT_FOUND
            );
        }

        return createResponse(
            {
                success: true,
                message: "Found Series",
                data: series
            },
            StatusCode.OK
        );

    } catch (error) {
        console.error("Error while getting Series:", error)

        return createResponse(
            {
                success: false,
                message: "Internal Server Error",
            },
            StatusCode.INTERNAL_ERROR
        )
    }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const auth = await VerifyUser();

        if (!auth.success || !auth.user?._id) {
            return createResponse(
                { success: false, message: "Unauthorized" },
                StatusCode.UNAUTHORIZED
            );
        }

        const id = params.id

        const { title, desc, blogs, coverImage, tags, isPublished } = await req.json()

        let isPublishAt: Date | null = null

        if (isPublished) {
            isPublishAt = new Date()
        }
        await dbConnect()

        const updatedSeries = await Series.findByIdAndUpdate(id, {
            title,
            desc,
            blogs,
            coverImage,
            tags,
            isPublished,
            publishedAt: isPublishAt
        })

        if (!updatedSeries) {
            return createResponse(
                { success: false, message: "Series Not Updated" },
                StatusCode.CONFLICT
            );
        }

        await valkey.del('all-series')

        return createResponse(
            {
                success: true,
                message: "Series Updated Successfully",
            },
            StatusCode.OK
        );

    } catch (error) {
        console.error("Error while updating Series:", error)

        return createResponse(
            {
                success: false,
                message: "Internal Server Error",
            },
            StatusCode.INTERNAL_ERROR
        )
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const auth = await VerifyUser();

        if (!auth.success || !auth.user?._id) {
            return createResponse(
                { success: false, message: "Unauthorized" },
                StatusCode.UNAUTHORIZED
            );
        }

        const id = params.id

        await dbConnect()

        const deletedSeries = await Series.findByIdAndDelete(id)

        if (!deletedSeries) {
            return createResponse(
                { success: false, message: "Series Not deleted" },
                StatusCode.CONFLICT
            );
        }

        await valkey.del('all-series')

        return createResponse(
            {
                success: true,
                message: "Series Deleted Successfully",
            },
            StatusCode.OK
        );

    } catch (error) {
        console.error("Error while deleting Series:", error)

        return createResponse(
            {
                success: false,
                message: "Internal Server Error",
            },
            StatusCode.INTERNAL_ERROR
        )
    }
}