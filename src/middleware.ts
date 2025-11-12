import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  try {
    const COOKIE_KEY = 'language';
    const res = NextResponse.next();

    if (!request.cookies.has(COOKIE_KEY)) {
      const { pathname } = request.nextUrl;
      const _pathname = pathname.split('/');
      const lang = _pathname[1];
      const slug = _pathname[2];
      const id = _pathname[3];

      // Ưu tiên lấy ngôn ngữ từ slug nếu có hậu tố -en hoặc -vi
      let languageToSet = '';
      if (slug) {
        const slugParts = slug.split('-');
        const lastPart = slugParts[slugParts.length - 1];
        if (lastPart === 'en' || lastPart === 'vi') {
          languageToSet = lastPart;
        }
      }
      // Nếu không có trong slug, lấy theo lang trên path
      if (!languageToSet) {
        if (lang === 'en') languageToSet = 'en';
        else languageToSet = 'vi';
      }

      res.cookies.set(COOKIE_KEY, languageToSet, {
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
      });

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
