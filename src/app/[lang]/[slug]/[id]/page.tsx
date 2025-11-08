import { fnGetNewsDetailBySlug } from '@/src/services/news';
import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next';
import { checkValueNull } from '@/src/utils/validate';
import TheHeader from '@/src/components/common/the-header';
import TheFooter from '@/src/components/common/the-footer';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata(
  { params }: Props,
  _parent: ResolvingMetadata,
): Promise<Metadata> {
  const { id } = await params;
  const idRegex = /^[a-zA-Z0-9-_]+$/;
  if (!id || !idRegex.test(id)) return notFound();
  const data = await fnGetNewsDetailBySlug('posts_by_id', id);
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

export default async function NewsDetailPage({ params }: Props) {
  const { id } = await params;
  console.log('id', id);
  // check lỗi khi mở devtool sẽ nhảy vào trang chi tiết bài viết gọi api
  const idRegex = /^[a-zA-Z0-9-_]+$/;
  if (!id || !idRegex.test(id)) {
    notFound();
  }
  const data = await fnGetNewsDetailBySlug('posts_by_id', id);
  if (!data) {
    notFound();
  }
  return (
    <div className="relative">
      <TheHeader data={{ default: true, slug: 'top-nav' }} />

      <TheFooter data={{ default: true, slug: 'bottom-nav' }} />
    </div>
  );
}
