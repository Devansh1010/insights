
import { NextRequest } from "next/server"

export function verifyAdmin(req: NextRequest) {

    const adminKey =
        req.headers.get("x-admin-key")

    if (!adminKey) {
        return false
    }

    return (
        adminKey ===
        process.env.ADMIN_SECRET_KEY
    )
}