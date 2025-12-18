import { cookies } from 'next/headers';

import { Metadata, ResolvingMetadata } from 'next';
import { fnGetPageBySlug } from '@/src/services/page';
import JsonLDProvider from '@/src/components/common/the-json-ld';
import PageBuilder from '@/src/page-builder';
import { createSeoData } from '@/src/utils/metadata';

async function getLangSlug(): Promise<string> {
  const cookieStore = await cookies();
  const lang = cookieStore.get('language')?.value ?? 'vi';
  return lang === 'en' ? 'tin-hoat-dong-en' : 'tin-hoat-dong';
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

export default async function HomePage() {
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
