'use server';
// Server actions: browser components call these on the server of this app (website token).
import { directusClientWithRest, readItemBySlug } from '@/src/lib/directus';
import { readItems } from '@directus/sdk';

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
          'departments.slug',
          'departments.code',
          'children_groups.*.*',
          'doctors.doctor.*',
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
        fields: ['title', 'slug', 'code'],
        filter: {
          group: {
            slug: { _eq: groupSlug },
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
    const res = await readItemBySlug(collection, slug, {
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
            _filter: {
              doctor: {
                _or: [
                  {
                    department_title: {
                      _in: [
                        'head_of_department',
                        'deputy_head_of_department',
                        'acting_head_of_department',
                        'acting_deputy_head_of_department',
                      ],
                    },
                  },
                  {
                    institute_title: {
                      _in: [
                        'director',
                        'deputy_director',
                        'center_director',
                        'deputy_center_director',
                        'head_of_institute',
                        'deputy_head_of_institute',
                      ],
                    },
                  },
                ],
              },
            },
            // equal sort values (many are all 1): junction id keeps the order stable
            sort: ['sort', 'id'],
          },
        },
      })(directusClientWithRest);
    return res;
  } catch (error) {
    console.log('error in get data: ', error);
  }
};
