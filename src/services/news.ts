import { readItem } from '@directus/sdk';
import { directusClient, directusClientWithRest } from '@/src/lib/directus';
import { readItems } from '@directus/sdk';
import { customEndpoint } from '@directus/sdk';

/** Lấy danh sách item - có bộ lọc/ phân trang */
export const getListNews = async ({
  category = '',
  collection,
  limit = 12,
  page = 1,
  sort = true,
  keyword = '',
  offset = 0,

}: {
  collection: string;
  limit?: number;
  page?: number;
  sort?: boolean;
  keyword?: string;
  category?: string;
  offset?: number;
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
        offset,
        sort: sort ? '-date_published' : 'date_published',
        filter,
        fields: ['*', 'categories.category.title', 'categories.category.slug'],
        disableCache: true
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
        disableCache: true
      }),
    );

    return items.length;
  } catch (error) {
    console.log('Error fetching news count:', error);
    return 0;
  }
};

/** Lấy chi tiết bài viết bằng slug */
export const getNewsDetail = async ({
  collection,
  slug,
}: {
  collection: string;
  slug: string;
}) => {
  try {
    const res = await directusClientWithRest.request(
      readItem(collection, slug, {
        fields: ['*', 'categories.category.title', 'categories.category.slug'],
      }),
    );
    return res;
  } catch (error) {
    console.log('err in getNewsDetail: ', error);
  }
};

// fnGetCategoriesNews
