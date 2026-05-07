import { createResponse, StatusCode } from "@/lib/createResponse";
import { dbConnect } from "@/lib/db";
import { VerifyUser } from "@/lib/verifyUser/userVerification";
import Series from "@/models/series_models/series.model";
import { NextRequest } from "next/dist/server/web/spec-extension/request";

export async function GET(req: NextRequest) {
    try {
        const auth = await VerifyUser();

        if (!auth.success || !auth.user?._id) {
            return createResponse(
                { success: false, message: "Unauthorized" },
                StatusCode.UNAUTHORIZED
            );
        }

        const userId = auth.user._id;

        const { searchParams } = new URL(req.url);
        const slug = searchParams.get('slug');


        //validate the Id
        if (!slug || typeof slug !== 'string') {
            return createResponse(
                { success: false, message: "Invalid Series ID" },
                StatusCode.BAD_REQUEST
            );
        }

        await dbConnect()

        const series = await Series.findOne({
            slug: slug,
            author: userId
        })
            .select('title desc coverImage tags isPublished')
            .lean()

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