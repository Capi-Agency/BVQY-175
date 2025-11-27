'use client';
import { CommonSection } from '@/src/types/pageBuilder';
import React, { useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import NextImg from '../../common/next-img';
import { getAssetUrlById } from '@/src/utils/image';
import Fancybox from '../../common/Fancybox';
import Link from 'next/link';

export default function InfoWithLeftImage({ data, dataDetail }: CommonSection) {
  return (
    <div className="bg-primary-50 py-6 md:py-8 lg:py-10 xl:py-11 2xl:py-12 3xl:py-[52px] 4xl:py-[60px]">
      <div className="container grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2 lg:gap-8 xl:gap-10 2xl:gap-12 3xl:gap-[52px] 4xl:gap-[60px]">
        <div className='lg:order-2'>
          <div className="space-y-1">
            <div className="section-sub-title">{data?.subtitle}</div>

            <h2
              className="section-title mt-1"
              dangerouslySetInnerHTML={{
                __html: data?.title,
              }}
            ></h2>
          </div>

          <div
            className="section-content pt-2 text-justify lg:pt-4 2xl:pt-6"
            dangerouslySetInnerHTML={{
              __html: dataDetail?.technologies,
            }}
          ></div>
        </div>

        <Fancybox
          options={{
            Carousel: {
              infinite: true,
            },
            Images: {
              zoom: true,
            },
          }}
          className="lg:order-1"
        >
          {dataDetail?.technologies_images?.length > 0 && (
            <>
              <div className="relative aspect-[4/3] w-full md:aspect-[2/1] lg:aspect-[4/3]">
                <Swiper
                  touchEventsTarget="container"
                  grabCursor={true}
                  slidesPerView={1}
                  loop={true}
                  spaceBetween={0}
                  speed={700}
                  modules={[Pagination]}
                  pagination={{
                    clickable: true,
                    type: 'bullets',
                    el: '.swiper-bullets-container.swiper-info-left-image',
                    bulletElement: 'div',
                  }}
                  className="!h-full !w-full"
                >
                  {dataDetail?.technologies_images?.map((item: any) => (
                    <SwiperSlide key={item?.directus_files_id}>
                      <Link
                        href={getAssetUrlById(item?.directus_files_id)}
                        data-fancybox="gallery"
                        className="relative block size-full"
                      >
                        <div className="relative size-full">
                          <NextImg
                            src={getAssetUrlById(item?.directus_files_id)}
                            objectFit="cover"
                            alt="facilities images"
                          />
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className="relative mt-3 flex justify-center lg:mt-4 xl:mt-5 3xl:mt-6">
                <div className="swiper-bullets-container swiper-info-left-image !w-fit"></div>
              </div>
            </>
          )}
        </Fancybox>
      </div>
    </div>
  );
}
