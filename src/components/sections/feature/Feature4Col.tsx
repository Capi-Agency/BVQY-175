import useStoreLanguage from '@/src/store/store';
import { CommonSection } from '@/src/types/pageBuilder';
import Link from 'next/link';
import React from 'react';
import NextImg from '../../common/next-img';
import { getAssetUrlById } from '@/src/utils/image';

export default function Feature4Col({ data }: CommonSection) {
  const language = useStoreLanguage((state: any) => state.language);

  return (
    <div className="bg-white py-[80px]">
      <div className="container grid grid-cols-4 gap-10">
        <div>
          <div className="section-sub-title">{data?.subtitle}</div>

          <div className="section-title mt-1">{data?.title}</div>

          <div
            className="mt-6 text-base font-normal text-[#3F3F46]"
            dangerouslySetInnerHTML={{
              __html: data?.blurb as string,
            }}
          ></div>

          <Link
            href={`/${language}${data?.buttons?.[0]?.url}`}
            className="btn-danger mt-10"
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

        {data?.items?.map((item: any, index: number) => (
          <Link
            key={index}
            href={`/${language}${data?.buttons?.[1]?.url}`}
            className="group block space-y-4 bg-[#F6FAF7] p-4 hover:bg-secondary hover:shadow-[0_25px_45px_-12px_rgba(18,26,43,0.20)] transition-all duration-200"
          >
            <div className="relative aspect-video w-full overflow-hidden">
              <NextImg
                src={getAssetUrlById(item?.cover?.id)}
                alt="Chuyên khoa image"
                objectFit="cover"
              />
            </div>

            <div className="space-y-1">
              <div className="line-clamp-2 h-[72px] text-2xl font-semibold text-[#010502] group-hover:text-[#F6FAF7] transition-all duration-200">
                {item?.title}
              </div>
              <div
                className="line-clamp-3 h-[60px] text-sm font-normal text-[#3F3F46] group-hover:text-[#D1E6D7] transition-all duration-200"
                dangerouslySetInnerHTML={{
                  __html: item?.blurb,
                }}
              ></div>
            </div>

            <div className="flex items-center gap-2">
              <div className="text-lg font-medium text-[#09090B] group-hover:text-[#F6FAF7] transition-all duration-200">
                {data?.buttons?.[1]?.title}
              </div>

              <div className="relative size-6 group-hover:invert transition-all duration-200">
                <NextImg
                  src={getAssetUrlById(data?.buttons?.[1]?.icon.id)}
                  alt="arrow icon"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
