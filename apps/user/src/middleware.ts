import { NextResponse } from 'next/server';
import { nextAuthResult } from '@/lib/auth';

const { auth } = nextAuthResult;

// Helper: Redirect
const createRedirect = (url: string, origin: string): NextResponse => {
  return NextResponse.redirect(new URL(url, origin));
};

// Helper: JSON error
const createJsonError = (message: string, status = 403): NextResponse => {
  return new NextResponse(JSON.stringify({ error: message }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
};

export default auth((req) => {
  const { pathname, origin } = req.nextUrl;
  const isAuthenticated = !!req.auth;

  // Always allow NextAuth API routes
  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // Define protected routes
  const isProtectedPage = pathname.startsWith('/profile');
  const isProtectedApi =
    pathname.startsWith('/api/profile') || pathname.startsWith('/api/bookmarks');

  if (!isProtectedPage && !isProtectedApi) {
    return NextResponse.next(); // Allow all other public routes
  }

  // Handle unauthenticated API access
  if (!isAuthenticated && isProtectedApi) {
    return createJsonError('Authentication required', 401);
  }

  // Handle unauthenticated page access
  if (!isAuthenticated && isProtectedPage) {
    return createRedirect('/login', origin);
  }

  return NextResponse.next(); // Allow authenticated access
});

export const config = {
  matcher: [
    // Exclude static files and internal routes
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
