'use client';
import { CommonSection } from '@/src/types/pageBuilder';
import React from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import NextImg from '../../common/next-img';
import { getAssetUrlById } from '@/src/utils/image';
import { NewsCard } from '../news';
import DoctorCard from '../../common/doctor-card';

export default function TeamSlider4Col({ data, dataDetail }: CommonSection) {
  console.log(dataDetail)
  const hasContent =
    dataDetail.leadership_board_description || dataDetail.doctors;

    console.log('hasContent: '+hasContent)
  if (hasContent === null || hasContent.length === 0) return null;

  return (
    <section className="bg-primary-50 py-6 md:py-8 lg:py-12 xl:py-[60px] 2xl:py-[80px] 3xl:py-[100px] 4xl:py-[120px]">
      <div className="grid grid-cols-12 gap-6 xl:container lg:gap-10 xl:gap-12 3xl:gap-[60px] 4xl:gap-[80px]">
        <div className="col-span-full px-6 md:px-[calc((100vw-688px)/2)] lg:px-[calc((100vw-944px)/2)] xl:col-span-3 xl:px-0">
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
              __html: dataDetail?.leadership_board_description,
            }}
          ></div>
        </div>

        <div className="col-span-full xl:col-span-9">
          <Swiper
            touchEventsTarget="container"
            grabCursor={true}
            slidesPerView={1.5}
            loop={false}
            spaceBetween={16}
            speed={700}
            breakpoints={{
              768: {
                slidesPerView: 3,
              },
              1600: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
            }}
            className="!h-full !w-full !px-6 md:!px-[calc((100vw-688px)/2)] lg:!px-[calc((100vw-944px)/2)] xl:!px-0"
          >
            {dataDetail?.doctors?.map((item: any, index: number) => (
              <SwiperSlide key={index}>
                <DoctorCard item={item?.doctor} type="blouse_no_logo" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
