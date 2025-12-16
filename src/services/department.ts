import { directusClientWithRest } from '@/src/lib/directus';
import { readItem, readItems } from '@directus/sdk';

export const getAllDepartmentGroups = async (keyword?: string) => {
  const filter: any = {};
  if (keyword) {
    filter.title = {
      _icontains: keyword,
    };
    filter.code = {
      _icontains: keyword,
    };
  }

  try {
    const res = await directusClientWithRest.request(
      readItems('department_groups', {
        fields: [
          '*',
          'departments.title',
          'departments.title_en',
          'departments.slug',
          'departments.code',
          'children_groups.*.*',
        ],
        deep: {
          doctors: {
            sort: ['sort'],
          },
        },
        filter,
        sort: ['sort', 'title'],
      }),
    );
    return res;
  } catch (error) {
    console.log('Err in getAllDepartmentGroups: ', error);
  }
};

export const getChildDepartments = async (groupSlug: string) => {
  try {
    const res = await directusClientWithRest.request(
      readItems('departments', {
        fields: ['title', 'title_en', 'slug', 'code'],
        filter: {
          group: {
            _eq: groupSlug,
          },
        },
      }),
    );
    return res;
  } catch (error) {
    console.log('Err in getChildDepartments: ', error);
  }
};

export const fnGetDepartmentDetail = async ({
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
          'doctors.*.*',
        ],
        deep: {
          doctors: {
            sort: ['sort'],
          },
        },
      }),
    );
    console.log('🚀 ~ fnGetDepartmentDetail ~ res:', res);
    return res;
  } catch (error) {
    console.log('error in get data: ', error);
  }
};
