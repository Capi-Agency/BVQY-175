import React from 'react';
import NextImg from '../next-img';
import { getAssetUrlById } from '@/src/utils/image';

export default function DoctorCard({ item }: any) {
  return (
    <div className="space-y-3 2xl:space-y-[14px] 3xl:space-y-4">
      <div className="relative aspect-[2/3] w-full">
        <NextImg
          src={getAssetUrlById(item?.cover?.id)}
          alt="Doctor image"
          objectFit="cover"
        />
      </div>

      <div className="text-center xl:space-y-[2px] 3xl:space-y-1">
        <div className="text-xs font-normal text-[#3F3F46] xl:text-sm 3xl:text-base">
          {item?.subtitle}
        </div>
        <div className="text-lg font-bold text-[#010502] xl:text-xl 3xl:text-[22px] 4xl:text-2xl">
          {item?.title}
        </div>
        <div className="text-xs font-medium text-subTitle xl:text-sm 3xl:text-base">
          {item?.blurb}
        </div>
      </div>
    </div>
  );
}
