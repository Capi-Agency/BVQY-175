import { directusClientWithRest } from '../lib/directus';
import { customEndpoint } from '@directus/sdk';

// List dòng sản phẩm
export const getListItemByEndpoint = async (endpoint: string) => {
  const data = await directusClientWithRest.request(
    customEndpoint<any>({
      path: `${endpoint}`,
      method: 'GET',
    }),
  );

  return data;
};
