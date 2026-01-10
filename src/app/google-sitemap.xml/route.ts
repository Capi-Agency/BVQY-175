import { routing } from '@/src/i18n/routing';
import { fnGetAllPageSlug } from '@/src/services/page'; // đường dẫn đúng của bạn
import { Locale } from 'next-intl';

export async function GET() {
  const siteUrl = process.env.SITE_URL;

  // Lấy tất cả slug động
  const pages = await fnGetAllPageSlug();

  // Hàm escape XML để tránh lỗi ký tự đặc biệt trong URL
  const escapeXml = (unsafe: string) => {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  };

  // Tạo XML URL cho từng slug
  const urls = pages
    .map((page: any) => {
      // item có thể là { slug: string }
      const { slug, language } = page
      if (!slug || !language) return '';
      return `
      <url>
        <loc>${siteUrl}/${escapeXml(language)}/${escapeXml(slug)}</loc>
        <changefreq>daily</changefreq>
        <priority>0.7</priority>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
    `;
    })
    .join('');

  // Thêm trang chủ (home)
  const homeUrls = routing.locales
    .map((locale: Locale) => {
      return `
    <url>
      <loc>${siteUrl}/${locale}</loc>
      <changefreq>hourly</changefreq>
      <priority>1.0</priority>
      <lastmod>${new Date().toISOString()}</lastmod>
    </url>`;
    })
    .join('');


  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
    >
      ${homeUrls}
      ${urls}
    </urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=600, stale-while-revalidate',
    },
  });
}
