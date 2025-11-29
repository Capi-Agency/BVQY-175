import { directusClientWithRest } from '@/src/lib/directus';
import { readItem, readItems } from '@directus/sdk';

export const getListDoctors = async ({
  limit = 6,
  page = 1,
  sort = ['full_name'],
  keyword,
  letter,
  departmentId,
}: {
  limit?: number;
  page?: number;
  sort?: string[];
  keyword?: string;
  letter?: string;
  departmentId?: string | number;
}) => {
  try {
    // Build filter động theo điều kiện
    const filter: any = {};

    // 1. Keyword search
    if (keyword) {
      filter.name = {
        _icontains: keyword,
      };
    }

    // 2. Search theo chữ cái
    if (letter) {
      filter.full_name = {
        _starts_with: letter,
      };
    }

    // 3. Filter theo khoa
    if (departmentId) {
      filter.departments = {
        slug: {
          _eq: departmentId,
        },
      };
    }

    const res = await directusClientWithRest.request(
      readItems('doctors', {
        fields: [
          '*',
          'departments.department.code',
          'departments.department.title',
        ],
        limit,
        page,
        sort,
        filter,
      }),
    );

    return res;
  } catch (error) {
    console.log('Err in getListDoctors: ', error);
  }
};

export const getDoctorsCount = async ({
  keyword,
  letter,
  departmentId,
}: {
  keyword?: string;
  letter?: string;
  departmentId?: string | number;
}) => {
  try {
    // Build filter giống getListDoctors
    const filter: any = {};

    // 1. Keyword search
    if (keyword) {
      filter.name = { _icontains: keyword };
    }

    // 2. Search theo chữ cái
    if (letter) {
      filter.full_name = { _starts_with: letter };
    }

    // 3. Filter theo khoa
    if (departmentId) {
      filter.departments = {
        slug: { _eq: departmentId },
      };
    }

    // Gọi API với limit = 1, page = 1, chỉ cần meta.total_items
    const res = await directusClientWithRest.request(
      readItems('doctors', {
        fields: ['slug'], // chỉ lấy id để giảm payload
        limit: 1,
        page: 1,
        filter,
      }),
    );

    // Trả về số lượng bản ghi
    return res?.length ?? 0;
  } catch (error) {
    console.log('Err in getDoctorsCount: ', error);
    return 0;
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
        fields: ['*'],
      }),
    );
    return res;
  } catch (error) {
    console.log('error in get data: ', error);
  }
};
