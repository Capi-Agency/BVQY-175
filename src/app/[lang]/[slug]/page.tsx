import JsonLDProvider from '@/src/components/common/the-json-ld';
import PageBuilder from '@/src/page-builder';
import { fnGetPageBySlug } from '@/src/services/page';
import { checkValueNull } from '@/src/utils/validate';
import { Metadata, ResolvingMetadata } from 'next';
import { cookies } from 'next/headers';

import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ slug: string }>;
};

async function getLangSlug(slug: string): Promise<string> {
  const cookieStore = await cookies();
  const lang = cookieStore.get('language')?.value ?? 'vi';
  return lang === 'vi' ? slug : `${slug}-en`;
}

export async function generateMetadata(
  { params }: Props,
  _parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;
  const langSlug = await getLangSlug(slug);

  const data = await fnGetPageBySlug(langSlug);
  const seo = data?.seo ?? {};

  return {
    title: checkValueNull(seo?.meta_title, ''),
    keywords: Array.isArray(seo?.meta_keyword)
      ? seo?.meta_keyword.join(', ')
      : '',
    description: checkValueNull(seo?.meta_description, ''),
    openGraph: {
      title: checkValueNull(seo?.meta_title, ''),
      description: checkValueNull(seo?.meta_description, ''),
      images: seo?.meta_cover?.id
        ? [`${process.env.NEXT_PUBLIC_ASSETS_URL}${seo?.meta_cover.id}`]
        : [],
      url: process.env.SITE_URL ?? '',
      type: 'website',
    },
    alternates: {
      canonical: process.env.SITE_URL ?? '',
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (!slug) {
    notFound();
  }
  const langSlug = await getLangSlug(slug);
  const pageContent = await fnGetPageBySlug(langSlug);
  const pageSchema = pageContent?.seo?.meta_schema;

  return (
    <>
      <JsonLDProvider pageSchema={pageSchema} />
      <PageBuilder pageContent={pageContent} />
    </>
  );
}
