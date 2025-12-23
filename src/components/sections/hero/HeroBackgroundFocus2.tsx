import { CommonSection } from '@/src/types/pageBuilder';
import React from 'react';
import NextImg from '../../common/next-img';
import { getAssetUrlById } from '@/src/utils/image';

export default function HeroBackgroundFocus2({ data }: CommonSection) {
  return (
    <div className="relative">
      <div
        className="flex h-full flex-col items-center gap-1 py-40 text-center md:py-[100px] lg:gap-2 lg:py-[120px] 2xl:gap-4 2xl:py-[140px] 3xl:py-40"
        style={{
          background: ` linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%), url("${getAssetUrlById(data?.cover?.[0]?.id)}") lightgray 50% / cover no-repeat`,
        }}
      >
        {/* subtitle */}
        <div className='container'>
          <div
            className="text-base font-normal text-gray-200 md:text-lg lg:text-xl"
            dangerouslySetInnerHTML={{
              __html: data?.blurb,
            }}
          ></div>
          {/* title */}
          {data?.title && (
            <h1 className="text-[28px] font-bold text-white md:text-[40px] !leading-[1.5] lg:text-[44px] 2xl:text-[48px] 3xl:text-[60px] 4xl:text-[72px]">
              {data?.title}
            </h1>
          )}
        </div>
      </div>
    </div>
  );
}
