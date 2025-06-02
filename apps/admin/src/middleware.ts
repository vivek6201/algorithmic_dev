import { nextAuthResult } from '@/lib/auth';

const { auth } = nextAuthResult;

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname.startsWith('/dashboard')) {
    const newUrl = new URL('/', req.nextUrl.origin);
    return Response.redirect(newUrl);
  }

  if (
    req.auth?.user?.role !== 'SuperAdmin' &&
    req.nextUrl.pathname === '/dashboard/actions/list-admins'
  ) {
    const newUrl = new URL('/dashboard', req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});
