// Astro-compatible routing configuration
export const routing = {
  locales: ['vi', 'en'],
  defaultLocale: 'vi',
};

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
