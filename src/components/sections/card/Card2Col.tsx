import { CommonSection } from '@/src/types/pageBuilder';
import React from 'react';
import NextImg from '../../common/next-img';
import { getAssetUrlById } from '@/src/utils/image';

export default function Card2Col({ data }: CommonSection) {
  return (
    <section className="bg-primary-50 py-[120px]">
      <div className="container flex flex-col items-stretch gap-[60px]">
        <div className="space-y-6">
          <h1 className="section-title uppercase text-primary-600">
            {data?.title}
          </h1>
          <div
            className="section-content w-3/5"
            dangerouslySetInnerHTML={{
              __html: data?.blurb as string,
            }}
          ></div>
        </div>

        <div className="grid grid-cols-2 gap-10">
          {data?.items?.map((item: any, index: number) => (
            <div
              key={index}
              className="group space-y-6 rounded-[6px] bg-white p-10 duration-200 hover:bg-primary-600"
            >
              <div className="flex items-start justify-between">
                <div className="relative size-[80px] transition-all duration-200 group-hover:brightness-0 group-hover:invert">
                  <NextImg
                    src={getAssetUrlById(item?.cover?.id)}
                    alt="Giá trị cốt lõi icon"
                  />
                </div>

                <div className="text-[40px] font-medium text-[#71717A] duration-200 group-hover:text-primary-100">
                  0{index + 1}
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-[40px] font-bold leading-[1.25] text-gray-950 duration-200 group-hover:text-white">
                  {item?.title}
                </h2>
                <div
                  className="text-xl font-normal leading-[1.6] text-[#71717A] duration-200 group-hover:text-[#F4F4F5]"
                  dangerouslySetInnerHTML={{
                    __html: item?.blurb,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
