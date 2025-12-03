import { CommonSection } from '@/src/types/pageBuilder';
import React from 'react';
import NextImg from '../../common/next-img';
import { getAssetUrlById } from '@/src/utils/image';

export default function HeroBackgroundsFocus({ data }: CommonSection) {
  return (
    <section className="relative w-full bg-primary-600">
      <div className="container flex h-[252px] items-center justify-center">
        {data?.title && (
          <h1
            className="text-center text-[30px] font-bold !leading-[1.4] text-white md:text-[32px] lg:text-[36px] xl:text-[40px] 2xl:text-[48px] 3xl:text-[60px] 4xl:text-[72px]"
            dangerouslySetInnerHTML={{
              __html: data?.title,
            }}
          ></h1>
        )}
      </div>
    </section>
  );
}
