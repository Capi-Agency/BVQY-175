// URL normalisation for SEO, evaluated in middleware BEFORE rendering.
//
// Why here and not in the pages: app/loading.tsx wraps the whole [locale] tree in a Suspense
// boundary, so the HTML shell is flushed with status 200 before a page can call notFound().
// Unknown URLs therefore returned "200 + noindex" (soft 404). Deciding in middleware lets us send a
// real 404 / 308 without touching the render tree (UI unchanged).
//
// Safety: any CMS/network error => 'ok' (let the page render as before). Never 404 on doubt.
import { FALLBACK_CATEGORY, pickPrimaryCategory, SEO_LOCALE } from './primary-category';

export type RouteCheck = { kind: 'ok' } | { kind: 'notfound' } | { kind: 'redirect'; to: string };

const OK: RouteCheck = { kind: 'ok' };
const NOT_FOUND: RouteCheck = { kind: 'notfound' };
const SLUG_RE = /^[a-zA-Z0-9-_]+$/;
const API = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/?$/, '/');
// the token of the website policy (anonymous requests are refused since CMS migration M21)
const TOKEN = process.env.DIRECTUS_WEBSITE_TOKEN;
const TTL_FOUND = 60_000;
const TTL_MISSING = 10_000; // short: an item published again must not stay 404 long

// Detail routes whose slug is the primary key of a collection.
const KEY_ROUTES: Record<string, string> = {
  'chuyen-khoa': 'departments',
  'doi-ngu-bac-si': 'doctors',
  'don-vi-truc-thuoc': 'dependent_units',
  'khoi-co-quan-hanh-chinh': 'administration_departments',
};
// department_groups are served under /vien or /trung-tam depending on their parent_group.
const GROUP_ROUTES = new Set(['vien', 'trung-tam']);

type CmsResult = { status: number; data: any } | null; // null = transport/server error
const cache = new Map<string, { exp: number; value: CmsResult }>();

async function cms(path: string): Promise<CmsResult> {
  const hit = cache.get(path);
  if (hit && hit.exp > Date.now()) return hit.value;
  let value: CmsResult;
  try {
    if (!TOKEN) return null; // no token: every item would look missing -> never 404, let the page render
    const res = await fetch(API + path, { headers: { accept: 'application/json', Authorization: `Bearer ${TOKEN}` }, cache: 'no-store' });
    if (res.status >= 500) return null;
    const body = res.status === 200 ? await res.json() : null;
    value = { status: res.status, data: body?.data ?? null };
  } catch {
    return null;
  }
  if (cache.size > 5000) cache.clear();
  // an empty list (200 + []) is a miss too: keep it short so a just-published item shows up fast
  const found = value.status === 200 && value.data != null && !(Array.isArray(value.data) && value.data.length === 0);
  cache.set(path, { exp: Date.now() + (found ? TTL_FOUND : TTL_MISSING), value });
  return value;
}

// Directus answers 403 (website policy) for items that do not exist or are not published.
const missing = (r: CmsResult) => r !== null && (r.status === 403 || r.status === 404 || (r.status === 200 && r.data == null));
const enc = encodeURIComponent;

async function checkPage(slug: string): Promise<RouteCheck> {
  if (slug === 'trang-chu') return { kind: 'redirect', to: `/${SEO_LOCALE}` }; // duplicate of the home page
  if (slug.startsWith('chi-tiet')) return NOT_FOUND; // detail templates, not real pages
  const r = await cms(`items/pages/${enc(slug)}?fields=slug,language`);
  if (r === null) return OK;
  if (missing(r)) return NOT_FOUND;
  const lang = r.data?.language?.code ?? r.data?.language;
  return lang && lang !== SEO_LOCALE ? NOT_FOUND : OK; // English pages (locale disabled)
}

async function categoryExists(cate: string): Promise<boolean | null> {
  const r = await cms(
    `items/p_categories?limit=1&fields=slug&filter[translations][languages_code][_eq]=${SEO_LOCALE}&filter[translations][slug][_eq]=${enc(cate)}`,
  );
  if (r === null) return null;
  return Array.isArray(r.data) && r.data.length > 0;
}

async function checkPost(cate: string, slug: string): Promise<RouteCheck> {
  const r = await cms(
    `items/posts?limit=1&fields=categories.category.translations.slug,categories.category.translations.languages_code` +
      `&filter[translations][languages_code][_eq]=${SEO_LOCALE}&filter[translations][slug][_eq]=${enc(slug)}`,
  );
  if (r === null) return OK;
  const post = Array.isArray(r.data) ? r.data[0] : null;
  if (!post) return NOT_FOUND;
  const cats: string[] = (post.categories ?? [])
    .map((c: any) => (c?.category?.translations ?? []).find((t: any) => t?.languages_code === SEO_LOCALE)?.slug)
    .filter(Boolean);
  if (cats.length === 0) {
    // no category: one URL only, under the fallback category (was: 200 under any word -> duplicates)
    return cate === FALLBACK_CATEGORY ? OK : { kind: 'redirect', to: `/${SEO_LOCALE}/bai-viet/${FALLBACK_CATEGORY}/${slug}` };
  }
  if (cats.includes(cate)) return OK; // valid (non-primary ones get a canonical tag)
  return { kind: 'redirect', to: `/${SEO_LOCALE}/bai-viet/${pickPrimaryCategory(cats)}/${slug}` };
}

async function checkKey(collection: string, slug: string): Promise<RouteCheck> {
  const r = await cms(`items/${collection}/${enc(slug)}?fields=slug`);
  if (r === null) return OK;
  return missing(r) ? NOT_FOUND : OK;
}

async function checkGroup(route: string, slug: string): Promise<RouteCheck> {
  const r = await cms(`items/department_groups/${enc(slug)}?fields=slug,parent_group`);
  if (r === null) return OK;
  if (missing(r)) return NOT_FOUND;
  const parent = r.data?.parent_group;
  if (parent === route) return OK;
  // linked from the site under the other prefix -> send to the right one instead of a duplicate
  return GROUP_ROUTES.has(parent) ? { kind: 'redirect', to: `/${SEO_LOCALE}/${parent}/${slug}` } : NOT_FOUND;
}

export async function checkRoute(pathname: string): Promise<RouteCheck> {
  const parts = pathname.split('/').filter(Boolean).map((p) => {
    try { return decodeURIComponent(p); } catch { return p; }
  });
  if (parts[0] !== SEO_LOCALE) return OK; // only the active locale is handled here
  if (parts.length === 1) return OK; // home
  if (parts.slice(1).some((p) => !SLUG_RE.test(p))) return NOT_FOUND; // pages reject these too

  const [, a, b, c] = parts;
  switch (parts.length) {
    case 2:
      return checkPage(a);
    case 3:
      if (a === 'bai-viet') {
        const exists = await categoryExists(b);
        return exists === false ? NOT_FOUND : OK;
      }
      if (KEY_ROUTES[a]) return checkKey(KEY_ROUTES[a], b);
      if (GROUP_ROUTES.has(a)) return checkGroup(a, b);
      return NOT_FOUND; // [slug]/[cate] used to render the parent page for ANY second segment (duplicate)
    case 4:
      return a === 'bai-viet' ? checkPost(b, c) : NOT_FOUND;
    default:
      return NOT_FOUND;
  }
}
