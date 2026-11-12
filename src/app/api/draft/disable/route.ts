// GET /api/draft/disable?to=/vi/... — leave draft mode (back to the cached public pages).
import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  (await draftMode()).disable();
  const to = new URL(req.url).searchParams.get('to') || '/';
  redirect(to.startsWith('/') && !to.startsWith('//') ? to : '/');
}
