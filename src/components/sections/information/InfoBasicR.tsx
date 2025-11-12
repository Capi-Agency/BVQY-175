'use client';
import { CommonSection } from '@/src/types/pageBuilder';
import React from 'react';
import NextImg from '../../common/next-img';
import { getAssetUrlById } from '@/src/utils/image';
import Link from 'next/link';
import useStoreLanguage from '@/src/store/store';

export default function InfoBasicR({ data }: CommonSection) {
  const language = useStoreLanguage((state: any) => state.language);

  return (
    <section className="bg-white py-10 md:py-8 lg:py-10 xl:py-[60px] 2xl:py-[80px] 4xl:py-[100px]">
      <div className="container flex flex-col lg:flex-row items-stretch lg:items-center gap-8 lg:gap-10 xl:gap-14 2xl:gap-16 3xl:gap-[72px] 4xl:gap-[80px]">
        <div className="relative aspect-[3/2] lg:basis-1/2 overflow-hidden rounded-md">
          <NextImg
            src={getAssetUrlById(data?.cover?.id)}
            objectFit="cover"
            alt="Quy mô background"
          />
        </div>

        <div className="lg:basis-1/2 space-y-5 xl:space-y-7 3xl:space-y-8 4xl:space-y-10">
          <div className="space-y-4 2xl:space-y-5 3xl:space-y-6">
            <h1 className="section-title uppercase text-primary-600">
              {data?.title}
            </h1>

            <div
              className="section-content"
              dangerouslySetInnerHTML={{
                __html: data?.contents,
              }}
            ></div>

            <div
              className="text-lg md:text-xl lg:text-[22px] xl:text-2xl 2xl:text-[28px] 3xl:text-[30px] 4xl:text-[32px] font-medium !leading-[1.3] text-black"
              dangerouslySetInnerHTML={{
                __html: data?.blurb,
              }}
            ></div>
          </div>

          <Link
            href={`/${language}${data?.buttons?.[0]?.url}`}
            className="btn-danger"
          >
            {data?.buttons?.[0]?.title}
            <div className="relative size-5 2xl:size-6">
              <NextImg
                src={getAssetUrlById(data?.buttons?.[0]?.icon?.id)}
                alt="icon"
              />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
