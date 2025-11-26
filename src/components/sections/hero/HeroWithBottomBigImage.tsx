'use client';
import { CommonSection } from '@/src/types/pageBuilder';
import { formatDate } from '@/src/utils/validate';
import React from 'react';
import NextImg from '../../common/next-img';
import { getAssetUrlById } from '@/src/utils/image';

export default function HeroWithBottomBigImage({
  data,
  dataDetail: department,
}: CommonSection) {
  return (
    <section className="bg-[#F6FAF7]">
      <div className="container">
        <div className="flex flex-col items-stretch gap-4 pt-6 md:pt-8 lg:flex-row lg:items-end lg:justify-between lg:pt-12 xl:pt-[60px] 2xl:pt-[80px]">
          <h1 className="basis-1/2 text-[36px] font-bold leading-[1.3] text-[#09090B] md:text-[40px] lg:text-[44px] xl:text-[48px] 2xl:text-[56px] 3xl:text-[60px] 4xl:text-[72px]">
            {department?.title}
          </h1>

          <div className="flex items-start gap-6 md:gap-8 lg:gap-12 xl:gap-[60px]">
            <div className="space-y-[2px] md:space-y-1">
              <div className="text-base font-normal text-[#71717A] md:text-lg">
                {data?.title}
              </div>
              <div className="text-lg font-semibold text-[#09090B] md:text-xl lg:text-2xl xl:text-[28px] xl:!leading-[1.3]">
                {formatDate(department?.date_established)}
              </div>
            </div>

            <div className="space-y-[2px] md:space-y-1">
              <div className="text-base font-normal text-[#71717A] md:text-lg">
                {data?.subtitle}
              </div>
              <div
                className="text-lg font-semibold text-[#09090B] md:text-xl lg:text-2xl xl:text-[28px] xl:!leading-[1.3]"
                dangerouslySetInnerHTML={{
                  __html: department?.organizational_structure,
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className="p-[80px_0_40px]">
          <div className="relative aspect-[9/4] w-full overflow-hidden rounded-[6px]">
            <NextImg
              src={getAssetUrlById(department?.cover)}
              alt="banner image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
