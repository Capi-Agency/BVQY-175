'use server';
// Server actions: browser components call these on the server of this app (website token).
import { directusClientWithRest } from '@/src/lib/directus';
import { safeLimit } from '@/src/utils/safe-limit';
import { aggregate, readItem, readItems } from '@directus/sdk';
import { routing } from '../i18n/routing';
import { Locale } from 'next-intl';

// Server actions take any argument: only the unit collections can be listed here.
const UNIT_COLLECTIONS = ['departments', 'administration_departments', 'department_groups', 'dependent_units'];
// department_groups with a detail page: /vien/<slug> and /trung-tam/<slug> (src/lib/seo/route-check.ts).
// The top-level groups (Khoa, Trung tâm, Viện) and the blocks under "Khoa" (Khối Nội...) have none.
const GROUPS_WITH_PAGE = ['vien', 'trung-tam'];
function unitQuery(collection: string, keyword?: string) {
  if (!UNIT_COLLECTIONS.includes(collection)) throw new Error(`collection not allowed: ${collection}`);
  const and: any[] = [];
  if (keyword) {
    and.push({ _or: ['title', 'code', 'description'].map((f) => ({ [f]: { _icontains: keyword } })) });
  }
  if (collection === 'department_groups') and.push({ parent_group: { _in: GROUPS_WITH_PAGE } });
  return { filter: and.length ? { _and: and } : {}, extraFields: collection === 'department_groups' ? ['parent_group'] : [] };
}

export const fnGetAdminDepartments = async ({
  collection,
  limit = 12,
  page = 1,
  keyword = '',
  locale = routing.defaultLocale
}: {
  collection: string;
  limit?: number;
  page?: number;
  keyword?: string;
  locale?: Locale
}) => {
  try {
    const { filter, extraFields } = unitQuery(collection, keyword);
    const res = await directusClientWithRest.request(
      readItems(collection, {
        page,
        limit: safeLimit(limit),
        fields: [
          'slug',
          'title',
          'code',
          'cover.id',
          'organizational_structure',
          'description',
          ...extraFields,
        ],
        filter,
      }),
    );
    return res;
  } catch (error) {
    console.log('Err in GetAdminDepartments: ', error);
  }
};

export const getTotalAdminDepartmentCount = async ({
  collection,
  keyword,
  locale = routing.defaultLocale
}: {
  collection: string;
  keyword?: string;
  locale?: Locale
}) => {
  try {
    const { filter } = unitQuery(collection, keyword);

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
    console.log('Error fetching getTotalAdminDepartmentCount:', error);
    return 0;
  }
};

export const fnGetAdminDepartmentDetail = async ({
  collection,
  slug,
}: {
  collection: string;
  slug: string;
}) => {
  try {
    const res = await directusClientWithRest.request(
      readItem(collection, slug, {
        fields: [
          '*',
          'description_images.*',
          'achievements_images.*',
          'facilities_images.*',
          'technologies_images.*',
          'activities_images.*',
          'leaders.*.*',
        ],
        deep: {
          leaders: {
            sort: ['sort'],
          },
        },
      }),
    );
    return res;
  } catch (error) {
    console.log('error in get GetAdminDepartmentDetail: ', error);
  }
};
