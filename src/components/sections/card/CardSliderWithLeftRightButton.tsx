'use client';
import { CommonSection } from '@/src/types/pageBuilder';
import React from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import NextImg from '../../common/next-img';
import { getAssetUrlById } from '@/src/utils/image';

export default function CardSliderWithLeftRightButton({ data }: CommonSection) {
  return (
    <div className="flex flex-col items-stretch gap-6 bg-[#F6FAF7] py-10 md:py-6 lg:gap-8 lg:py-10 xl:gap-11 xl:py-11 2xl:gap-12 2xl:py-12 3xl:gap-[52px] 3xl:py-[52px] 4xl:gap-[60px] 4xl:py-[60px]">
      <h2 className="section-title container uppercase text-primary-600">
        {data?.title}
      </h2>

      <div className="lg:container">
        <div className="relative">
          <Swiper
            touchEventsTarget="container"
            grabCursor={true}
            slidesPerView={1.5}
            loop={false}
            spaceBetween={16}
            speed={700}
            modules={[Navigation]}
            navigation={{
              nextEl: '.card-slider-with-l-r-button-next',
              prevEl: '.card-slider-with-l-r-button-prev',
            }}
            breakpoints={{
              768: {
                slidesPerView: 2.6,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
            }}
            className="w-full !px-6 md:!px-[calc((100vw-688px)/2)] lg:!px-0"
          >
            {data?.items?.map((item: any, index: number) => (
              <SwiperSlide key={index}>
                <div className="flex w-full flex-col items-center gap-2 lg:gap-3 2xl:gap-4">
                  <div className="relative h-[100px] w-[70px] md:h-[140px] md:w-[96px] 2xl:h-[164px] 2xl:w-[114px] 3xl:h-[180px] 3xl:w-[124px] 4xl:h-[200px] 4xl:w-[140px]">
                    <NextImg
                      src={getAssetUrlById(item?.cover?.id)}
                      alt="Danh hiệu image"
                    />
                  </div>
                  <div
                    className="px-3 text-center text-sm font-medium text-black md:px-4 lg:px-5 lg:text-base 2xl:text-lg 4xl:text-xl"
                    dangerouslySetInnerHTML={{
                      __html: item?.title,
                    }}
                  ></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button className="card-slider-with-l-r-button-prev absolute left-0 top-1/2 z-[1] hidden size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#24422D] hover:bg-[#3E9459] lg:flex xl:size-10 xl:-translate-x-[calc(100%+24px)] 2xl:size-11 3xl:-translate-x-[calc(100%+30px)] 4xl:size-[54px]">
            <div className="relative size-6">
              <NextImg
                src="/assets/icons/arrow_left_white.svg"
                alt="arrow white left"
              />
            </div>
          </button>

          <button className="card-slider-with-l-r-button-next absolute right-0 top-1/2 z-[1] hidden size-8 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-[#24422D] hover:bg-[#3E9459] lg:flex xl:size-10 xl:translate-x-[calc(100%+24px)] 2xl:size-11 3xl:translate-x-[calc(100%+30px)] 4xl:size-[54px]">
            <div className="relative size-6 rotate-180">
              <NextImg
                src="/assets/icons/arrow_left_white.svg"
                alt="arrow white left"
              />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
