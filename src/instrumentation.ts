// Runs once per server start. Exposes Next's draftMode() to src/lib/directus.ts, which is also
// bundled into client components and therefore cannot import 'next/headers' itself.
export async function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return;
  const { draftMode } = await import('next/headers');
  (globalThis as any).__bv175DraftMode = draftMode;
}
