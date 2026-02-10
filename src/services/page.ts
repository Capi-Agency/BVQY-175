import { directusClientWithRest } from '@/src/lib/directus';
import { readItem, readItems } from '@directus/sdk';

/* ============================
   GET PAGE CONTENT BY SLUG
============================ */
export const fnGetPageBySlug = async (slug: string) => {
  try {
    // Try readItems with filter first as slug is usually a field, not the ID
    const res = await directusClientWithRest.request(
      readItems('pages', {
        fields: ['raw_content'],
        filter: {
          slug: {
            _eq: slug,
          },
        },
        limit: 1,
      }),
    );

    if (res && res.length > 0) {
      return res[0].raw_content ?? null;
    }

    // Fallback to readItem in case slug IS the ID
    const item = await directusClientWithRest.request(
      readItem('pages', slug, {
        fields: ['raw_content'],
      }),
    );

    return item?.raw_content ?? null;
  } catch (error: any) {
    console.log(
      'Error getting page content for slug: ',
      slug,
      error?.errors?.[0]?.message || error?.message || error,
    );
    return null;
  }
};

/* ============================
   GET PAGE SCHEMA BY SLUG
============================ */
export const fnGetSchemaBySlug = async (slug: string) => {
  try {
    const res = await directusClientWithRest.request(
      readItems('pages', {
        fields: ['metadata'],
        filter: {
          slug: {
            _eq: slug,
          },
        },
        limit: 1,
      }),
    );

    if (res && res.length > 0) {
      return res[0].metadata ?? null;
    }

    const item = await directusClientWithRest.request(
      readItem('pages', slug, {
        fields: ['metadata'],
      }),
    );

    return item?.metadata ?? null;
  } catch (error: any) {
    console.log(
      'Error getting page schema for slug: ',
      slug,
      error?.errors?.[0]?.message || error?.message || error,
    );
    return null;
  }
};

/* ============================
   GET ALL PAGE SLUGS
============================ */
export const fnGetAllPageSlug = async (languages?: string[]) => {
  try {
    const res: any = await directusClientWithRest.request(
      readItems('pages', {
        fields: ['slug', 'language'],
        filter: {
          ...(languages && {
            language: {
              _in: languages,
            },
          }),
          slug: {
            _nistarts_with: 'chi-tiet',
          },
        },
      }),
    );

    return res ?? [];
  } catch (error: any) {
    console.log(
      'Error getting page slugs: ',
      error?.errors?.[0]?.message || error?.message || error,
    );
    return [];
  }
};

/* ============================
   GET TOP NAV BY SLUG (REST)
============================ */
export const fnGetTopNavBySlug = async (slug: string) => {
  try {
    const res = await directusClientWithRest.request(
      readItems('top_navigation', {
        fields: ['raw_content'],
        filter: {
          slug: {
            _eq: slug,
          },
        },
        limit: 1,
      }),
    );

    if (res && res.length > 0) {
      return res[0].raw_content ?? null;
    }

    const item = await directusClientWithRest.request(
      readItem('top_navigation', slug, {
        fields: ['raw_content'],
      }),
    );

    return item?.raw_content ?? null;
  } catch (error: any) {
    console.log(
      'Error getting top navigation for slug: ',
      slug,
      error?.errors?.[0]?.message || error?.message || error,
    );
    return null;
  }
};

/* ============================
   GET BOTTOM NAV BY SLUG (REST)
============================ */
export const fnGetBottomNavBySlug = async (slug: string) => {
  try {
    const res = await directusClientWithRest.request(
      readItems('bottom_navigation', {
        fields: ['raw_content'],
        filter: {
          slug: {
            _eq: slug,
          },
        },
        limit: 1,
      }),
    );

    if (res && res.length > 0) {
      return res[0].raw_content ?? null;
    }

    const item = await directusClientWithRest.request(
      readItem('bottom_navigation', slug, {
        fields: ['raw_content'],
      }),
    );

    return item?.raw_content ?? null;
  } catch (error: any) {
    console.error(
      'Error getting bottom navigation for slug: ',
      slug,
      error?.errors?.[0]?.message || error?.message || error,
    );
    return null;
  }
};
