'use server';
// Server actions: browser components call these on the server of this app (website token).
import { aggregate } from '@directus/sdk';
import { safeLimit } from '@/src/utils/safe-limit';
import { directusClient, directusClientWithRest, readItemBySlug } from '@/src/lib/directus';
import { readItems } from '@directus/sdk';
import { customEndpoint } from '@directus/sdk';
import { routing } from '../i18n/routing';
import { Locale } from 'next-intl';

/** Lấy danh sách item - có bộ lọc/ phân trang */

export const getListNews = async ({
  category = '',
  collection,
  limit = 12,
  page = 1,
  sort = true,
  keyword = '',
  locale = routing.defaultLocale,
  neqSlug
}: {
  collection: string;
  limit?: number;
  page?: number;
  sort?: boolean;
  keyword?: string;
  category?: string;
  locale?: Locale;
  neqSlug?: string;
}) => {
  const filter: any = {};
  if (category) {
    filter.categories = {
      category: {
        translations: {
          languages_code: { _eq: locale },
          slug: {
            _eq: category,
          },
        },
      },
    };
  }

  if (keyword || neqSlug) {
    filter.translations = {
      _and: [
        { languages_code: { _eq: locale } },
        ...(keyword
          ? [
            {
              _or: [
                { title: { _icontains: keyword } },
                { blurb: { _icontains: keyword } },
                { content: { _icontains: keyword } },
                { content_plain: { _icontains: keyword } },
              ],
            },
          ]
          : []),
        ...(neqSlug ? [{ slug: { _neq: neqSlug } }] : []),
      ],
    };
  } else {
    filter.translations = {
      languages_code: { _eq: locale },
    };
  }

  try {
    const res = await directusClientWithRest.request(
      readItems(collection, {
        page,
        limit: safeLimit(limit),
        sort: sort ? '-date_published' : 'date_published',
        filter,
        fields: [
          'slug',
          'date_published',
          'categories.category.translations.*',
          'translations.*',
        ],
        deep: {
          translations: {
            _filter: {
              languages_code: { _eq: locale },
            },
          },
          categories: {
            category: {
              translations: {
                _filter: { languages_code: { _eq: locale } },
              },
            },
          },
        },
      }),
    );

    return res;
  } catch (error) {
    console.log('err in getListNews: ', error);
  }
};

/** Trả về tổng số item */
export const getTotalNewsCount = async ({
  collection,
  keyword,
  category,
  locale = routing.defaultLocale,
  neqSlug
}: {
  collection: string;
  keyword?: string;
  category?: string;
  locale?: Locale;
  neqSlug?: string;
}) => {
  try {
    const filter: any = {};

    if (category) {
      filter.categories = {
        category: {
          translations: {
            languages_code: { _eq: locale },
            slug: {
              _eq: category,
            },
          },
        },
      };
    }

    if (keyword || neqSlug) {
      filter.translations = {
        _and: [
          { languages_code: { _eq: locale } },
          ...(keyword
            ? [
              {
                _or: [
                  { title: { _icontains: keyword } },
                  { blurb: { _icontains: keyword } },
                  { content: { _icontains: keyword } },
                  { content_plain: { _icontains: keyword } },
                ],
              },
            ]
            : []),
          ...(neqSlug ? [{ slug: { _neq: neqSlug } }] : []),
        ],
      };
    } else {
      filter.translations = {
        languages_code: { _eq: locale },
      };
    }

    // Lấy tất cả id matching filter
    const response = await directusClientWithRest.request(
      aggregate(collection, {
        aggregate: { countDistinct: 'slug' },
        query: {
          filter,
        },
      }),
    );

    return (response?.[0]?.countDistinct as any)?.slug ?? 0;
  } catch (error) {
    console.log('Error fetching news count:', error);
    return 0;
  }
};

/** Lấy chi tiết bài viết bằng slug */
export const getNewsDetail = async ({
  collection,
  slug,
  locale = routing.defaultLocale,
}: {
  collection: string;
  slug: string;
  locale: Locale;
}) => {
  try {
    const filter = {
      translations: {
        languages_code: { _eq: locale },
        slug: {
          _eq: slug,
        },
      },
    };

    const res = await directusClientWithRest.request(
      readItems(collection, {
        filter,
        deep: {
          translations: {
            _filter: {
              _and: [
                {
                  slug: { _eq: slug },
                },
                {
                  languages_code: { _eq: locale },
                },
              ],
            },
          },
        },
        fields: [
          '*',
          'categories.category.translations.*',
          'translations.*',
          'files.*',
          'documents.*.*',
          'seo.meta_title',
          'seo.meta_description',
        ],
      }),
    );
    return res?.[0];
  } catch (error) {
    console.log('err in getNewsDetail: ', error);
  }
};

export const getNewsCategoryDetail = async ({
  collection,
  slug,
}: {
  collection: string;
  slug: string;
}) => {
  try {
    const res = await readItemBySlug(collection, slug, {
        fields: ['*'],
      })(directusClientWithRest);
    return res;
  } catch (error) {
    console.log('err in getNewsCategoryDetail: ', error);
  }
};

export const fnGetCategoriesNews = async ({
  collection,
  limit = 20,
  category = '',
  locale = routing.defaultLocale,
}: {
  collection: string;
  limit?: number;
  category?: string;
  locale?: Locale;
}) => {
  try {
    const filter: any = {};
    if (category) {
      filter.translations = {
        languages_code: { _eq: locale },
        slug: {
          _eq: category,
        },
      };
    }

    const res = await directusClientWithRest.request(
      readItems(collection, {
        page: 1,
        limit: safeLimit(limit),
        filter,
        fields: ['*', 'translations.*'],
        deep: {
          translations: {
            _filter: {
              languages_code: { _eq: locale },
            },
          },
        },
      }),
    );
    return res;
  } catch (error) {
    console.log('error in get data: ', error);
  }
};
