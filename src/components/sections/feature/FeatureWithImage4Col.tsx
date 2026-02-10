'use client';
import { CommonSection } from '@/src/types/pageBuilder';
import React from 'react';
import NextImg from '../../common/next-img';
import { getAssetUrlById } from '@/src/utils/image';
import CustomLink from '../../common/custom-link';
export default function FeatureWithImage4Col({ data }: CommonSection) {
  return (
    <section className="p-[20px_0_40px] lg:p-[36px_0_52px] xl:p-[40px_0_60px] 3xl:p-[48px_0_72px] 4xl:p-[56px_0_90px]">
      <div className="section-sub-title text-center">{data?.subtitle}</div>
      {data?.title && (
        <h1 className="section-title mt-1 text-center">{data?.title}</h1>
      )}

      <div className="container pt-8 md:pt-8 lg:pt-10 xl:pt-11 2xl:pt-12 3xl:pt-14">
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-y-10 lg:grid-cols-4 lg:gap-x-6 xl:grid-cols-5 2xl:grid-cols-6 4xl:gap-y-12">
          {data?.buttons?.map((item: any, index: number) => (
            <CustomLink
              key={index}
              href={item?.url}
              className="bg-ed-50 group relative flex flex-col items-center gap-3"
            >
              <div className="flex size-[60px] items-center justify-center rounded-[12px] bg-[#E7F3EB] lg:size-[64px] xl:size-[68px] 2xl:size-[72px] 3xl:size-[76px] 4xl:size-[80px]">
                <div className="relative size-9 duration-200 lg:size-10 2xl:size-11 3xl:size-12">
                  <img
                    src={getAssetUrlById(item?.icon?.id)}
                    alt="icon"
                    className="size-full object-contain"
                  />
                </div>
              </div>

              <div className="w-full text-center text-sm font-semibold !leading-[1.5] text-primary-600 md:text-base 3xl:text-lg">
                {item?.title}
              </div>
            </CustomLink>
          ))}
        </div>
      </div>
    </section>
  );
}
