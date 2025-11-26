import { readItem } from '@directus/sdk';
import { directusClient, directusClientWithRest } from '@/src/lib/directus';
import { parseFilterString } from '../utils/validate';
import { readItems } from '@directus/sdk';
import { customEndpoint } from '@directus/sdk';

export const fnGetListItemByEndpoint = async (endpoint: string) => {
  const data = await directusClientWithRest.request(
    customEndpoint<any>({
      path: `${endpoint}`,
      method: 'GET',
    }),
  );

  return data;
};


export const fnGetListitem = async ({
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