// POST /api/revalidate  — called by the CMS (raw-content-builder hook) after content changes.
//   Authorization: Bearer <REVALIDATE_SECRET>
//   body: { type: 'page' | 'menu' | 'post' | 'all' | ..., slug?: string }  or  { items: [...] }
// Marks the affected routes stale (see src/lib/revalidate.ts); they rebuild on the next visit.
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
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
  return NextResponse.json({ revalidated: targets, now: Date.now() });
}
