'use client';
import { CommonSection } from '@/src/types/pageBuilder';
import React, { useState } from 'react';
import NextImg from '../../common/next-img';
import { getAssetUrlById } from '@/src/utils/image';

export default function InfoWithLeftImageTopTitle({
  data,
  dataDetail,
}: CommonSection) {
  const [isViewMore, setIsViewMore] = useState<boolean>(false);

  const hasContent = dataDetail?.description_image || dataDetail?.description;

  if (hasContent === null || hasContent.length === 0) return null;

  return (
    <section className="bg-primary-50 py-6 md:py-8 lg:py-12 xl:py-[60px] 2xl:py-[80px] 3xl:py-[100px] 4xl:py-[120px]">
      <div className="container space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-10 2xl:space-y-14 3xl:space-y-[60px]">
        <div className="space-y-1 text-center">
          <div className="section-sub-title">{data?.subtitle}</div>

          <h1
            className="section-title mt-1"
            dangerouslySetInnerHTML={{
              __html: data?.title,
            }}
          ></h1>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6 xl:gap-8 2xl:gap-10 3xl:gap-[52px] 4xl:gap-[60px]">
          <div className="relative aspect-[4/3]">
            <NextImg
              src={getAssetUrlById(dataDetail?.description_image)}
              alt="image"
              objectFit='cover'
            />
          </div>

          <div className="relative flex flex-col items-start gap-3 xl:gap-4 2xl:gap-5 3xl:gap-6">
            <div
              className={`${isViewMore ? 'line-clamp-none' : 'line-clamp-[17] lg:line-clamp-[15] xl:line-clamp-[14] 2xl:line-clamp-[15] 4xl:line-clamp-[17]'} relative space-y-3 text-justify text-sm font-normal text-[#09090B] transition-all duration-700 ease-in-out xl:space-y-4 xl:text-base 2xl:space-y-5 3xl:space-y-6`}
              dangerouslySetInnerHTML={{
                __html: dataDetail?.description,
              }}
            ></div>

            <button
              onClick={() => setIsViewMore((prev: boolean) => !prev)}
              className="text-sm font-normal text-[#09090B] underline underline-offset-4 xl:text-base"
            >
              {isViewMore
                ? data?.buttons?.[1]?.title
                : data?.buttons?.[0]?.title}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
