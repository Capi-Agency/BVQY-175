'use client';
import { CommonSection } from '@/src/types/pageBuilder';
import React, { useEffect, useRef, useState } from 'react';
import NextImg from '../../common/next-img';
import { getAssetUrlById } from '@/src/utils/image';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import Link from 'next/link';

gsap.registerPlugin(useGSAP);

export default function HeroWithTopImage({ data }: CommonSection) {
  return (
    <section className="relative">
      <div className="md:hidden">
        <SliderImage
          dataImage={data?.contents}
          paginationClass={'swiper-hero-bg-focus-mb'}
        />
      </div>

      <div className="hidden md:block">
        <SliderImage
          dataImage={data?.cover}
          paginationClass={'swiper-hero-bg-focus'}
        />
      </div>

      <div className="absolute left-0 top-1/2 z-[1] w-full -translate-y-1/2">
        <div className="container relative z-[1] space-y-2 text-center xl:space-y-3 4xl:space-y-4">
          <div
            className="w-full text-sm font-normal text-[#E4E4E7] md:!leading-[1.4] lg:!leading-[1.5] xl:text-base 3xl:text-lg 3xl:!leading-[1.6] 4xl:text-xl"
            dangerouslySetInnerHTML={{
              __html: data?.blurb,
            }}
          ></div>
          {data?.title && (
            <h2
              className="text-[30px] font-bold !leading-[1.4] text-white md:text-[32px] lg:text-[36px] xl:text-[40px] 2xl:text-[48px] 3xl:text-[60px] 4xl:text-[72px]"
              dangerouslySetInnerHTML={{
                __html: data?.title,
              }}
            ></h2>
          )}

          <div
            className="w-full text-sm font-normal text-[#E4E4E7] md:!leading-[1.4] lg:!leading-[1.5] xl:text-base 3xl:text-lg 3xl:!leading-[1.6] 4xl:text-xl"
            dangerouslySetInnerHTML={{
              __html: data?.subtitle,
            }}
          ></div>
        </div>
      </div>
    </section>
  );
}

const SliderImage = ({ dataImage, paginationClass }: any) => {
  const containerRef = useRef<any>(null);
  const selector = gsap.utils.selector(containerRef);
  const { contextSafe } = useGSAP(() => {}, { scope: containerRef });

  const handleSlideNextTransitionStart = contextSafe(
    (realIndex: number, previousRealIndex: number) => {
      gsap.set(selector('.slide'), {
        xPercent: 0,
      });
      gsap.from(selector(`.slide-${realIndex}`), {
        xPercent: -40,
        duration: 1,
        ease: 'power1.inOut',
      });
      gsap.to(selector(`.slide-${previousRealIndex}`), {
        xPercent: 40,
        duration: 1,
        ease: 'power1.inOut',
      });
    },
  );

  const handleSlidePrevTransitionStart = contextSafe(
    (realIndex: number, previousRealIndex: number) => {
      gsap.set(selector('.slide'), {
        xPercent: 0,
      });
      gsap.from(selector(`.slide-${realIndex}`), {
        xPercent: 40,
        duration: 1,
        ease: 'power1.inOut',
      });
      gsap.to(selector(`.slide-${previousRealIndex}`), {
        xPercent: -40,
        duration: 1,
        ease: 'power1.inOut',
      });
    },
  );

  return (
    <div
      ref={containerRef}
      // className="relative block h-[calc(50vh-64px)] w-full overflow-hidden md:h-[308px] lg:h-[calc(100vh-76px)] xl:h-[calc(100vh-130px)] 2xl:h-[calc(100vh-142px)] 3xl:h-[calc(100vh-146px)] 4xl:h-[calc(100vh-154px)]"
      className="relative block aspect-[3/2] h-auto w-full overflow-hidden md:aspect-[5/2]"
    >
      <Swiper
        touchEventsTarget="container"
        allowTouchMove={false}
        loop={true}
        slidesPerView={1}
        spaceBetween={0}
        speed={1000}
        modules={[Pagination, Autoplay]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          type: 'bullets',
          el: `.swiper-bullets-container.${paginationClass}`,
          bulletElement: 'div',
        }}
        onSlideNextTransitionStart={(swiper: any) =>
          handleSlideNextTransitionStart(
            swiper.realIndex,
            swiper.previousRealIndex,
          )
        }
        onSlidePrevTransitionStart={(swiper: any) =>
          handleSlidePrevTransitionStart(
            swiper.realIndex,
            swiper.previousRealIndex,
          )
        }
        className="swiper-hero-background-focus h-full w-full"
      >
        {dataImage?.map((item: any, index: number) => (
          <SwiperSlide key={`cover-${index}`} className="!h-full !w-full">
            <div className="relative h-full w-full overflow-hidden">
              <div
                className={`slide slide-${index} absolute inset-0 size-full`}
              >
                <NextImg
                  src={getAssetUrlById(item?.id)}
                  alt="media image"
                  objectFit="cover"
                  className="object-top"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute bottom-2 left-0 z-[5] flex w-full justify-center lg:bottom-4 xl:bottom-5 3xl:bottom-6">
        <div className="container relative w-fit">
          <div
            className={`swiper-bullets-container ${paginationClass} !w-fit`}
          ></div>
        </div>
      </div>
    </div>
  );
};
