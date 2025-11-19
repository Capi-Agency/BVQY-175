import { directusClient, directusClientWithRest } from '@/src/lib/directus';
import { parseFilterString } from '../utils/validate';
import { readItems } from '@directus/sdk';
import { customEndpoint } from '@directus/sdk';

export interface NewsFetchInfo {
  collectionString: string;
  page: number;
  limit: number;
  categorySlug: string | null;
  keyword?: string | null;
  sort?: any | null;
  collectionFilter?: string[] | null;
}

export const fnGetListNews = async ({
  collectionString = '',
  page = 1,
  limit = 10,
  categorySlug = null,
  keyword = null,
  sort = true,
  collectionFilter = null,
}: NewsFetchInfo) => {
  const filterConditions = [];

  if (categorySlug) {
    filterConditions.push(
      `{ categories: { category: { slug: { _eq: "${categorySlug}" } } } }`,
    );
  }

  if (keyword) {
    filterConditions.push(`{ title: { _icontains: "${keyword}" } }`);
  }

  if (collectionFilter) {
    if (Array.isArray(collectionFilter)) {
      collectionFilter.forEach((f) => {
        const parsed = parseFilterString(f);
        if (parsed) filterConditions.push(parsed);
      });
    } else {
      const parsed = parseFilterString(collectionFilter);
      if (parsed) filterConditions.push(parsed);
    }
  }

  const filterString = filterConditions.length
    ? `filter: { _and: [${filterConditions.join(', ')}] }`
    : '';

  let query = '';
  if (collectionString) {
    query = `
            query {
                ${collectionString} (page: ${page}, limit: ${limit}, sort: "${sort == true ? '-date_published' : 'date_published'}" ${filterString ? `, ${filterString}` : ''}) {
                    short_content
                }
                ${collectionString}_aggregated ${filterString ? `(${filterString})` : ''} {
                    count {
                        slug
                    }
                }
            }
        `;
  }
  return await directusClient.query(query);
};

export const fnGetCategoriesNews = async ({
  collectionString,
}: {
  collectionString: string;
}) => {
  if (!collectionString) return;
  const query = `
    query {
      ${collectionString} {
        slug
        title
      }
    }
  `;

  const response = await directusClient.query(query);
  return response?.[collectionString];
};

export const fnGetNewsDetailBySlug = async (
  collectionStr: string,
  slug: string,
) => {
  try {
    const query = `
    query {
      ${collectionStr} (id: "${slug}") {
        raw_content
      }
    }
  `;
    const response = await directusClient.query(query);
    const pageContent = response[collectionStr]?.raw_content;

    return pageContent;
  } catch (error) {
    console.log(error);
  }
};

export const fnGetListVideos = async ({
  collectionString = '',
  page = 1,
  limit = 10,
  categorySlug = null,
  sort = true,
}: NewsFetchInfo) => {
  const filterConditions = [];

  if (categorySlug) {
    filterConditions.push(
      ` { category: { slug: { _eq: "${categorySlug}" } } } `,
    );
  }

  const filterString = filterConditions.length
    ? `filter: { _and: [${filterConditions.join(', ')}] }`
    : '';

  let query = '';
  if (collectionString) {
    query = `
            query {
                ${collectionString} (page: ${page}, limit: ${limit}, sort: "${sort == true ? '-date_published' : 'date_published'}" ${filterString ? `, ${filterString}` : ''}) {
                    title
                    youtube_url
                    date_published
                }
                ${collectionString}_aggregated ${filterString ? `(${filterString})` : ''} {
                    count {
                        id
                    }
                }
            }
        `;
  }
  return await directusClient.query(query);
};

// Theo RESTful
export const getListItemByEndpoint = async (endpoint: string) => {
  const data = await directusClientWithRest.request(
    customEndpoint<any>({
      path: `${endpoint}`,
      method: 'GET',
    }),
  );

  return data;
};


/** Lấy danh sách item - có bộ lọc/ phân trang */
export const getListNews = async ({
  category = "",
  collection,
  limit = 12,
  page = 1,
  sort = true,
  keyword = '',
}: {
  collection: string;
  limit?: number;
  page?: number;
  sort?: boolean;
  keyword?: string;
  category?: string;
}) => {
  const filter: any = {};
  if (category) {
    filter.categories = {
      category: {
        slug: {
          _eq: category,
        },
      },
    };
  }

  if (keyword) {
    filter._or = [
      {
        title: {
          _icontains: keyword,
        },
      },
      {
        blurb: {
          _icontains: keyword,
        },
      },
    ];
  }

  try {
    const res = await directusClientWithRest.request(
      readItems(collection, {
        page,
        limit,
        sort: sort ? '-date_published' : 'date_published',
        filter,
        fields: ['*', 'categories.category.title', 'categories.category.slug'],
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
}: {
  collection: string;
  keyword?: string;
  category?: string;
}) => {
  try {
    const filter: any = {};
    if (category) {
      filter.categories = {
        category: {
          slug: {
            _eq: category,
          },
        },
      };
    }

    if (keyword) {
      filter._or = [
        {
          title: {
            _icontains: keyword,
          },
        },
        {
          blurb: {
            _icontains: keyword,
          },
        },
      ];
    }

    if (keyword) {
      filter._or = [
        { title: { _icontains: keyword } },
        { content: { _icontains: keyword } },
      ];
    }

    // Lấy tất cả id matching filter
    const items = await directusClientWithRest.request(
      readItems(collection, {
        filter,
        fields: ['slug'],
        limit: -1,
      }),
    );

    return items.length;
  } catch (error) {
    console.log('Error fetching news count:', error);
    return 0;
  }
};
