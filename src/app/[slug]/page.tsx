import JsonLDProvider from '@/src/components/common/the-json-ld';
import PageBuilder from '@/src/page-builder';
import { fnGetPageBySlug } from '@/src/services/page';
import { PageContent } from '@/src/types/pageBuilder';
import { METADATA, SETTINGS } from '@/src/utils/const';
import { getAssetUrlById } from '@/src/utils/image';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const DynamicPage = async ({ params }: PageProps) => {
  const { slug } = await params;
  const pageContent = await fnGetPageBySlug(slug);
  if (!pageContent) notFound();
  const pageSchema = pageContent?.schema;
  return (
    <>
      <JsonLDProvider pageSchema={pageSchema} />
      <PageBuilder pageContent={pageContent} />
    </>
  );
};

export default DynamicPage;

type Params = {
  params: Promise<{
    [key: string]: string;
  }>;
};

export async function generateMetadata(
  { params }: Params,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;
  const pageContent: PageContent = await fnGetPageBySlug(slug);
  const imageUrl = getAssetUrlById(
    (pageContent?.meta_image as { id: string })?.id,
  );
  return {
    title: pageContent?.meta_title || METADATA.DEFAULT_META_TITLE,
    description:
      pageContent?.meta_description || METADATA.DEFAULT_META_DESCRIPTION,
    keywords:
      pageContent?.meta_keywords?.join(', ') || METADATA.DEFAULT_META_KEYWORDS,
    openGraph: {
      title: pageContent?.meta_title || METADATA.DEFAULT_OG_TITLE,
      description: pageContent?.meta_title || METADATA.DEFAULT_OG_DESCRIPTION,
      images: [imageUrl],
    },
    alternates: {
      canonical: SETTINGS.PROJECT_URL,
    },
  };
}
