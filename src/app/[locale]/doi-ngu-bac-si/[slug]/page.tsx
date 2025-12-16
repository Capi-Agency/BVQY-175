import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next';
import { checkValueNull } from '@/src/utils/validate';
import JsonLDProvider from '@/src/components/common/the-json-ld';
import PageBuilder from '@/src/page-builder';
import { fnGetPageBySlug } from '@/src/services/page';
import { fnGetDoctorDetail } from '@/src/services/doctors';
import { getLangSlug } from '@/src/i18n/routing';

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

  const data = await fnGetDoctorDetail({ collection: 'doctors', slug });
  if (!data) notFound();

  const title = checkValueNull(data?.full_name, '');
  const description = checkValueNull(data?.hospital_title, '');

  const imageUrl = data?.avatar
    ? `${process.env.NEXT_PUBLIC_ASSETS_URL}${data?.avatar}`
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
  const langSlug = await getLangSlug(locale, 'chi-tiet-bac-si');

  const dataDetail = await fnGetDoctorDetail({ collection: 'doctors', slug });
  const pageContent = await fnGetPageBySlug(langSlug);

  const pageSchema = pageContent?.seo?.meta_schema;

  if (!dataDetail) {
    notFound();
  }

  return (
    <>
      <JsonLDProvider pageSchema={pageSchema} />
      <PageBuilder pageContent={pageContent} pageDetail={dataDetail} />
    </>
  );
};

export default NewsDetailPage;
