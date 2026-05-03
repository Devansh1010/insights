
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './auth'


const PROTECTED_ROUTES = ['/user/profile', '/user/my-blogs', '/user/series'];
const AUTH_ROUTES = ['/auth/signin', '/auth/signup'];

export default async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const session = await auth();

    // Root route
    if (pathname === "/") {
        return NextResponse.redirect(
            new URL(session ? "/user/explore" : "/auth/signin", request.url)
        );
    }

    const isProtectedRoute = PROTECTED_ROUTES.some(route =>
        pathname.startsWith(route)
    );

    const isWriteRoute = pathname.startsWith("/write-blog");

    const isAuthRoute = AUTH_ROUTES.some(route =>
        pathname.startsWith(route)
    );

    // Protect private routes
    if ((isProtectedRoute || isWriteRoute) && !session) {
        const signInUrl = new URL("/auth/signin", request.url);
        signInUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(signInUrl);
    }

    // Prevent logged-in users from auth pages
    if (isAuthRoute && session) {
        return NextResponse.redirect(new URL("/user/explore", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/user/:path*',
        // Exclude API routes, static files, image optimizations, and .png files
        '/((?!api|_next/static|_next/image|.*\\.png$).*)',
    ],
}