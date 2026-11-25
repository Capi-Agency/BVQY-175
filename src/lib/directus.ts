import { createDirectus, graphql, readItems, rest, staticToken } from '@directus/sdk';

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

// The CMS is read only by the server of this app, with the token of the "Website (chỉ đọc)" policy
// (CMS migration M21): anonymous visitors can no longer read items, only image files (/assets).
// Server only: not a NEXT_PUBLIC_ variable. Browser components call the services in src/services
// through server actions ('use server'), so they run here with the token too.
const WEBSITE_TOKEN = typeof window === 'undefined' ? process.env.DIRECTUS_WEBSITE_TOKEN : undefined;
if (typeof window === 'undefined' && !WEBSITE_TOKEN) {
  console.error('[directus] DIRECTUS_WEBSITE_TOKEN is not set: CMS requests are anonymous and will be refused');
}
const base = WEBSITE_TOKEN ? createDirectus(API_URL).with(staticToken(WEBSITE_TOKEN)) : createDirectus(API_URL);
const publicGraphql = base.with(graphql());
const publicRest = base.with(rest());

// Draft mode (Directus Live Preview, /api/draft): the same requests are sent with the preview
// token, which can also read unpublished pages and posts. Server only: the token is not a
// NEXT_PUBLIC_ variable, so in the browser it is undefined and the public clients are used.
const PREVIEW_TOKEN = typeof window === 'undefined' ? process.env.DIRECTUS_PREVIEW_TOKEN : undefined;
const previewGraphql = PREVIEW_TOKEN ? createDirectus(API_URL).with(staticToken(PREVIEW_TOKEN)).with(graphql()) : null;
const previewRest = PREVIEW_TOKEN ? createDirectus(API_URL).with(staticToken(PREVIEW_TOKEN)).with(rest()) : null;

async function draftEnabled(): Promise<boolean> {
  const draftMode = (globalThis as any).__bv175DraftMode; // set in src/instrumentation.ts
  if (!PREVIEW_TOKEN || !draftMode) return false;
  try {
    // read synchronously when possible: awaiting suspends the render and Next then streams the
    // loading.tsx fallback before the page (different HTML for every public visitor)
    const dm = draftMode();
    if (typeof dm?.isEnabled === 'boolean') return dm.isEnabled;
    return (await dm).isEnabled === true;
  } catch {
    return false; // outside a request (build, generateStaticParams)
  }
}

function switching<T extends object>(pub: T, preview: T | null): T {
  if (!preview) return pub;
  return new Proxy(pub, {
    get(target, prop, receiver) {
      if (prop === 'request' || prop === 'query') {
        return async (...args: unknown[]) => {
          const client: any = (await draftEnabled()) ? preview : target;
          return client[prop](...args);
        };
      }
      return Reflect.get(target, prop, receiver);
    },
  });
}

const directusClient = switching(publicGraphql, previewGraphql);
const directusClientWithRest = switching(publicRest, previewRest);

export { directusClient, directusClientWithRest };

/**
 * Read one item by its slug. Since CMS migration M24 the primary key of pages, posts, departments,
 * department_groups, dependent_units, administration_departments, administrative_leaders, doctors,
 * p_categories and p_tags is a numeric id; slug is a unique field the editors can change.
 * Same contract as readItem(collection, slug): a missing (or not readable) item throws a 403-like
 * error, so the callers' error handling (notFound...) is unchanged.
 */
export function readItemBySlug(collection: string, slug: string, query: Record<string, any> = {}) {
  return async (client: any): Promise<any> => {
    // the collection is dynamic here: the SDK's schema typing cannot apply
    const read = readItems as (collection: string, query: Record<string, any>) => any;
    const rows = await client.request(
      read(collection, { ...query, filter: { slug: { _eq: slug } }, limit: 1 }),
    );
    if (!Array.isArray(rows) || rows.length === 0) {
      throw { errors: [{ message: `${collection} "${slug}" not found`, extensions: { code: 'FORBIDDEN' } }], response: { status: 403 } };
    }
    return rows[0];
  };
}

// Live Preview of a page: Directus reloads the preview right after "Save", before its hook has
// rewritten pages.raw_content (debounced, after the response). In draft mode the page is built now
// from its blocks by the CMS endpoint raw-content-preview. undefined = not in draft mode, or the
// endpoint is unavailable: the caller then reads the stored raw_content as before.
export async function previewPageRawContent(slug: string): Promise<unknown | undefined> {
  if (!(await draftEnabled())) return undefined;
  try {
    const base = API_URL.replace(/\/?$/, '/');
    const res = await fetch(`${base}raw-content/page/${encodeURIComponent(slug)}`, {
      headers: { Authorization: `Bearer ${PREVIEW_TOKEN}` },
      cache: 'no-store',
    });
    if (!res.ok) return undefined;
    return (await res.json())?.data?.raw_content ?? undefined;
  } catch {
    return undefined;
  }
}
