import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const ALLOWED_COLLECTIONS = [
  'posts',
  'department_groups',
  'departments',
  'administration_departments',
  'dependent_units',
  'doctors',
  'administrative_leaders'
];

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ collection: string; slug: string }> }
) {
  const { collection, slug } = await params;

  if (!ALLOWED_COLLECTIONS.includes(collection)) {
    return NextResponse.json({ error: 'Invalid collection' }, { status: 400 });
  }

  const cookieStore = await cookies();
  const viewedKey = `viewed_${collection}_${slug}`;

  if (cookieStore.get(viewedKey)) {
    return NextResponse.json({ ok: true, counted: false });
  }

  const internalDirectusUrl = process.env.NEXT_PUBLIC_API_URL || 'http://core_cms:8055/';
  const res = await fetch(
    `${internalDirectusUrl}increment-views/${collection}/${slug}`,
    {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${process.env.DIRECTUS_STATIC_TOKEN}` },
    }
  );

  if (!res.ok) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  const response = NextResponse.json({ ok: true, counted: true });
  response.cookies.set(viewedKey, '1', { maxAge: 60 * 60 * 12 });
  return response;
}
