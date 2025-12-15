'use client';
import CustomLink from '@/src/components/common/custom-link';
import { CommonSection } from '@/src/types/pageBuilder';
import Link from 'next/link';
import React from 'react';

export default function EmbeddedMap({ data }: CommonSection) {
  const button = data?.buttons?.[0];
  return (
    <div className="3xl:py-[100px container py-10 md:py-6 lg:py-10 xl:py-[60px] 2xl:py-[80px] 3xl:py-[100px]">
      <div
        className="section-content mx-auto text-justify"
        style={data?.custom ?? {}}
        dangerouslySetInnerHTML={{
          __html: data?.blurb,
        }}
      ></div>

      <div className="mb-2 mt-6 flex justify-end md:mt-8 lg:mt-10 xl:mt-12">
        <CustomLink
          href={button?.url || '#'}
          className="font-normal italic text-primary-500"
        >
          {button?.title}
        </CustomLink>
      </div>

      <div
        dangerouslySetInnerHTML={{
          __html: data?.cover,
        }}
      ></div>
    </div>
  );
}
