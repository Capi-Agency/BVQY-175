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
