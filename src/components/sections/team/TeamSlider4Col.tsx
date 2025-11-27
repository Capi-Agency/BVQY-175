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
  return (
    <section className="bg-primary-50 py-6 md:py-8 lg:py-12 xl:py-[60px] 2xl:py-[80px] 3xl:py-[100px] 4xl:py-[120px]">
      <div className="container grid grid-cols-12 gap-6 lg:gap-10 xl:gap-12 2xl:gap-[60px] 4xl:gap-[80px]">
        <div className="col-span-full xl:col-span-3">
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
            slidesPerView={3}
            loop={false}
            spaceBetween={40}
            speed={700}
            className="!h-full !w-full"
          >
            {dataDetail?.doctors?.map((item: any, index: number) => (
              <SwiperSlide key={index}>
                {/* <DoctorCard item={item?.doctor} /> */}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
