import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  try {
    const COOKIE_KEY = 'language';
    const res = NextResponse.next();

    if (!request.cookies.has(COOKIE_KEY)) {
      const { pathname } = request.nextUrl;
      const _pathname = pathname.split('/');
      const id = _pathname[3];

      if (pathname.startsWith('/vi')) {
        res.cookies.set(COOKIE_KEY, 'vi', {
          path: '/',
          maxAge: 60 * 60 * 24 * 30,
        });
      } else if (pathname.startsWith('/en')) {
        res.cookies.set(COOKIE_KEY, 'en', {
          path: '/',
          maxAge: 60 * 60 * 24 * 30,
        });
      } else {
        res.cookies.set(COOKIE_KEY, 'vi', {
          path: '/',
          maxAge: 60 * 60 * 24 * 30,
        });
      }

      const idRegex = /^[a-zA-Z0-9-_]+$/;
      if (!id || !idRegex.test(id)) {
        return NextResponse.rewrite(new URL('/404', request.url));
      }
    }

    return res;
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/:lang/:slug/:id*'],
};
