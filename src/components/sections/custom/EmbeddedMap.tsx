'use client';
import CustomLink from '@/src/components/common/custom-link';
import NextImg from '@/src/components/common/next-img';
import { CommonSection } from '@/src/types/pageBuilder';
import { getAssetUrlById } from '@/src/utils/image';
import Link from 'next/link';
import React from 'react';

export default function EmbeddedMap({ data }: CommonSection) {
  const buttonViewMap = data?.buttons?.[0] || {};
  const buttonViewMap360 = data?.buttons?.[1] || {};
  return (
    <div className="3xl:py-[100px container py-10 md:py-6 lg:py-10 xl:py-[60px] 2xl:py-[80px] 3xl:py-[100px]">
      <p className="section-title mt-2 text-center">{data.title}</p>
      <div
        className="section-content mx-auto text-justify"
        style={data?.custom ?? {}}
        dangerouslySetInnerHTML={{
          __html: data?.blurb,
        }}
      ></div>

      <div className="mb-2 mt-6 flex justify-end md:mt-8 lg:mt-10 xl:mt-12">
        <CustomLink
          href={buttonViewMap?.url || '#'}
          className="font-normal italic text-primary-500"
        >
          {buttonViewMap?.title}
        </CustomLink>
      </div>

      <div
        dangerouslySetInnerHTML={{
          __html: data?.cover,
        }}
      ></div>

      <p className="section-title mt-20 text-center">{data?.subtitle}</p>
      <CustomLink
        href={buttonViewMap360?.url}
        className="relative block aspect-video"
      >
        <NextImg
          src={getAssetUrlById(buttonViewMap360?.icon?.id)}
          alt="map-360"
        />
      </CustomLink>
    </div>
  );
}
