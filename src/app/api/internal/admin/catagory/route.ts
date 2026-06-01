import { verifyAdmin } from "@/lib/admin-auth";
import { createResponse, StatusCode } from "@/lib/createResponse";
import { dbConnect } from "@/lib/db";
import { categorySchema } from "@/lib/schemas/catagories/catagory-create";
import Category from "@/models/catagories_models/catagories.model";
import { NextRequest } from "next/server";
import z from "zod";

export async function POST(req: NextRequest) {

    try {

        const isAdmin =
            verifyAdmin(req)

        if (!isAdmin) {
            return createResponse(
                {
                    success: false,
                    message: "Unauthorized",
                },
                StatusCode.UNAUTHORIZED
            )
        }

        const body = await req.json()

        // NORMALIZE TO ARRAY
        const payload =
            Array.isArray(body)
                ? body
                : [body]

        // VALIDATION
        const validatedData = z.
            array(categorySchema)
            .parse(payload)

        await dbConnect()

        const categories =
            await Category.create(validatedData)


        if (!categories) {
            return createResponse(
                {
                    success: true,
                    message: 'Data not Saved'

                },
                StatusCode.CONFLICT
            )
        }

        return createResponse(
            {
                success: true,
                message:
                    categories.length > 1
                        ? "Categories saved successfully"
                        : "Category saved successfully",

                data: categories,
            },
            StatusCode.CREATED
        )

    } catch (error: unknown) {

        if (error instanceof z.ZodError) {

            return createResponse(
                {
                    success: false,
                    message: "Validation failed",
                    error: error.errors,
                },
                StatusCode.BAD_REQUEST
            )
        }

        console.error("CATEGORY CREATE ERROR:", error);

        return createResponse(
            {
                success: false,
                message: "Internal Server Error",
                error: error
            },
            StatusCode.INTERNAL_ERROR
        );
    }

}

export async function GET() {
    try {

        await dbConnect()

        // FETCH DATA
        const categories =
            await Category.find({})
                .sort({
                    createdAt: -1,
                })
                .lean()


        // TOTAL COUNT
        const total =
            await Category.countDocuments()

        return createResponse(
            {
                success: true,
                message: 'Tags Fetched',
                data: {
                    categories,
                    totalTags: total
                }
            },
            StatusCode.OK
        )

    } catch (error: unknown) {

        console.error(error)

        if (error instanceof Error) {

            return createResponse(
                {
                    success: false,
                    message: error.message,
                },
                StatusCode.INTERNAL_ERROR
            )
        }

        return createResponse(
            {
                success: false,
                message:
                    "Internal Server Error",
            },
            StatusCode.INTERNAL_ERROR
        )
    }
}
