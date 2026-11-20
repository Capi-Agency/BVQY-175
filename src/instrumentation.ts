// Runs once per server start. Exposes Next's draftMode() to src/lib/directus.ts, which is also
// bundled into client components and therefore cannot import 'next/headers' itself.
export async function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return;
  const { draftMode } = await import('next/headers');
  (globalThis as any).__bv175DraftMode = draftMode;

  // New build: pages cached by nginx point to the JS chunks of the previous build. Change the
  // nginx cache generation now and again once this server takes the traffic (a deploy may keep
  // the old container running for a while).
  if (process.env.NEXT_PHASE === 'phase-production-build') return; // `next build` workers
  const { bumpNginxCache } = await import('./lib/nginx-cache');
  for (const ms of [0, 15_000, 45_000]) setTimeout(() => void bumpNginxCache('server start'), ms).unref?.();
}
