import { redis } from "@/lib/valkey";


export async function rateLimit(
    key: string,
    limit: number,
    windowSeconds: number
) {
    const count = await redis.incr(key);

    if (count === 1) {
        await redis.expire(key, windowSeconds);
    }

    return {
        allowed: count <= limit,
        remaining: Math.max(limit - count, 0),
    };
}