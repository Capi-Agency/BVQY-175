// middleware.ts
import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';
import { checkRoute } from './lib/seo/route-check';
import { GONE, legacyTarget } from './lib/seo/legacy';

const intlMiddleware = createMiddleware(routing);

// Public origin for redirects. Not derived from the request: behind easypanel -> proxy_nginx the
// request arrives as http (X-Forwarded-Proto is overwritten with $scheme=http), which would
// redirect https visitors to http.
const PUBLIC_ORIGIN = (() => {
  for (const u of [process.env.SITE_URL, process.env.NEXT_PUBLIC_API_URL]) {
    try { if (u) return new URL(u).origin; } catch { /* try next */ }
  }
  return undefined;
})();

const permanentRedirect = (path: string, req: NextRequest) =>
  NextResponse.redirect(new URL(path, PUBLIC_ORIGIN ?? req.url), 308);

export default async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  if (pathname === `/${routing.defaultLocale}` || pathname.startsWith(`/${routing.defaultLocale}/`)) {
    // Draft mode (Live Preview): unpublished pages/posts are 403 for the public role and would be
    // answered 404 here; let the page render, it reads the CMS with the preview token.
    if (req.cookies.has('__prerender_bypass')) return intlMiddleware(req);
    const check = await checkRoute(pathname, req.headers.get('x-cache-gen'));
    if (check.kind === 'redirect') return permanentRedirect(check.to + search, req);
    if (check.kind === 'notfound') {
      // Render the regular not-found page, but with a real 404 status (was: 200 + noindex).
      return NextResponse.rewrite(new URL(`/${routing.defaultLocale}/__not-found__`, req.url), { status: 404 });
    }
    return intlMiddleware(req);
  }

  // Old WordPress URLs: 301 to the new page, or 410 when the content was not carried over.
  const legacy = legacyTarget(pathname);
  if (legacy === GONE) {
    return NextResponse.rewrite(new URL(`/${routing.defaultLocale}/__not-found__`, req.url), { status: 410 });
  }
  if (legacy) return NextResponse.redirect(new URL(legacy, PUBLIC_ORIGIN ?? req.url), 301);

  // Paths without locale prefix ("/", "/lien-he", "/en"...): next-intl answers 307 (temporary).
  // There is a single locale, so the move is permanent -> 308, keeps link equity.
  const res = intlMiddleware(req);
  const location = res.headers.get('location');
  if (res.status === 307 && location) {
    const target = new URL(location, req.url);
    return permanentRedirect(target.pathname + target.search, req);
  }
  return res;
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
