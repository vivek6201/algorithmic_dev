import { NextResponse } from 'next/server';
import { nextAuthResult } from '@/lib/auth';
import { AdminRole } from '@repo/db';

// Define route patterns for better performance
export const PUBLIC_ROUTES = new Set<string>([
  '/',
  '/api/auth/signin',
  '/api/auth/signout',
  '/api/auth/callback',
  '/api/auth/csrf',
  '/api/auth/session',
  '/api/auth/providers',
  '/api/auth/error',
]);

export const SUPER_ADMIN_ROUTES: readonly string[] = ['/dashboard/actions/list-admins'] as const;

export const ADMIN_ROUTES: readonly string[] = [
  '/dashboard/blogs',
  '/dashboard/jobs',
  '/dashboard/users',
  '/dashboard/tutorials',
  '/dashboard/actions/',
] as const;

const { auth } = nextAuthResult;

// Helper: Check if path starts with any route
const matchesAnyRoute = (pathname: string, routes: readonly string[]): boolean => {
  return routes.some((route) => pathname.startsWith(route));
};

// Helper: Redirect response
const createRedirect = (url: string, origin: string): NextResponse => {
  return NextResponse.redirect(new URL(url, origin));
};

// Helper: JSON error response
const createJsonError = (message: string, status: number = 403): NextResponse => {
  return new NextResponse(JSON.stringify({ error: message }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
};

// Helper: Check if user has a required role
const hasRequiredRole = (userRole: string | undefined, allowedRoles: AdminRole[]): boolean => {
  return userRole ? allowedRoles.includes(userRole as AdminRole) : false;
};

export default auth((req) => {
  const { pathname, origin } = req.nextUrl;
  const isAuthenticated = !!req.auth;
  const userRole = req.auth?.user?.role;

  // Always allow NextAuth API routes
  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // Public routes logic
  if (PUBLIC_ROUTES.has(pathname)) {
    if (isAuthenticated) {
      return createRedirect('/dashboard', origin);
    }
    return NextResponse.next();
  }

  // Determine if the route is protected
  const isProtectedRoute =
    pathname.startsWith('/dashboard') ||
    (pathname.startsWith('/api') && !pathname.startsWith('/api/auth'));

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  // Unauthenticated access to protected routes
  if (!isAuthenticated) {
    if (pathname.startsWith('/api/')) {
      return createJsonError('Authentication required', 401);
    }
    const expired = req.cookies.has('next-auth.admin-token') ? '?expired=true' : '';
    return createRedirect(`/${expired}`, origin);
  }

  // Role-based access control
  const roleAccessChecks = [
    { match: matchesAnyRoute(pathname, SUPER_ADMIN_ROUTES), roles: ['SuperAdmin'] as AdminRole[] },
    {
      match: matchesAnyRoute(pathname, ADMIN_ROUTES),
      roles: ['Admin', 'SuperAdmin'] as AdminRole[],
    },
    { match: pathname.startsWith('/api/super-admin'), roles: ['SuperAdmin'] as AdminRole[] },
    { match: pathname.startsWith('/api/admin'), roles: ['Admin', 'SuperAdmin'] as AdminRole[] },
  ];

  for (const { match, roles } of roleAccessChecks) {
    if (match && !hasRequiredRole(userRole, roles)) {
      return pathname.startsWith('/api/')
        ? createJsonError('Insufficient permissions')
        : createRedirect('/dashboard?error=insufficient-permissions', origin);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Exclude static assets and internal Next.js files
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
