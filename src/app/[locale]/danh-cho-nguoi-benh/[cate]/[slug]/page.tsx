import { getNewsDetail } from '@/src/services/news';
import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next';
import { checkValueNull } from '@/src/utils/validate';
import { cookies } from 'next/headers';
import JsonLDProvider from '@/src/components/common/the-json-ld';
import PageBuilder from '@/src/page-builder';
import { fnGetPageBySlug } from '@/src/services/page';
import { getLangSlug, getLocalizedField } from '@/src/i18n/routing';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata(
  { params }: Props,
  _parent: ResolvingMetadata,
): Promise<Metadata> {
  const { locale, slug } = await params;
  const idRegex = /^[a-zA-Z0-9-_]+$/;
  if (!slug || !idRegex.test(slug)) return notFound();

  const data = await getNewsDetail({ collection: 'for_patient_posts', slug });
  if (!data) notFound();

  const title = checkValueNull(getLocalizedField(data, 'title', locale), '');
  const description = checkValueNull(
    getLocalizedField(data, 'blurb', locale),
    '',
  );

  const imageUrl = data?.thumbnail?.id
    ? `${process.env.NEXT_PUBLIC_ASSETS_URL}${data.thumbnail.id}`
    : '/assets/images/open_graph.png';

  return {
    title,
    keywords: 'Bệnh viện Quân y 175',
    description,
    openGraph: {
      locale: 'vi_VN',
      alternateLocale: 'en_US',
      siteName: title,
      title,
      description,
      images: [imageUrl],
      url: process.env.SITE_URL ?? '',
      type: 'website',
    },
    alternates: {
      canonical: process.env.SITE_URL ?? '',
    },
  };
}

const NewsDetailPage = async ({ params }: Props) => {
  const { locale, slug } = await params;
  const langSlug = getLangSlug(locale, 'chi-tiet-tin-danh-cho-nguoi-benh');

  const post = await getNewsDetail({ collection: 'for_patient_posts', slug });
  const pageContent = await fnGetPageBySlug(langSlug);

  const pageSchema = pageContent?.seo?.meta_schema;

  if (!post) {
    notFound();
  }

  return (
    <>
      <JsonLDProvider pageSchema={pageSchema} />
      <PageBuilder pageContent={pageContent} pageDetail={post} />
    </>
  );
};

export default NewsDetailPage;
