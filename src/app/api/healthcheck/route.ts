import { redis } from "@/lib/valkey";


export async function GET() {
    await redis.set("hello", "world");

    const value = await redis.get("hello");

    return Response.json({
        value,
    });
}