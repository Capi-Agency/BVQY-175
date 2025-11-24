import { directusClientWithRest } from '@/src/lib/directus';
import { readItem, readItems } from '@directus/sdk';

export const getAllDepartmentGroups = async () => {
  try {
    const res = await directusClientWithRest.request(
      readItems('department_groups', {
        fields: [
          '*',
          'departments.title',
          'departments.title_en',
          'departments.slug',
          'departments.code',
          'children_groups.*',
        ],
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
