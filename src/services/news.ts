import { directusClient } from '@/src/lib/directus';
import { parseFilterString } from '../utils/validate';

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
