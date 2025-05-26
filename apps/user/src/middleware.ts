import { NextRequest, NextResponse } from 'next/server';
import { nextAuthResult } from './lib/auth';

export async function middleware(request: NextRequest) {
  const session = await nextAuthResult.auth();

  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith('/profile')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*'],
};
