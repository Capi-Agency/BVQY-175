// The nginx in front of this app (website_nginx) caches HTML and RSC responses of ISR pages. Its
// cache key holds a "generation" (BVQY-175-migrated: migration/nginx/website-nginx.conf and
// cache-gen.js): a POST to CACHE_BUMP_URL changes it, and every cached page misses once.
// Called after /api/revalidate (content changed in the CMS) and when the server starts (new build:
// cached HTML points to JS chunks of the previous build).
//   CACHE_BUMP_URL=http://website_nginx:8090/bump   (internal port, not routed by the proxy)
const BUMP_URL = process.env.CACHE_BUMP_URL;

export async function bumpNginxCache(reason: string): Promise<string> {
  if (!BUMP_URL) return 'skipped: CACHE_BUMP_URL not set';
  try {
    const res = await fetch(BUMP_URL, { method: 'POST', cache: 'no-store', signal: AbortSignal.timeout(3000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return 'ok';
  } catch (e) {
    console.error(`[nginx-cache] bump after ${reason} failed: ${(e as Error).message}`);
    return 'failed';
  }
}
