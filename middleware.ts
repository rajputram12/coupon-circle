import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/jwt';

const roleRoutes: Record<string, Array<'user' | 'provider' | 'admin'>> = {
  '/dashboard': ['user', 'provider', 'admin'],
  '/provider': ['provider'],
  '/billing': ['user', 'provider', 'admin'],
  '/admin': ['admin'],
  '/profile': ['user', 'provider', 'admin'],
};

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const target = Object.keys(roleRoutes).find((route) => path.startsWith(route));
  if (!target) return NextResponse.next();

  const token = request.cookies.get('couponclub_token')?.value;
  if (!token) return NextResponse.redirect(new URL('/login', request.url));

  try {
    const auth = verifyToken(token);
    const allowed = roleRoutes[target];
    if (!allowed.includes(auth.role)) return NextResponse.redirect(new URL('/dashboard', request.url));
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/provider/:path*', '/admin/:path*', '/billing/:path*', '/profile/:path*'],
};
