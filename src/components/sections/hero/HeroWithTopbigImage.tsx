'use client';
import { CommonSection } from '@/src/types/pageBuilder';
import React from 'react';
import NextImg from '../../common/next-img';
import { getAssetUrlById } from '@/src/utils/image';
import Link from 'next/link';
import useStoreLanguage from '@/src/store/store';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function HeroWithTopBigImage({ data }: CommonSection) {
  const language = useStoreLanguage((state: any) => state.language);
  return (
    <section className="padding-top-body">
      <div className="relative h-[720px] w-full overflow-hidden md:hidden">
        <NextImg
          src={getAssetUrlById(data?.cover?.[0]?.id)}
          objectFit="cover"
          alt="home banner"
        />
      </div>

      <div className="relative hidden h-[308px] w-full overflow-hidden md:block lg:h-[410px] xl:h-[512px] 2xl:h-[576px] 3xl:h-[640px] 4xl:h-[768px]">
        <NextImg
          src={getAssetUrlById(data?.cover?.[1]?.id)}
          objectFit="cover"
          alt="home banner"
        />
      </div>

      <div className="py-10 md:py-6 2xl:py-8 4xl:py-10">
        <div className="container grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-4 2xl:flex 2xl:items-stretch 3xl:gap-6">
          {data?.buttons?.map((button: any, index: number) => (
            <Link
              key={index}
              href={`/${language}${button?.url}`}
              className="group flex items-center gap-3 bg-white p-[12px_24px] shadow-[0_1px_2px_0_rgba(18,26,43,0.10),_0_1px_2px_-1px_rgba(18,26,43,0.06)] transition-colors duration-200 hover:bg-secondary md:p-[12px_40px] lg:p-[12px_80px] xl:p-[12px_120px] 2xl:flex-1 2xl:p-[12px_16px] 3xl:gap-4 3xl:p-[12px_20px] 4xl:p-[12px_32px]"
            >
              <div className="relative size-9 duration-200 group-hover:brightness-[0] group-hover:invert group-hover:saturate-[100%] md:size-8 xl:size-9 3xl:size-11 4xl:size-12">
                <NextImg src={getAssetUrlById(button?.icon?.id)} alt="icon" />
              </div>

              <div className="flex-1">
                <h2 className="text-lg font-semibold leading-[1.5] text-[#09090B] transition-colors duration-200 group-hover:text-white 2xl:text-xl 4xl:text-[22px]">
                  {button?.title}
                </h2>
                <div className="text-sm font-normal text-[#3F3F46] transition-colors duration-200 group-hover:text-white/60">
                  {button?.blurb}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="pb-8 md:py-8 lg:py-9 xl:py-11 2xl:py-[52px] 4xl:py-[60px]">
        <div className="container hidden gap-4 md:grid md:grid-cols-3 xl:flex xl:items-stretch 3xl:gap-6">
          {data?.items?.map((item: any, index: number) => (
            <div
              key={index}
              className="group relative flex flex-col items-center gap-3 bg-white p-3 duration-200 hover:bg-secondary xl:flex-1 xl:p-[16px_12px] 3xl:gap-4 3xl:p-4 4xl:gap-5 4xl:p-5"
              style={{
                boxShadow:
                  '0 20px 25px -4px rgba(18, 26, 43, 0.10), 0 8px 8px -6px rgba(18, 26, 43, 0.04)',
              }}
            >
              <div className="relative size-8 duration-200 group-hover:brightness-[0] group-hover:invert group-hover:saturate-[100%] lg:size-9 2xl:size-10 3xl:size-11 4xl:size-12">
                <NextImg src={getAssetUrlById(item?.cover?.id)} alt="icon" />
              </div>
              <div
                className="w-full text-center text-sm font-medium text-[#71717A] duration-200 group-hover:text-white 3xl:text-base"
                dangerouslySetInnerHTML={{
                  __html: item?.title as string,
                }}
              ></div>

              <div className="absolute left-0 top-1/2 hidden aspect-[204/136] w-[90%] -translate-y-1/2 group-hover:block">
                <NextImg src="/assets/images/arrow_bg.png" alt="icon" />
              </div>
            </div>
          ))}
        </div>
        <div className="w-full md:hidden">
          <Swiper
            touchEventsTarget="container"
            grabCursor={true}
            slidesPerView={'auto'}
            loop={false}
            spaceBetween={16}
            speed={700}
            className="w-full !px-6"
          >
            {data?.items?.map((item: any, index: number) => (
              <SwiperSlide
                key={index}
                className="!w-[220px] !overflow-visible"
                style={{
                  boxShadow:
                    '0 12px 15px -3px rgba(18, 26, 43, 0.05), 0 4px 6px -3px rgba(18, 26, 43, 0.05)',
                }}
              >
                <div
                  key={index}
                  className="group relative flex flex-col items-center gap-3 bg-white p-3 duration-200 hover:bg-secondary xl:flex-1 xl:p-[16px_12px] 3xl:gap-4 3xl:p-4 4xl:gap-5 4xl:p-5"
                >
                  <div className="relative size-8 duration-200 group-hover:brightness-[0] group-hover:invert group-hover:saturate-[100%] xl:size-9 2xl:size-10 3xl:size-11 4xl:size-12">
                    <NextImg
                      src={getAssetUrlById(item?.cover?.id)}
                      alt="icon"
                    />
                  </div>
                  <div
                    className="w-full text-center text-sm font-medium text-[#71717A] duration-200 group-hover:text-white 3xl:text-base"
                    dangerouslySetInnerHTML={{
                      __html: item?.title as string,
                    }}
                  ></div>

                  <div className="absolute left-0 top-1/2 hidden aspect-[204/136] w-[90%] -translate-y-1/2 group-hover:block">
                    <NextImg src="/assets/images/arrow_bg.png" alt="icon" />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
