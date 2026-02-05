import type { MetadataRoute } from 'next';
import { fnGetAllPageSlug } from '../services/page';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await fnGetAllPageSlug();
  const siteUrl = process.env.SITE_URL || '';

  const homepage: MetadataRoute.Sitemap[number] = {
    url: siteUrl,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1.0,
  };

  const pageItems = pages.map((page: any) => ({
    url: `${siteUrl}/${page.language}/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  return [homepage, ...pageItems];
}
