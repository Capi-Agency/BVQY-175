// POST /api/revalidate  — called by the CMS (raw-content-builder hook) after content changes.
//   Authorization: Bearer <REVALIDATE_SECRET>
//   body: { type: 'page' | 'menu' | 'post' | 'all' | ..., slug?: string }  or  { items: [...] }
// Marks the affected routes stale (see src/lib/revalidate.ts); they rebuild on the next visit.
import { revalidatePath } from 'next/cache';
import { after, NextResponse } from 'next/server';
import { bumpNginxCache } from '@/src/lib/nginx-cache';
import { targetsForAll, type RevalidateRequest } from '@/src/lib/revalidate';
import { bearer, secretMatches } from '@/src/lib/secret';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  if (!secretMatches(bearer(req), process.env.REVALIDATE_SECRET)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid json' }, { status: 400 });
  }
  const items: RevalidateRequest[] = Array.isArray(body?.items) ? body.items : [body ?? {}];
  const targets = targetsForAll(items.slice(0, 500));
  for (const t of targets) revalidatePath(t.path, t.type);
  // then the nginx cache: after the response, once Next has applied the invalidation above
  // (otherwise nginx could fetch and keep the old page under the new generation)
  after(async () => {
    await new Promise((r) => setTimeout(r, 300));
    await bumpNginxCache('revalidate');
  });
  return NextResponse.json({ revalidated: targets, now: Date.now() });
}
