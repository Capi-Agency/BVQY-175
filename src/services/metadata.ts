import { directusClientWithRest } from '@/src/lib/directus';
import { readSingleton } from '@directus/sdk';
import { Locale } from '@/src/i18n/navigation';
import { cleanTranslationsDeep } from '../utils/metadata';

async function getTopNavigation(locale: Locale) {
  return directusClientWithRest.request(
    readSingleton('top_navigation', {
      fields: ['*', 'translations.*'],
    }),
  );
}

async function getBottomNavigation(locale: Locale) {
  return directusClientWithRest.request(
    readSingleton('bottom_navigation', {
      fields: ['*', 'translations.*'],
    }),
  );
}

async function getSiteMetadata() {
  return directusClientWithRest.request(
    readSingleton('metadata', {
      fields: [
        '*',
        'translations.*',
        'contact_information.*',
        'contact_information.files.*',
        'contact_information.files.directus_files_id',
      ],
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

    console.log('DEBUG topNav keys:', topNav ? Object.keys(topNav) : 'null');
    console.log('DEBUG topNav.raw_content exists:', !!topNav?.raw_content);
    console.log(
      'DEBUG topNav.translations length:',
      topNav?.translations?.length,
    );

    const cleanedTop = cleanTranslationsDeep(topNav, locale);
    const cleanedBottom = cleanTranslationsDeep(bottomNav, locale);
    const cleanedMetadata = cleanTranslationsDeep(metadata, locale);

    console.log('DEBUG cleanedTop isArray:', Array.isArray(cleanedTop));
    console.log(
      'DEBUG cleanedTop keys:',
      cleanedTop ? Object.keys(cleanedTop) : 'null',
    );
    console.log(
      'DEBUG cleanedTop.raw_content exists:',
      !!cleanedTop?.raw_content,
    );

    // Parse raw_content if it exists and is a string
    let topNavigation = null;
    let bottomNavigation = null;

    if (cleanedTop?.raw_content) {
      try {
        topNavigation =
          typeof cleanedTop.raw_content === 'string'
            ? JSON.parse(cleanedTop.raw_content)
            : cleanedTop.raw_content;
        console.log('DEBUG topNavigation parsed:', !!topNavigation);
      } catch (e) {
        console.error('Error parsing top navigation raw_content:', e);
      }
    }

    if (cleanedBottom?.raw_content) {
      try {
        bottomNavigation =
          typeof cleanedBottom.raw_content === 'string'
            ? JSON.parse(cleanedBottom.raw_content)
            : cleanedBottom.raw_content;
        console.log('DEBUG bottomNavigation parsed:', !!bottomNavigation);
      } catch (e) {
        console.error('Error parsing bottom navigation raw_content:', e);
      }
    }

    return {
      ...cleanedMetadata,
      top_navigation: topNavigation,
      bottom_navigation: bottomNavigation,
    };
  } catch (error) {
    console.error('Error getting metadata:', error);
    return null;
  }
}
