import { generateSitemaps } from '../sitemap';

export async function GET() {
  const sitemaps = await generateSitemaps();
  const siteUrl = process.env.SITE_URL || 'http://localhost:3000';

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.map(s => `  <sitemap>
    <loc>${siteUrl}/sitemap/${s.id}.xml</loc>
  </sitemap>`).join('\n')}
</sitemapindex>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
