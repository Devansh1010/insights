
import { getRecordImpact, recordImpact }
    from "@/domains/impact/services/record-impact";
import { VerifyUser } from "@/lib/verifyUser/userVerification";
import { createResponse, StatusCode } from "@/lib/createResponse";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {

    const { articleId, authorId, eventType, metadata } = await req.json();

    const auth = await VerifyUser();

    if (!auth.success || !auth.user?._id) {
        return createResponse(
            { success: false, message: "Unauthorized" },
            StatusCode.UNAUTHORIZED
        );
    }

    const actorId = auth.user._id;

    const res = await recordImpact({ actorId, articleId, authorId, eventType, metadata });

    return res;
}

export async function GET(req: NextRequest) {

    const { searchParams } = new URL(req.url);
    const articleId = searchParams.get('articleId')

    if (!articleId) {
        return createResponse(
            { success: false, message: "Article Id not found" },
            StatusCode.BAD_REQUEST
        );
    }

    const auth = await VerifyUser();

    if (!auth.success || !auth.user?._id) {
        return createResponse(
            { success: false, message: "Unauthorized" },
            StatusCode.UNAUTHORIZED
        );
    }

    const actorId = auth.user._id;

    const res = await getRecordImpact({ actorId, articleId });

    return res;
}