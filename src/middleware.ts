import { NextResponse, type NextRequest } from 'next/server';
import { betterFetch } from '@better-fetch/fetch';
import type { Session } from '@/server/auth';
import { domain } from '@/lib/constants';

const authRoutes = ['/login', '/signup'];
const passwordRoutes = ['/reset-password', 'verify-email', '/forgot-password'];
const openRoutes = ['/terms', '/privacy-policy'];

export default async function authMiddleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;

  const isAuthRoute = authRoutes.includes(pathName);
  const isPasswordRoute = passwordRoutes.includes(pathName);
  const isOpenRoute = openRoutes.includes(pathName);

  const { data: session } = await betterFetch<Session>('/api/auth/get-session', {
    baseURL: domain,
    headers: {
      cookie: request.headers.get('cookie') ?? '',
    },
  });

  if (!session || !session.user) {
    if (isAuthRoute || isPasswordRoute || isOpenRoute) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAuthRoute || isPasswordRoute || isOpenRoute) {
    return NextResponse.redirect(new URL('/chat', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|assets|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|$).*)'],
};
