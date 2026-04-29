
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './auth'


const PROTECTED_ROUTES = ['/user/profile', '/user/my-blogs', '/user/series'];
const AUTH_ROUTES = ['/auth/signin', '/auth/signup'];

// This function can be marked `async` if using `await` inside
export default async function proxy(request: NextRequest) {

    const { pathname } = request.nextUrl;

    // 1. Determine if the route needs a session check
    const isProtectedRoute = PROTECTED_ROUTES.includes(pathname);

    const writeBlogroutes = pathname.startsWith('/write-blog') || pathname.startsWith('/write-blogs');

    const isAuthRoute = AUTH_ROUTES.includes(pathname);

    const isRootRoute = pathname === "/";

    // 2. Early Exit: If it's not a route we care about, don't even call auth()
    if (!isProtectedRoute && !isAuthRoute && !isRootRoute && !writeBlogroutes) {
        return NextResponse.next();
    }

    // 3. Now call auth only once for relevant routes
    const session = await auth();

    // Logic: Root Redirection
    if (isRootRoute) {
        return NextResponse.redirect(new URL(session ? "/user/explore" : "/auth/signin", request.url));
    }

    if (writeBlogroutes && !session) {
        const signInUrl = new URL("/auth/signin", request.url);
        signInUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(signInUrl);
    }

    // Logic: Protect Private Routes
    if (isProtectedRoute && !session) {
        // Bonus: Add a callback URL so they return here after signing in
        const signInUrl = new URL("/auth/signin", request.url);
        signInUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(signInUrl);

    }

    // Logic: Prevent Logged-in users from seeing Auth pages
    if (isAuthRoute && session) {
        return NextResponse.redirect(new URL("/user/explore", request.url));
    }
}

export const config = {
    matcher: [
        '/user/:path*',
        // Exclude API routes, static files, image optimizations, and .png files
        '/((?!api|_next/static|_next/image|.*\\.png$).*)',
    ],
}