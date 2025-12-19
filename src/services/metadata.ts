import { locales } from './../utils/language';
import { directusClientWithRest } from '@/src/lib/directus';
import { readSingleton } from '@directus/sdk';
import { Locale } from 'next-intl';

export const fnGetMetadata = async (locale: Locale) => {
  try {
    const res = await directusClientWithRest.request(
      readSingleton('metadata', {
        fields: [
          'top_navigation',
          'bottom_navigation',
          'contact_information',
          'header_script',
        ],
        // filter: {
        //   languages: {
        //     _eq: locale,
        //   },
        // },
      }),
    );
    console.log('🚀 ~ fnGetMetadata ~ res:', res);

    return res;
  } catch (error) {
    console.log('Error getting metadata: ', error);
  }
};
