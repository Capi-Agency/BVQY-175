import { directusClientWithRest } from '@/src/lib/directus';
import { readItem, readItems } from '@directus/sdk';

export const getListDoctors = async ({
  limit = 9,
  page = 1,
  sort = ['-date_published'],
}: {
  limit?: number;
  page?: number;
  sort?: string[];
}) => {
  try {
    const res = await directusClientWithRest.request(
      readItems('doctors', {
        fields: ['*', 'departments.*'],
        filter: {
          sort: sort,
          limit: limit,
          page: page,
        },
      }),
    );
    return res;
  } catch (error) {
    console.log('Err in getAllDoctors: ', error);
  }
};

export const getListDoctorPreview = async ({
  limit = 9,
  page = 1,
  sort = '',
}: {
  limit?: number;
  page?: number;
  sort?: string;
}) => {
  try {
    const res = await directusClientWithRest.request(
      readItems('doctors', {
        fields: [
          'slug',
          'avatar',
          'full_title',
          'full_name',
          'position',
          'specialty',
        ],
        sort: sort,
        limit: limit,
        page: page,
      }),
    );
    return res;
  } catch (error) {
    console.log('Err in getAllDoctors: ', error);
  }
};

export const getDoctorBySlug = async (slug: string) => {
  try {
    // Lấy chi tiết bác sĩ - collection: doctors - key: slug - options: lấy tất cả fields (*), lấy tất cả fields của khoa (department.*)
    const res = await directusClientWithRest.request(
      readItem('doctors', slug, {
        fields: ['*', 'departments.*'],
      }),
    );
    return res;
  } catch (error) {
    console.log('Err in getDoctorBySlug: ', error);
  }
};

export const fnGetDoctorDetail = async ({
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
        ],
      }),
    );
    return res;
  } catch (error) {
    console.log('error in get data: ', error);
  }
};
