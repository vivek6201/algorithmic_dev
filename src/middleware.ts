// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from './lib/auth';

export async function middleware(request: NextRequest) {
  const session = await auth();

  const isAdmin = session?.user?.role === 'Admin';

  if (request.nextUrl.pathname.startsWith('/admin') && !isAdmin) {
    return NextResponse.redirect(new URL('/not-found', request.url));
  }

  return NextResponse.next();
}

// Apply only to admin routes
export const config = {
  matcher: ['/admin/:path*'],
};
