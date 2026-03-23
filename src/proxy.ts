
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './auth'



// This function can be marked `async` if using `await` inside
export default async function proxy(request: NextRequest) {
    const session = await auth();

    const { pathname } = request.nextUrl;

    const isAuthRoute = pathname.startsWith("/auth");
    const isProtectedRoute = pathname.startsWith("/user");
    const isRootRoute = pathname === "/";

   if (isRootRoute) {
        if (session) {
            return NextResponse.redirect(new URL("/user/explore", request.url));
        }
        return NextResponse.redirect(new URL("/auth/signin", request.url));
    }

    // If they are trying to access a protected route but HAVE NO session
    if (isProtectedRoute && !session) {
        return NextResponse.redirect(new URL("/auth/signin", request.url));
    }

    // If they are logged in but trying to go to /auth/signin or /auth/signup
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