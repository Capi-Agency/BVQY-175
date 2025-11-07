import { cookies } from 'next/headers';
import PageBuilder from '../page-builder';
import { fnGetPageBySlug } from '../services/page';
import { Metadata, ResolvingMetadata } from 'next';
import JsonLDProvider from '../components/common/the-json-ld';
import { checkValueNull } from '../utils/validate';

async function getLangSlugHome(): Promise<string> {
  const cookieStore = await cookies();
  const lang = cookieStore.get('language')?.value ?? 'vi';
  return lang === 'en' ? 'trang-chu-en' : 'trang-chu';
}

export async function generateMetadata(
  _props: any,
  _parent: ResolvingMetadata,
): Promise<Metadata> {
  const langSlug = await getLangSlugHome();
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

export default async function HomePage() {
  const langSlug = await getLangSlugHome();
  const pageContent = await fnGetPageBySlug(langSlug);

  const pageSchema = pageContent?.seo?.meta_schema;

  return (
    <>
      <JsonLDProvider pageSchema={pageSchema} />
      <PageBuilder pageContent={pageContent} />
    </>
  );
}
