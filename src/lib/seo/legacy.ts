// URLs of the old WordPress site (benhvien175.vn until the move to Next): /<post-slug>/, /en/<slug>/,
// /category/<slug>/[page/N/], /dwqa-question/<slug>/, /tag/..., /author/...
// legacy-redirects.json maps each one (lower-case, no trailing slash) to its new URL, or to 410 when the
// content was not carried over. Generated from the WordPress dump by
// BVQY-175-migrated/migration/verify/wp-redirects.mjs (targets verified to answer 200); do not edit by hand.
import table from './legacy-redirects.json';

const LEGACY = table as Record<string, string | number>;
export const GONE = 410;

export function legacyTarget(pathname: string): string | typeof GONE | undefined {
  let p: string;
  try { p = decodeURIComponent(pathname); } catch { p = pathname; }
  p = p.toLowerCase().replace(/\/+$/, '');
  if (!p) return undefined;
  const hit = LEGACY[p] ?? LEGACY[p.replace(/\/(feed|amp|embed)$/, '')]; // WordPress endpoints of the same item
  if (hit !== undefined) return hit as string | typeof GONE;
  const page = p.match(/^((?:\/en)?\/category\/.+?)\/page\/\d+$/); // category archive pages follow the category
  return page ? (LEGACY[page[1]] as string | typeof GONE | undefined) : undefined;
}
