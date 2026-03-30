import { createResponse, StatusCode } from "@/lib/createResponse";
import { dbConnect } from "@/lib/db";
import { VerifyUser } from "@/lib/verifyUser/userVerification";
import Series from "@/models/series_models/series.model";
import { NextRequest } from "next/server";

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
        const { id } = await params

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

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const auth = await VerifyUser();

        if (!auth.success || !auth.user?._id) {
            return createResponse(
                { success: false, message: "Unauthorized" },
                StatusCode.UNAUTHORIZED
            );
        }

        // const { searchParams } = new URL(req.url);
        // const id = searchParams.get("id");

        const { id } = await params

        await dbConnect()

        const deletedSeries = await Series.findByIdAndDelete(id)

        if (!deletedSeries) {
            return createResponse(
                { success: false, message: "Series Not deleted" },
                StatusCode.CONFLICT
            );
        }

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

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const auth = await VerifyUser();

        if (!auth.success || !auth.user?._id) {
            return createResponse(
                { success: false, message: "Unauthorized" },
                StatusCode.UNAUTHORIZED
            );
        }

        const { id } = await params

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

