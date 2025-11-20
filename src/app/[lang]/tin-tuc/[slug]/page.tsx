import { fnGetNewsDetailBySlug, getNewsDetail } from '@/src/services/news';
import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next';
import { checkValueNull } from '@/src/utils/validate';
import NewsDetail from '@/src/components/sections/news/NewsDetail';

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
  
  const data = await fnGetNewsDetailBySlug('posts_by_id', slug);
  if (!data) notFound();

  const imageUrl = data?.thumbnail?.id
    ? `${process.env.NEXT_PUBLIC_ASSETS_URL}${data.thumbnail.id}`
    : '/assets/images/open_graph.png';

  return {
    title: checkValueNull(data?.title, ''),
    keywords: 'Bệnh viện Quân Y 175',
    description: checkValueNull(data?.blurb, ''),
    openGraph: {
      locale: 'vi_VN',
      alternateLocale: 'en_US',
      siteName: checkValueNull(data?.title, ''),
      title: checkValueNull(data?.title, ''),
      description: checkValueNull(data?.blurb, ''),
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
  const post = await getNewsDetail({ collection: 'posts', slug });

  if (!post) {
    notFound();
  }

  return (
    <div className='padding-top-body'>
      <NewsDetail post={post} />
    </div>
  );
};

export default NewsDetailPage;
