import { CommonSection } from '@/src/types/pageBuilder';
import React from 'react';
import NextImg from '../../common/next-img';
import { getAssetUrlById } from '@/src/utils/image';

export default function HeroBackgroundsFocus({ data }: CommonSection) {
  return (
    <section className="relative flex h-[calc(100dvh-64px)] w-full items-end overflow-hidden py-[120px] md:h-[308px] md:py-6 lg:h-[410px] lg:py-8 xl:h-[512px] xl:py-10 2xl:h-[576px] 2xl:py-12 3xl:h-[640px] 3xl:py-[60px] 4xl:h-[768px]">
      <div className="absolute inset-0 size-full md:hidden">
        <NextImg
          src={getAssetUrlById(data?.cover?.[0]?.id)}
          objectFit="cover"
          alt="about us background"
        />
      </div>

      <div className="absolute inset-0 hidden size-full md:block">
        <NextImg
          src={getAssetUrlById(data?.cover?.[1]?.id)}
          objectFit="cover"
          alt="about us background"
        />
      </div>

      <div className="container relative z-[1] space-y-2 xl:space-y-3 4xl:space-y-4">
        <h1
          className="text-[30px] font-bold !leading-[1.4] text-white md:text-[32px] lg:text-[36px] xl:text-[40px] 2xl:text-[48px] 3xl:text-[60px] 4xl:text-[72px]"
          dangerouslySetInnerHTML={{
            __html: data?.title,
          }}
        ></h1>

        <div
          className="w-full text-sm font-normal text-[#E4E4E7] md:w-4/5 md:!leading-[1.4] lg:w-3/5 lg:!leading-[1.5] xl:w-1/2 xl:text-base 3xl:text-lg 3xl:!leading-[1.6] 4xl:text-xl"
          dangerouslySetInnerHTML={{
            __html: data?.blurb,
          }}
        ></div>
      </div>
    </section>
  );
}
