import { directusClientWithRest } from '@/src/lib/directus';
import { readSingleton } from '@directus/sdk';
import { Locale } from 'next-intl';
import { cleanTranslationsDeep } from '../utils/metadata';

async function getTopNavigation(locale: Locale) {
  return directusClientWithRest.request(
    readSingleton('top_navigation', {
      fields: ['*'],
    }),
  );
}

async function getBottomNavigation(locale: Locale) {
  return directusClientWithRest.request(
    readSingleton('bottom_navigation', {
      fields: ['*'],
    }),
  );
}

async function getSiteMetadata() {
  return directusClientWithRest.request(
    readSingleton('metadata', {
      fields: ['contact_information', 'header_script'],
    }),
  );
}

export async function fnGetMetadata(locale: Locale) {
  try {
    const [topNav, bottomNav, metadata] = await Promise.all([
      getTopNavigation(locale),
      getBottomNavigation(locale),
      getSiteMetadata(),
    ]);

    const cleanedTop = cleanTranslationsDeep(topNav?.[0]?.raw_content, locale);
    const cleanedBottom = cleanTranslationsDeep(bottomNav?.[0]?.raw_content, locale);

    if (typeof (metadata as any) === 'string') {
      throw new Error(`Directus returned a string (HTML) for metadata: ${(metadata as any).substring(0, 100)}...`);
    }

    return {
      ...metadata,
      top_navigation: cleanedTop,
      bottom_navigation: cleanedBottom,
    };
  } catch (error) {
    console.error('Error getting metadata:', error);
    const defaultData = require('../utils/default-metadata.json');
    const cleanedTop = cleanTranslationsDeep(defaultData.top_navigation, locale);
    const cleanedBottom = cleanTranslationsDeep(defaultData.bottom_navigation, locale);

    return {
      contact_information: defaultData.contact_information,
      header_script: defaultData.header_script,
      top_navigation: cleanedTop,
      bottom_navigation: cleanedBottom,
    };
  }
}

