import { defineRouting } from 'next-intl/routing';
import { fnGetAllPageSlug } from '@/src/services/page'; // đường dẫn đúng của bạn

export const routing = defineRouting({
  locales: ['vi', 'en'],
  defaultLocale: 'vi',
  localePrefix: 'always',
  localeCookie: true,
  alternateLinks: true,
  localeDetection: true,
  pathnames: {
    '/chuyen-khoa': {
      en: '/departments'
    },
    '/chuyen-khoa/[slug]': {
      en: '/departments/[slug]'
    },
    '/danh-cho-nguoi-benh': {
      en: '/for-patients'
    },
    '/doi-ngu-bac-si': {
      en: '/doctors'
    },
    "/don-vi-truc-thuoc": {
      en: '/dependent-units'
    },
    "/khoi-co-quan-hanh-chinh": {
      en: '/administration-departments'
    },
    '/tin-hoat-dong': {
      en: '/activity-posts'
    },
    '/tin-tuc': {
      en: '/posts'
    },
    '/vien': {
      en: '/institutes'
    },
  }
});

// chỉ dùng cho trang home
export const getLangSlug = async (
  locale: string,
  slug: string,
): Promise<string> => {
  return locale === routing.defaultLocale ? slug : `${slug}-${locale}`;
};

export function getLocalizedField<T extends Record<string, any>>(
  data: T,
  baseKey: string,
  lang: string,
): string {
  // Nếu ngôn ngữ mặc định là "vi" thì dùng baseKey
  if (lang === routing.defaultLocale) return data?.[baseKey] ?? '';

  const localizedKey = `${baseKey}_${lang}`;
  return data?.[localizedKey] ?? data?.[baseKey] ?? '';
}
