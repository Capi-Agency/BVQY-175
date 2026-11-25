// GET /api/draft?secret=<PREVIEW_SECRET>&type=page|post&slug=<slug>
// Directus Live Preview opens this URL (collection setting "preview_url"). It turns on Next draft
// mode (cookie) and redirects to the page: while draft mode is on, pages are rendered on every
// request (no ISR cache) and the CMS is read with DIRECTUS_PREVIEW_TOKEN, so unpublished pages and
// posts are visible. Leave with /api/draft/disable.
import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import { FALLBACK_CATEGORY, postCanonicalPath, postCategorySlugs } from '@/src/lib/seo/primary-category';
import { pagePreviewPath } from '@/src/lib/preview';
import { secretMatches } from '@/src/lib/secret';

export const dynamic = 'force-dynamic';

const SLUG_RE = /^[a-zA-Z0-9-_]+$/;
const API = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/?$/, '/');

async function postPreviewPath(slug: string) {
  let categories: string[] = [];
  try {
    const res = await fetch(
      `${API}items/posts?limit=1&filter[slug][_eq]=${encodeURIComponent(slug)}&fields=categories.category.translations.slug,categories.category.translations.languages_code`,
      { headers: { Authorization: `Bearer ${process.env.DIRECTUS_PREVIEW_TOKEN}` }, cache: 'no-store' },
    );
    if (res.ok) categories = postCategorySlugs((await res.json())?.data?.[0]);
  } catch {
    /* fall back to the general category */
  }
  return postCanonicalPath(slug, categories, FALLBACK_CATEGORY);
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const slug = url.searchParams.get('slug') || '';
  const type = url.searchParams.get('type') || 'page';
  if (!secretMatches(url.searchParams.get('secret'), process.env.PREVIEW_SECRET)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  if (!SLUG_RE.test(slug) || !['page', 'post'].includes(type)) {
    return NextResponse.json({ error: 'invalid type or slug' }, { status: 400 });
  }
  const path = type === 'post' ? await postPreviewPath(slug) : pagePreviewPath(slug);
  (await draftMode()).enable();
  redirect(path);
}
