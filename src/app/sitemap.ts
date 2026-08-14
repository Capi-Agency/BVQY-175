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
async function getAllNewsSlugs(
  collection: string,
  locale: string = 'vi',
  categorySlug?: string
) {
  try {
    const filter: any = {
      translations: {
        languages_code: { _eq: locale },
      },
    };

    if (categorySlug) {
      filter.categories = {
        category: {
          translations: {
            languages_code: { _eq: locale },
            slug: { _eq: categorySlug },
          },
        },
      };
    }

    const res = await directusClientWithRest.request(
      readItems(collection, {
        fields: ['slug', 'translations.slug', 'translations.languages_code'],
        filter,
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

export async function generateSitemaps() {
  const locale = 'vi';
  const newsCategories = await getAllNewsCategories(locale);

  const sitemaps = [
    { id: 'pages' },
    { id: 'news-categories' },
    { id: 'departments' },
    { id: 'doctors' },
    { id: 'dependent-units' },
    { id: 'admin-departments' },
    { id: 'centers' },
    { id: 'institutes' },
  ];

  if (newsCategories && newsCategories.length > 0) {
    newsCategories.forEach((category: string) => {
      sitemaps.push({ id: `news-${category}` });
    });
  }

  return sitemaps;
}

export default async function sitemap({
  id,
}: {
  id: string;
}): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.SITE_URL || '';
  const locale = 'vi';

  if (id === 'pages') {
    const pages = await fnGetAllPageSlug(['vi']);
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

  if (id === 'news-categories') {
    const newsCategories = await getAllNewsCategories(locale);
    return newsCategories.map((slug: string) => ({
      url: `${siteUrl}/${locale}/bai-viet/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    }));
  }

  if (id && id.startsWith('news-') && id !== 'news-categories') {
    const category = id.replace('news-', '');
    const newsSlugs = await getAllNewsSlugs('posts', locale, category);
    return newsSlugs.map((slug: string) => ({
      url: `${siteUrl}/${locale}/bai-viet/${category}/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));
  }

  if (id === 'departments') {
    const departmentSlugs = await getAllSlugs('departments', locale);
    return departmentSlugs.map((slug: string) => ({
      url: `${siteUrl}/${locale}/chuyen-khoa/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));
  }

  if (id === 'doctors') {
    const doctorSlugs = await getAllSlugs('doctors', locale);
    return doctorSlugs.map((slug: string) => ({
      url: `${siteUrl}/${locale}/doi-ngu-bac-si/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));
  }

  if (id === 'dependent-units') {
    const dependentUnitSlugs = await getAllSlugs('dependent_units', locale);
    return dependentUnitSlugs.map((slug: string) => ({
      url: `${siteUrl}/${locale}/don-vi-truc-thuoc/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));
  }

  if (id === 'admin-departments') {
    const adminDepartmentSlugs = await getAllSlugs('administration_departments', locale);
    return adminDepartmentSlugs.map((slug: string) => ({
      url: `${siteUrl}/${locale}/khoi-co-quan-hanh-chinh/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));
  }

  if (id === 'centers') {
    const departmentGroups = await getAllEntities('department_groups', ['slug', 'parent_group'], locale);
    return departmentGroups
      .filter((group: any) => group.parent_group === 'trung-tam')
      .map((group: any) => ({
        url: `${siteUrl}/${locale}/trung-tam/${group.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }));
  }

  if (id === 'institutes') {
    const departmentGroups = await getAllEntities('department_groups', ['slug', 'parent_group'], locale);
    return departmentGroups
      .filter((group: any) => group.parent_group === 'vien')
      .map((group: any) => ({
        url: `${siteUrl}/${locale}/vien/${group.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }));
  }

  return [];
}
