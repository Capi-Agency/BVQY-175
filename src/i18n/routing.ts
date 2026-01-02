import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['vi', 'en'],
  defaultLocale: 'vi',
  localePrefix: 'always',
  localeCookie: true,
  alternateLinks: true,
  localeDetection: true,
  // pathnames: {
  //   '/[slug]': {
  //     en: '/[slug]'
  //   },
  //   '/doi-ngu-bac-si/[slug]': {
  //     en: '/doctors/[slug]'
  //   },
  // }
});

// chỉ dùng cho trang home
export const getLangSlug = async (
  locale: string,
  slug: string,
): Promise<string> => {
  return locale === routing.defaultLocale ? slug : `${slug}-${locale}`;
};

export function getLocalizedField(baseKey: string, lang: string): string {
  if (lang === routing.defaultLocale) return baseKey;
  return `${baseKey}_${lang}`;
}
