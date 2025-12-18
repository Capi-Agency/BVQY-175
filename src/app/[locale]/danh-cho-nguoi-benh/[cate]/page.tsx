import { cookies } from 'next/headers';

import { Metadata, ResolvingMetadata } from 'next';
import { fnGetPageBySlug } from '@/src/services/page';
import JsonLDProvider from '@/src/components/common/the-json-ld';
import PageBuilder from '@/src/page-builder';
import { createSeoData } from '@/src/utils/metadata';
import { getNewsCategoryDetail, getNewsDetail } from '@/src/services/news';

async function getLangSlug(): Promise<string> {
  const cookieStore = await cookies();
  const lang = cookieStore.get('language')?.value ?? 'vi';
  return lang === 'en' ? 'danh-cho-nguoi-benh-en' : 'danh-cho-nguoi-benh';
}

export async function generateMetadata(
  _props: any,
  _parent: ResolvingMetadata,
): Promise<Metadata> {
  const langSlug = await getLangSlug();
  const data = await fnGetPageBySlug(langSlug);
  const seo = createSeoData(data?.seo) ?? {};
  return seo;
}

type Props = {
  params: Promise<{
    cate: string;
  }>;
};

export default async function HomePage({ params }: Props) {
  const langSlug = await getLangSlug();
  const pageContent = await fnGetPageBySlug(langSlug);

  const pageSchema = pageContent?.seo?.meta_schema;

  return (
    <>
      <JsonLDProvider pageSchema={pageSchema} />
      <PageBuilder pageContent={pageContent} />
    </>
  );
}
