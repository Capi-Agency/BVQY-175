// middleware.ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // Clone URL và xóa _rsc nếu có
  const url = request.nextUrl.clone();
  const hasRscParam = url.searchParams.has('_rsc');

  if (hasRscParam) {
    url.searchParams.delete('_rsc');

    // Tạo request mới với URL đã normalize
    const modifiedRequest = new Request(url, request);

    // Chuyển qua intl middleware với request đã sửa
    return intlMiddleware(modifiedRequest as NextRequest);
  }

  // Không có _rsc, chạy bình thường
  return intlMiddleware(request);
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
