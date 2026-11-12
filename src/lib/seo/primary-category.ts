// A post can belong to several categories, and /vi/bai-viet/<cate>/<slug> renders for each of them.
// Search engines must see ONE canonical URL per post: the "primary" category.
//
// Rule: the first category (in the order the CMS returns the M2M relation) that is not a
// catch-all category; fall back to the first category. Shared by middleware, post page and sitemap
// so the three always agree.
export const SEO_LOCALE = 'vi';

// Catch-all categories that most posts are also tagged with (e.g. 496/546 multi-category posts are
// "tin-tong-hop" + one specific category). Never chosen as primary unless it is the only one.
export const GENERAL_CATEGORIES = new Set(['tin-tong-hop']);

export function pickPrimaryCategory(categorySlugs: string[]): string | undefined {
  const slugs = categorySlugs.filter(Boolean);
  return slugs.find((s) => !GENERAL_CATEGORIES.has(s)) ?? slugs[0];
}

/** Extract category slugs (for `locale`) from a post fetched with `categories.category.translations.*`. */
export function postCategorySlugs(post: any, locale: string = SEO_LOCALE): string[] {
  return (post?.categories ?? [])
    .map((c: any) => {
      const tr = c?.category?.translations ?? [];
      const match = tr.find((t: any) => (t?.languages_code?.code ?? t?.languages_code) === locale);
      return match?.slug as string | undefined;
    })
    .filter(Boolean) as string[];
}

export function postCanonicalPath(slug: string, categorySlugs: string[], fallbackCate: string, locale = SEO_LOCALE) {
  const cate = pickPrimaryCategory(categorySlugs) ?? fallbackCate;
  return `/${locale}/bai-viet/${cate}/${slug}`;
}
