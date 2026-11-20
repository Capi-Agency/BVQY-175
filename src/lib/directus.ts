import { createDirectus, graphql, rest, staticToken } from '@directus/sdk';

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

const publicGraphql = createDirectus(API_URL).with(graphql());
const publicRest = createDirectus(API_URL).with(rest());

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
