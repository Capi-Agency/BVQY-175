import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next';
import { checkValueNull } from '@/src/utils/validate';
import { cookies } from 'next/headers';
import JsonLDProvider from '@/src/components/common/the-json-ld';
import PageBuilder from '@/src/page-builder';
import { fnGetPageBySlug } from '@/src/services/page';
import { fnGetDoctorDetail } from '@/src/services/doctors';

async function getLangSlug(): Promise<string> {
  const cookieStore = await cookies();
  const lang = cookieStore.get('language')?.value ?? 'vi';
  return lang === 'en' ? 'chi-tiet-bac-si-en' : 'chi-tiet-bac-si';
}

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata(
  { params }: Props,
  _parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;
  const idRegex = /^[a-zA-Z0-9-_]+$/;
  if (!slug || !idRegex.test(slug)) return notFound();

  const langSlug = await getLangSlug();
  const data = await fnGetDoctorDetail({ collection: 'doctors', slug });
  const pageContent = await fnGetPageBySlug(langSlug);
  if (!data) notFound();

  const title =
    'Bác sĩ ' + checkValueNull(data?.full_name, '') + ' | Bệnh viện Quân y 175';

  const description = checkValueNull(data?.hospital_title, '');

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
      images: pageContent?.seo?.meta_cover?.id
        ? [
            `${process.env.NEXT_PUBLIC_ASSETS_URL}${pageContent?.seo?.meta_cover.id}`,
          ]
        : [],
      url: process.env.SITE_URL ?? '',
      type: 'website',
    },
    alternates: {
      canonical: process.env.SITE_URL ?? '',
    },
  };
}

const NewsDetailPage = async ({ params }: Props) => {
  const { slug } = await params;
  const dataDetail = await fnGetDoctorDetail({ collection: 'doctors', slug });
  const langSlug = await getLangSlug();
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
