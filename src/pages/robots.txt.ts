// Astro endpoint for robots.txt
// Migrated from Next.js

import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const siteUrl = import.meta.env.SITE_URL || 'http://localhost:4321';
  const domain = import.meta.env.DOMAIN || '';

  const robotsTxt = `
# Robot rules for ${domain}
User-agent: *
Allow: /
Disallow: /admin/

# Sitemap
Sitemap: ${siteUrl}/sitemap.xml

# Host
Host: ${domain}
`.trim();

  return new Response(robotsTxt, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
