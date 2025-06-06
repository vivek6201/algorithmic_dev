import { nextAuthResult } from '@/lib/auth';

const { auth } = nextAuthResult;

export default auth((req) => {
  if (req.nextUrl.pathname.startsWith('/profile')) {
    if (!req.auth) {
      const newUrl = new URL('/login', req.nextUrl.origin);
      return Response.redirect(newUrl);
    }
  }
});
