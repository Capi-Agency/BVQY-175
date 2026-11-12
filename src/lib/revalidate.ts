// Which cached routes a CMS change makes stale. Pure, shared by /api/revalidate and its tests.
//
// - a regular page (pages.slug)           -> /<locale>/<slug> and its category sub-pages
// - home and the detail templates         -> the route that renders them (all items of that route)
// - menus, footer, metadata, posts, other -> the whole site (posts are listed on many pages)
//
// revalidatePath only marks entries stale: each page is rebuilt on its next visit, so "the whole
// site" costs nothing up front.
import { routing } from '@/src/i18n/routing';

export type RevalidateTarget = { path: string; type?: 'page' | 'layout' };
export type RevalidateRequest = { type?: string; slug?: string };

const SLUG_RE = /^[a-zA-Z0-9-_]+$/;
export const ALL: RevalidateTarget = { path: '/', type: 'layout' };

// page slug (without -en) -> route that renders it
export const TEMPLATE_ROUTES: Record<string, string> = {
  'trang-chu': '/[locale]',
  'chi-tiet-bai-viet': '/[locale]/bai-viet/[cate]/[slug]',
  'chi-tiet-chuyen-khoa': '/[locale]/chuyen-khoa/[slug]',
  'chi-tiet-bac-si': '/[locale]/doi-ngu-bac-si/[slug]',
  'chi-tiet-don-vi-truc-thuoc': '/[locale]/don-vi-truc-thuoc/[slug]',
  'chi-tiet-khoi-co-quan-hanh-chinh': '/[locale]/khoi-co-quan-hanh-chinh/[slug]',
  'chi-tiet-trung-tam': '/[locale]/trung-tam/[slug]',
  'chi-tiet-vien': '/[locale]/vien/[slug]',
};

export function targetsFor(req: RevalidateRequest, locales: readonly string[] = routing.locales): RevalidateTarget[] {
  if (req.type === 'page' && req.slug && SLUG_RE.test(req.slug)) {
    const route = TEMPLATE_ROUTES[req.slug.replace(/-en$/, '')];
    if (route) return [{ path: route, type: 'page' }];
    return [...locales.map((l) => ({ path: `/${l}/${req.slug}` })), { path: '/[locale]/[slug]/[cate]', type: 'page' }];
  }
  return [ALL];
}

/** Merge requests of a batch, collapsing to the whole site when any of them needs it. */
export function targetsForAll(reqs: RevalidateRequest[], locales?: readonly string[]): RevalidateTarget[] {
  const out = new Map<string, RevalidateTarget>();
  for (const r of reqs) {
    for (const t of targetsFor(r, locales)) {
      if (t === ALL) return [ALL];
      out.set(`${t.type ?? ''}:${t.path}`, t);
    }
  }
  return [...out.values()];
}
