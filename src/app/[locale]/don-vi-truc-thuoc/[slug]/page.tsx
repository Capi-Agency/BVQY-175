import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next';
import { checkValueNull } from '@/src/utils/validate';
import { cookies } from 'next/headers';
import JsonLDProvider from '@/src/components/common/the-json-ld';
import PageBuilder from '@/src/page-builder';
import { fnGetPageBySlug } from '@/src/services/page';
import { fnGetAdminDepartmentDetail } from '@/src/services/adminDepartment';

async function getLang() {
  const cookieStore = await cookies();
  const lang: string = cookieStore.get('language')?.value ?? 'vi';
  return lang;
}

async function getLangSlugDetail(): Promise<string> {
  const lang = await getLang();
  return lang === 'en'
    ? 'chi-tiet-don-vi-truc-thuoc-en'
    : 'chi-tiet-don-vi-truc-thuoc';
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

  const lang = await getLang();
  const data = await fnGetAdminDepartmentDetail({
    collection: 'dependent_units',
    slug,
  });
  if (!data) notFound();

  const title =
    lang === 'en'
      ? checkValueNull(data?.title_en, '')
      : checkValueNull(data?.title, '');

  const description =
    lang === 'en'
      ? checkValueNull(data?.description_en, '')
      : checkValueNull(data?.description, '');

  const imageUrl = data?.cover
    ? `${process.env.NEXT_PUBLIC_ASSETS_URL}${data?.cover}`
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

const DepartmentDetailPage = async ({ params }: Props) => {
  const { slug } = await params;
  const dataDetail = await fnGetAdminDepartmentDetail({
    collection: 'dependent_units',
    slug,
  });
  const langSlug = await getLangSlugDetail();
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

export default DepartmentDetailPage;
