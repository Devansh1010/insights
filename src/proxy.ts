
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './auth'
import path from 'path'


const AUTH_ROUTES = ['/auth/signin', '/auth/signup']
const PROTECTED_ROUTES = ['/user/my-blogs', '/user/series', '/user/profile']

const RESTRICTED_ROUTES = '/write-blog'
// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {

  const session = await auth()

  const { pathname } = request.nextUrl

  console.log(pathname)

  if (pathname === '/' && session) {
    return NextResponse.redirect(new URL('/user/explore', request.url))
  }

  if (AUTH_ROUTES.includes(pathname) && session) {
    return NextResponse.redirect(new URL('/user/explore', request.url))
  }

  if (PROTECTED_ROUTES.includes(pathname) && !session) {
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }

  if (pathname.startsWith(RESTRICTED_ROUTES) && !session) {
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/user/:path*',
    '/auth/:path*',
    '/write-blog/:path*',
  ],
}