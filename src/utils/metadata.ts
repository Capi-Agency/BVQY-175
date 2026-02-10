import { checkValueNull } from '@/src/utils/validate';
import { Locale } from '@/src/i18n/navigation';
import { routing } from '../i18n/routing';

export const createSeoData = (
  seo: any,
  locale: any = routing.defaultLocale,
  slug?: string,
) => {
  const siteUrl =
    import.meta.env.PUBLIC_SITE_URL ||
    import.meta.env.SITE_URL ||
    'https://www.benhvien175.vn';
  const assetsUrl =
    import.meta.env.PUBLIC_ASSETS_URL ||
    import.meta.env.NEXT_PUBLIC_ASSETS_URL ||
    'https://admin175.minhkhang.net/assets/';

  const canonical = slug
    ? `${siteUrl}/${locale}/${slug}`
    : `${siteUrl}/${locale}`;

  const languages = Object.fromEntries(
    routing.locales.map((lang) => [
      lang,
      slug ? `${siteUrl}/${lang}/${slug}` : `${siteUrl}/${lang}`,
    ]),
  );

  return {
    title: checkValueNull(seo?.meta_title, ''),
    keywords: Array.isArray(seo?.meta_keyword)
      ? seo?.meta_keyword.join(', ')
      : '',
    description: checkValueNull(seo?.meta_description, ''),
    openGraph: {
      locale: 'vi_VN',
      alternateLocale: 'en_US',
      siteName: checkValueNull(seo?.meta_title, ''),
      title: checkValueNull(seo?.meta_title, ''),
      description: checkValueNull(seo?.meta_description, ''),
      images: seo?.meta_cover?.id ? [`${assetsUrl}${seo?.meta_cover?.id}`] : [],
      url: `${siteUrl}/${locale}`,
      type: 'website',
    },
    alternates: {
      canonical,
      languages,
    },
    metadataBase: new URL(siteUrl),
  };
};

export function cleanTranslationsDeep(data: any, locale: string): any {
  if (Array.isArray(data)) {
    // Lọc bỏ những phần tử null (tức là không có bản dịch phù hợp)
    return data
      .map((item) => cleanTranslationsDeep(item, locale))
      .filter(Boolean);
  }

  if (data && typeof data === 'object') {
    const cleaned = { ...data };

    if (Array.isArray(cleaned.translations)) {
      const matched = cleaned.translations.find(
        (t: any) =>
          t?.languages_code?.code === locale || t?.languages_code === locale,
      );

      // Fallback to default locale if current locale not found
      if (!matched && locale !== routing.defaultLocale) {
        matched = cleaned.translations.find(
          (t: any) =>
            t?.languages_code?.code === routing.defaultLocale ||
            t?.languages_code === routing.defaultLocale,
        );
      }

      // If still no match found
      if (!matched) {
        // If the object has raw_content (like navigation menus), keep it
        if (cleaned.raw_content) {
          delete cleaned.translations;
        } else {
          return null;
        }
      } else {
        // ✅ Nếu có bản dịch phù hợp → merge vào object gốc
        Object.assign(cleaned, matched);

        // Xóa trường translations cho gọn
        delete cleaned.translations;
      }
    }

    // Đệ quy xử lý các trường con
    for (const key of Object.keys(cleaned)) {
      if (typeof cleaned[key] === 'object') {
        cleaned[key] = cleanTranslationsDeep(cleaned[key], locale);
      }
    }

    return cleaned;
  }

  return data;
}
