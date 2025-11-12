'use client';
import { CommonSection } from '@/src/types/pageBuilder';
import React from 'react';
import NextImg from '../../common/next-img';
import { getAssetUrlById } from '@/src/utils/image';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
export default function Card2Col({ data }: CommonSection) {
  return (
    <section className="bg-primary-50 py-10 md:py-6 lg:py-10 xl:py-[60px] 2xl:py-[80px] 3xl:py-[100px]">
      <div className="flex flex-col items-stretch gap-8 md:gap-10 xl:gap-12 2xl:gap-[52px] 4xl:gap-[60px]">

        <div className="space-y-4 container lg:space-y-5 2xl:space-y-6">
          <h1 className="section-title uppercase text-primary-600">
            {data?.title}
          </h1>
          <div
            className="section-content w-full 2xl:w-1/2"
            dangerouslySetInnerHTML={{
              __html: data?.blurb as string,
            }}
          ></div>
        </div>

        <div className="hidden container lg:grid grid-cols-2 gap-6 xl:gap-7 2xl:gap-8 4xl:gap-10">
          {data?.items?.map((item: any, index: number) => (
            <div
              key={index}
              className="group space-y-5 rounded-[6px] bg-white p-6 duration-200 hover:bg-primary-600 md:p-7 xl:space-y-6 xl:p-8 3xl:p-10"
            >
              <div className="flex items-start justify-between">
                <div className="relative size-14 transition-all duration-200 group-hover:brightness-0 group-hover:invert xl:size-[72px] 3xl:size-[80px]">
                  <NextImg
                    src={getAssetUrlById(item?.cover?.id)}
                    alt="Giá trị cốt lõi icon"
                  />
                </div>

                <div className="text-[28px] font-medium text-[#71717A] duration-200 group-hover:text-primary-100 xl:text-[36px] 3xl:text-[40px]">
                  0{index + 1}
                </div>
              </div>

              <div className="space-y-2 xl:space-y-3 3xl:space-y-4">
                <h2 className="text-[28px] font-bold leading-[1.25] text-gray-950 duration-200 group-hover:text-white xl:text-[32px] 3xl:text-[40px]">
                  {item?.title}
                </h2>
                <div
                  className="text-base font-normal leading-[1.5] text-[#71717A] duration-200 group-hover:text-[#F4F4F5] xl:text-lg 3xl:text-xl 3xl:leading-[1.6]"
                  dangerouslySetInnerHTML={{
                    __html: item?.blurb,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="relative lg:hidden">
          <Swiper
            touchEventsTarget="container"
            grabCursor={true}
            slidesPerView={1.1}
            loop={false}
            spaceBetween={16}
            speed={700}
            breakpoints={{
              768: {
                slidesPerView: 2.1
              }
            }}
            className="w-full !px-6 md:!px-[calc((100vw-688px)/2)]"
          >
            {data?.items?.map((item: any, index: number) => (
              <SwiperSlide key={index}>
                <div className="group space-y-5 rounded-[6px] bg-white p-6 duration-200 hover:bg-primary-600 md:p-7 xl:space-y-6 xl:p-8 3xl:p-10">
                  <div className="flex items-start justify-between">
                    <div className="relative size-14 transition-all duration-200 group-hover:brightness-0 group-hover:invert xl:size-[72px] 3xl:size-[80px]">
                      <NextImg
                        src={getAssetUrlById(item?.cover?.id)}
                        alt="Giá trị cốt lõi icon"
                      />
                    </div>

                    <div className="text-[28px] font-medium text-[#71717A] duration-200 group-hover:text-primary-100 xl:text-[36px] 3xl:text-[40px]">
                      0{index + 1}
                    </div>
                  </div>

                  <div className="space-y-2 xl:space-y-3 3xl:space-y-4">
                    <h2 className="text-[28px] font-bold leading-[1.25] text-gray-950 duration-200 group-hover:text-white xl:text-[32px] 3xl:text-[40px]">
                      {item?.title}
                    </h2>
                    <div
                      className="font-normal leading-[1.5] text-[#71717A] duration-200 group-hover:text-[#F4F4F5] section-content 3xl:leading-[1.6]"
                      dangerouslySetInnerHTML={{
                        __html: item?.blurb,
                      }}
                    ></div>
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
