import JsonLDProvider from '@/src/components/common/the-json-ld';
import PageBuilder from '@/src/page-builder';
import { fnGetPageBySlug } from '@/src/services/page';
import { createSeoData } from '@/src/utils/metadata';
import { Metadata, ResolvingMetadata } from 'next';
import { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const revalidate = 300;

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};



export async function generateMetadata(
  { params }: Props,
  _parent: ResolvingMetadata,
): Promise<Metadata> {
  const { locale, slug } = await params;
  const regex = /^[a-zA-Z0-9-_]+$/;

  if (!slug || !locale || !regex.test(slug)) {
    notFound();
  }

  const data = await fnGetPageBySlug(slug);
  const seo = createSeoData(data?.seo, locale, slug) ?? {};
  return seo;
}

export default async function Page({ params }: Props) {
  const { locale, slug } = await params;
  const regex = /^[a-zA-Z0-9-_]+$/;

  if (!slug || !locale || !regex.test(slug)) {
    notFound();
  }

  setRequestLocale(locale as Locale);
  
  const pageContent = await fnGetPageBySlug(slug);
  const pageSchema = pageContent?.seo?.meta_schema;

  return (
    <>
      <JsonLDProvider pageSchema={pageSchema} />
      <PageBuilder pageContent={pageContent} />
    </>
  );
}
