import { createResponse, StatusCode } from "@/lib/createResponse";
import { dbConnect } from "@/lib/db";
import User from "@/models/user_models/user.model";
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs"; 

export async function POST(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const token = searchParams.get('token');
        const { password } = await req.json();

        // 1. Validation: Check for missing fields
        if (!token || !password) {
            return createResponse(
                { success: false, message: "Missing token or password" },
                StatusCode.BAD_REQUEST
            );
        }

        if (password.length < 8) {
            return createResponse(
                { success: false, message: "Password must be at least 8 characters" },
                StatusCode.BAD_REQUEST
            );
        }

        // 2. Token Verification: Check Valkey

        const userEmailFromToken = await User.findOne({ resetToken: token, resetTokenExpiry: { $gt: new Date() } });

        if (!userEmailFromToken) {
            return createResponse(
                { success: false, message: "Invalid or expired token" },
                StatusCode.UNAUTHORIZED
            );
        }

        await dbConnect();

        // 3. Security: Hash the new password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4. Update Admin by Email (found in Valkey)
        const updatedUserPassword = await User.findOneAndUpdate(
            { email: userEmailFromToken },

            {
                password: hashedPassword,
                resetToken: null,
                resetTokenExpiry: null,
            },

            { new: true }
        );

        if (!updatedUserPassword) {
            return createResponse(
                { success: false, message: "User account not found" },
                StatusCode.NOT_FOUND
            );
        }
        return createResponse(
            { success: true, message: "Password updated successfully" },
            StatusCode.OK
        );

    } catch (error) {
        console.error("RESET_PASSWORD_ERROR:", error);
        return createResponse(
            { success: false, message: "An unexpected error occurred" },
            StatusCode.INTERNAL_ERROR
        );
    }
}