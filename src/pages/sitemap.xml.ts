// Astro endpoint for sitemap.xml
// Migrated from Next.js with dynamic page generation

import type { APIRoute } from 'astro';
import { fnGetAllPageSlug } from '../services/page';

export const GET: APIRoute = async () => {
  try {
    // Fetch all page slugs for Vietnamese locale
    const pages = await fnGetAllPageSlug(['vi']);
    const siteUrl = import.meta.env.SITE_URL || 'http://localhost:4321';

    // Build sitemap entries
    const urlEntries: string[] = [];

    // Homepage entry
    urlEntries.push(`
  <url>
    <loc>${siteUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`);

    // Dynamic page entries
    for (const page of pages) {
      const url = `${siteUrl}/${page.language}/${page.slug}`;
      urlEntries.push(`
  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`);
    }

    // Build complete sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries.join('\n')}
</urlset>`;

    return new Response(sitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new Response('Error generating sitemap', { status: 500 });
  }
};
