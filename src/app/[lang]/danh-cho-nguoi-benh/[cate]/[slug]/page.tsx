import { getNewsDetail } from '@/src/services/news';
import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next';
import { checkValueNull } from '@/src/utils/validate';
import { cookies } from 'next/headers';
import JsonLDProvider from '@/src/components/common/the-json-ld';
import PageBuilder from '@/src/page-builder';
import { fnGetPageBySlug } from '@/src/services/page';

async function getLang() {
  const cookieStore = await cookies();
  const lang: string = cookieStore.get('language')?.value ?? 'vi';
  return lang;
}

async function getLangSlugNewsDetail(): Promise<string> {
  const lang = await getLang();
  return lang === 'en'
    ? 'chi-tiet-tin-danh-cho-nguoi-benh-en'
    : 'chi-tiet-tin-danh-cho-nguoi-benh';
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
  const data = await getNewsDetail({ collection: 'for_patient_posts', slug });
  if (!data) notFound();

  const title =
    lang === 'en'
      ? checkValueNull(data?.title_en, '')
      : checkValueNull(data?.title, '');

  const description =
    lang === 'en'
      ? checkValueNull(data?.blurb_en, '')
      : checkValueNull(data?.blurb, '');

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
  const { slug } = await params;
  const post = await getNewsDetail({ collection: 'for_patient_posts', slug });
  const langSlug = await getLangSlugNewsDetail();
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
