import JsonLDProvider from '@/src/components/common/the-json-ld';
import PageBuilder from '@/src/page-builder';
import { fnGetPageBySlug } from '@/src/services/page';
import { createSeoData } from '@/src/utils/metadata';
import { Metadata, ResolvingMetadata } from 'next';
import { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import ViewTracker from '@/src/components/ViewTracker';
export const revalidate = 300;

// ISR: no page is built ahead, each one is rendered on its first visit and then cached (HTML and
// RSC), until `revalidate` or /api/revalidate. Without this export Next 15 renders the route on
// every request (Cache-Control: no-store) and nothing can cache it.
export function generateStaticParams() {
  return [];
}


type Props = {
  params: Promise<{ locale: string; slug: string; cate: string }>;
};

export async function generateMetadata(
  { params }: Props,
  _parent: ResolvingMetadata,
): Promise<Metadata> {
  const { locale, slug, cate } = await params;

  const regex = /^[a-zA-Z0-9-_]+$/;
  if (!locale || !slug || !cate || !regex.test(slug) || !regex.test(cate)) {
    return notFound();
  }

  const data = await fnGetPageBySlug(slug);
  const seo = createSeoData(data?.seo, locale, `${slug}/${cate}`) ?? {};
  return seo;
}

export default async function Page({ params }: Props) {
  const { locale, slug, cate } = await params;

  const regex = /^[a-zA-Z0-9-_]+$/;
  
  if (!locale || !slug || !cate || !regex.test(slug) || !regex.test(cate)) {
    notFound();
  }

  setRequestLocale(locale as Locale);

  const pageContent = await fnGetPageBySlug(slug);
  const pageSchema = pageContent?.seo?.meta_schema;

  return (
    <>
      <JsonLDProvider pageSchema={pageSchema} />
      <ViewTracker collection="pages" slug={slug} />
      <PageBuilder pageContent={pageContent} />
    </>
  );
}
