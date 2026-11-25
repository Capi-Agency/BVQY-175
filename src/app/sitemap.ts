import type { MetadataRoute } from 'next';
import { fnGetAllPageSlug } from '../services/page';
import { directusClientWithRest } from '../lib/directus';
import { readItems } from '@directus/sdk';
import { routing } from '../i18n/routing';
import { FALLBACK_CATEGORY, pickPrimaryCategory, postCategorySlugs } from '../lib/seo/primary-category';

// Real modification date only; a fake "now" on every URL makes search engines ignore lastmod.
function lastModifiedOf(...dates: (string | null | undefined)[]): Date | undefined {
  const d = dates.find(Boolean);
  const t = d ? new Date(d) : undefined;
  return t && !Number.isNaN(t.getTime()) ? t : undefined;
}

// Regenerate hourly: built once at "next build", the sitemap never listed posts published afterwards
// (local check 2026-11-20: 146 published posts missing).
export const revalidate = 3600;

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

    if (categorySlug === FALLBACK_CATEGORY) {
      // the fallback category also lists posts without any category (their canonical URL is there)
      filter._or = [
        { categories: { _none: { category: { _nnull: true } } } },
        { categories: { category: { translations: { languages_code: { _eq: locale }, slug: { _eq: categorySlug } } } } },
      ];
    } else if (categorySlug) {
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
        fields: [
          'slug',
          // date_updated is not readable by the public role; date_published is the best public signal
          'date_published',
          'translations.slug',
          'translations.languages_code',
          'categories.category.translations.slug',
          'categories.category.translations.languages_code',
        ],
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
    return res
      .filter((item: any) => {
        // list each post only once: in the sitemap of its primary category (same rule as canonical)
        if (!categorySlug) return true;
        const cats = postCategorySlugs(item, locale);
        return cats.length === 0 || pickPrimaryCategory(cats) === categorySlug;
      })
      .map((item: any) => ({
        slug: item.translations?.[0]?.slug as string,
        lastModified: lastModifiedOf(item.date_published),
      }))
      .filter((x: any) => x.slug);
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
    // "/" redirects to "/vi": list the final URL, not a redirect
    const homepage: MetadataRoute.Sitemap[number] = {
      url: `${siteUrl}/${locale}`,
      changeFrequency: 'daily',
      priority: 1.0,
    };

    const pageItems = pages
      // trang-chu is the home page content (served at /vi); /vi/trang-chu redirects there
      .filter((page: any) => page.slug !== 'trang-chu')
      .map((page: any) => ({
        url: `${siteUrl}/${page.language}/${page.slug}`,
        changeFrequency: 'daily' as const,
        priority: 0.8,
      }));

    return [homepage, ...pageItems];
  }

  if (id === 'news-categories') {
    const newsCategories = await getAllNewsCategories(locale);
    return newsCategories.map((slug: string) => ({
      url: `${siteUrl}/${locale}/bai-viet/${slug}`,
      changeFrequency: 'daily' as const,
      priority: 0.7,
    }));
  }

  if (id && id.startsWith('news-') && id !== 'news-categories') {
    const category = id.replace('news-', '');
    const newsSlugs = await getAllNewsSlugs('posts', locale, category);
    return newsSlugs.map(({ slug, lastModified }: { slug: string; lastModified?: Date }) => ({
      url: `${siteUrl}/${locale}/bai-viet/${category}/${slug}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));
  }

  if (id === 'departments') {
    const departmentSlugs = await getAllSlugs('departments', locale);
    return departmentSlugs.map((slug: string) => ({
      url: `${siteUrl}/${locale}/chuyen-khoa/${slug}`,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));
  }

  if (id === 'doctors') {
    const doctorSlugs = await getAllSlugs('doctors', locale);
    return doctorSlugs.map((slug: string) => ({
      url: `${siteUrl}/${locale}/doi-ngu-bac-si/${slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));
  }

  if (id === 'dependent-units') {
    const dependentUnitSlugs = await getAllSlugs('dependent_units', locale);
    return dependentUnitSlugs.map((slug: string) => ({
      url: `${siteUrl}/${locale}/don-vi-truc-thuoc/${slug}`,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));
  }

  if (id === 'admin-departments') {
    const adminDepartmentSlugs = await getAllSlugs('administration_departments', locale);
    return adminDepartmentSlugs.map((slug: string) => ({
      url: `${siteUrl}/${locale}/khoi-co-quan-hanh-chinh/${slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));
  }

  if (id === 'centers') {
    const departmentGroups = await getAllEntities('department_groups', ['slug', 'parent_group.slug'], locale);
    return departmentGroups
      .filter((group: any) => group.parent_group?.slug === 'trung-tam')
      .map((group: any) => ({
        url: `${siteUrl}/${locale}/trung-tam/${group.slug}`,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }));
  }

  if (id === 'institutes') {
    const departmentGroups = await getAllEntities('department_groups', ['slug', 'parent_group.slug'], locale);
    return departmentGroups
      .filter((group: any) => group.parent_group?.slug === 'vien')
      .map((group: any) => ({
        url: `${siteUrl}/${locale}/vien/${group.slug}`,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }));
  }

  return [];
}
