import JsonLDProvider from '@/src/components/common/the-json-ld';
import { getLangSlug } from '@/src/i18n/routing';
import PageBuilder from '@/src/page-builder';
import { fnGetPageBySlug } from '@/src/services/page';
import { createSeoData } from '@/src/utils/metadata';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata(
  { params }: Props,
  _parent: ResolvingMetadata,
): Promise<Metadata> {
  const { locale, slug } = await params;
  const langSlug = getLangSlug(locale, slug);

  const data = await fnGetPageBySlug(langSlug);
  const seo = createSeoData(data?.seo) ?? {};
  return seo;
}

export default async function Page({ params }: Props) {
  const { locale, slug } = await params;
  if (!slug) {
    notFound();
  }

  const langSlug = getLangSlug(locale, slug);
  const pageContent = await fnGetPageBySlug(langSlug);
  const pageSchema = pageContent?.seo?.meta_schema;

  return (
    <>
      <JsonLDProvider pageSchema={pageSchema} />
      <PageBuilder pageContent={pageContent} />
    </>
  );
}
