import type { MetadataRoute } from 'next';
import { fnGetAllPageSlug } from '../services/page';
import { directusClientWithRest } from '../lib/directus';
import { readItems } from '@directus/sdk';
import { routing } from '../i18n/routing';

// Helper function to get all slugs from a collection
async function getAllSlugs(collection: string, locale: string = 'vi') {
  try {
    const res = await directusClientWithRest.request(
      readItems(collection, {
        fields: ['slug'],
        limit: -1, // Get all items
      }),
    );
    return res.map((item: any) => item.slug);
  } catch (error) {
    console.log(`Error fetching slugs from ${collection}:`, error);
    return [];
  }
}

// Helper function to get all entities with specific fields from a collection
async function getAllEntities(
  collection: string,
  fields: string[] = ['slug'],
  locale: string = 'vi',
) {
  try {
    const res = await directusClientWithRest.request(
      readItems(collection, {
        fields: fields,
        limit: -1, // Get all items
      }),
    );
    return res;
  } catch (error) {
    console.log(`Error fetching entities from ${collection}:`, error);
    return [];
  }
}

// Helper function to get all news slugs with translations
async function getAllNewsSlugs(collection: string, locale: string = 'vi') {
  try {
    const res = await directusClientWithRest.request(
      readItems(collection, {
        fields: ['slug', 'translations.slug', 'translations.languages_code'],
        filter: {
          translations: {
            languages_code: { _eq: locale },
          },
        },
        deep: {
          translations: {
            _filter: {
              languages_code: { _eq: locale },
            },
          },
        },
        limit: -1,
      }),
    );
    return res.map((item: any) => item.translations?.[0]?.slug).filter(Boolean);
  } catch (error) {
    console.log(`Error fetching news slugs from ${collection}:`, error);
    return [];
  }
}

// Helper function to get all news categories
async function getAllNewsCategories(locale: string = 'vi') {
  try {
    const res = await directusClientWithRest.request(
      readItems('p_categories', {
        fields: ['slug', 'translations.slug', 'translations.languages_code'],
        filter: {
          translations: {
            languages_code: { _eq: locale },
          },
        },
        deep: {
          translations: {
            _filter: {
              languages_code: { _eq: locale },
            },
          },
        },
        limit: -1,
      }),
    );
    return res.map((item: any) => item.translations?.[0]?.slug).filter(Boolean);
  } catch (error) {
    console.log('Error fetching news categories:', error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await fnGetAllPageSlug(['vi']);
  const siteUrl = process.env.SITE_URL || '';
  const locale = 'vi';

  const homepage: MetadataRoute.Sitemap[number] = {
    url: siteUrl,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1.0,
  };

  // Static pages
  const pageItems = pages.map((page: any) => ({
    url: `${siteUrl}/${page.language}/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  // Get all slugs for different collections
  const [
    newsSlugs,
    newsCategories,
    departmentSlugs,
    doctorSlugs,
    adminDepartmentSlugs,
    dependentUnitSlugs,
    departmentGroups,
  ] = await Promise.all([
    getAllNewsSlugs('posts', locale),
    getAllNewsCategories(locale),
    getAllSlugs('departments', locale),
    getAllSlugs('doctors', locale),
    getAllSlugs('administration_departments', locale),
    getAllSlugs('dependent_units', locale),
    getAllEntities('department_groups', ['slug', 'parent_group'], locale),
  ]);

  // Bài viết - News categories list pages
  const newsCategoryPages = newsCategories.map((slug) => ({
    url: `${siteUrl}/${locale}/bai-viet/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }));

  // Bài viết - News detail pages
  const newsDetailPages = newsSlugs.flatMap((slug) =>
    newsCategories.map((category) => ({
      url: `${siteUrl}/${locale}/bai-viet/${category}/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
  );

  // Chuyên khoa - Department detail pages
  const departmentPages = departmentSlugs.map((slug) => ({
    url: `${siteUrl}/${locale}/chuyen-khoa/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Đội ngũ bác sĩ - Doctor detail pages
  const doctorPages = doctorSlugs.map((slug) => ({
    url: `${siteUrl}/${locale}/doi-ngu-bac-si/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Đơn vị trực thuộc - Department detail pages
  const dependentUnitPages = dependentUnitSlugs.map((slug) => ({
    url: `${siteUrl}/${locale}/don-vi-truc-thuoc/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Khối cơ quan hành chính - Admin department detail pages
  const adminDepartmentPages = adminDepartmentSlugs.map((slug) => ({
    url: `${siteUrl}/${locale}/khoi-co-quan-hanh-chinh/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Trung tâm - Department detail pages
  const centerPages = departmentGroups
    .filter((group: any) => group.parent_group === 'trung-tam')
    .map((group: any) => ({
      url: `${siteUrl}/${locale}/trung-tam/${group.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

  // Viện - Department detail pages
  const instituePages = departmentGroups
    .filter((group: any) => group.parent_group === 'vien')
    .map((group: any) => ({
      url: `${siteUrl}/${locale}/vien/${group.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

  return [
    homepage,
    ...pageItems,
    ...newsCategoryPages,
    ...newsDetailPages,
    ...departmentPages,
    ...doctorPages,
    ...dependentUnitPages,
    ...adminDepartmentPages,
    ...centerPages,
    ...instituePages,
  ];
}
