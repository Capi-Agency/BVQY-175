import { Metadata, ResolvingMetadata } from 'next';
import { fnGetPageBySlug } from '@/src/services/page';
import JsonLDProvider from '@/src/components/common/the-json-ld';
import PageBuilder from '@/src/page-builder';
import { createSeoData } from '@/src/utils/metadata';
import { getLangSlug } from '@/src/i18n/routing';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(
  { params }: Props,
  _parent: ResolvingMetadata,
): Promise<Metadata> {
  const { locale } = await params;
  const langSlug = getLangSlug(locale, 'danh-cho-nguoi-benh');

  const data = await fnGetPageBySlug(langSlug);
  const seo = createSeoData(data?.seo) ?? {};
  return seo;
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const langSlug = getLangSlug(locale, 'danh-cho-nguoi-benh');

  const pageContent = await fnGetPageBySlug(langSlug);
  const pageSchema = pageContent?.seo?.meta_schema;

  return (
    <>
      <JsonLDProvider pageSchema={pageSchema} />
      <PageBuilder pageContent={pageContent} />
    </>
  );
}
