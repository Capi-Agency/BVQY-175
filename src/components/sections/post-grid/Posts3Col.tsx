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
import CalendarIcon from '@/src/components/common/icons/Calendar';
import RightArrowIcon from '@/src/components/common/icons/RightArrowIcon';

const Posts3Col = ({ data }: CommonSection) => {
  return (
    <div className="py-10 text-center md:py-6 lg:py-10 xl:py-11 2xl:py-12 3xl:py-[52px] 4xl:py-[60px]">
      <div className="section-sub-title">{data?.subtitle}</div>
      <h1 className="section-title">{data?.title}</h1>

      <div className="lg:container">
        <div className="relative pt-6 xl:pt-7 2xl:pt-8 4xl:pt-10">
          <Swiper
            touchEventsTarget="container"
            grabCursor={true}
            slidesPerView={1.2}
            loop={false}
            spaceBetween={16}
            speed={700}
            breakpoints={{
              768: {
                slidesPerView: 2.4,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              1280: {
                slidesPerView: 3,
                spaceBetween: 28,
              },
              1440: {
                slidesPerView: 3,
                spaceBetween: 32,
              },
              1920: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
            }}
            className="w-full !px-6 md:!px-[calc((100vw-688px)/2)] lg:!px-0"
          >
            {Array(3)
              .fill(null)
              .map((_, index) => {
                return (
                  <SwiperSlide key={'post_' + index}>
                    <div className="group relative cursor-pointer space-y-4 bg-primary-50 p-3 text-start transition-all duration-200 hover:bg-primary-600 xl:p-4">
                      {/* cover */}
                      <div className="relative aspect-video">
                        <NextImg
                          src="/assets/images/unavailable.png"
                          alt="post cover"
                          objectFit="cover"
                        />
                      </div>
                      <div className="space-y-1">
                        <h4 className="line-clamp-2 text-lg font-semibold text-primary-1000 group-hover:text-primary-50 xl:text-xl 3xl:text-[22px] 4xl:text-2xl">
                          HAI PHẪU THUẬT NỘI SOI LẤY TẠNG GHÉP ĐƯỢC TIẾN HÀNH
                          ĐỒNG THỜI TRONG CHƯƠNG TRÌNH PHẪU THUẬT THỊ PHẠM GHÉP
                          THẬN, GHÉP GAN CỦA HỘI NGHỊ KHOA HỌC VSOT LẦN THỨ 10 –
                          2025 ĐƯỢC TỔ CHỨC TẠI BỆNH VIỆN QUÂN Y 175
                        </h4>
                        <p className="line-clamp-3 text-sm font-thin text-[#03110899] group-hover:text-primary-100">
                          Ngày 04/11/2025, tại Bệnh viện Quân y 175 đã chính
                          thức khai mạc Tuần lễ Hiến và Ghép mô, tạng Việt Nam
                          2025. Trong khuôn khổ Tuần lễ chương trình tiền hội
                          nghị được diễn ra từ ngày 4 – 6/11/2025 với ba chương
                          trình đào tạo liên tục cấp CME gồm: Đào tạo điều phối
                          viên hiến mô, tạng; Đào tạo chẩn đoán và hồi sức chết
                          não và đào tạo điều phối viên ghép tạng.
                        </p>
                      </div>

                      {/* date published */}
                      <div className="flex justify-between">
                        <div className="flex items-center gap-1.5 group-hover:text-primary-50">
                          <CalendarIcon className="size-5 2xl:size-6" />
                          <p className="text-sm font-medium text-gray-700 group-hover:text-primary-50 2xl:text-base">
                            5/11/2025
                          </p>
                        </div>
                        <Link
                          href={'#'}
                          className="flex items-center gap-1.5 text-gray-950 group-hover:text-primary-50"
                        >
                          <span className="text-sm font-medium 2xl:text-base 3xl:text-lg">
                            Xem chi tiết
                          </span>
                          <RightArrowIcon className="mx-1 w-[14px] xl:w-[18px]" />
                        </Link>
                      </div>

                      {/* Appear on hover */}
                      <BgHiddenShape />
                    </div>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Posts3Col;

const BgHiddenShape = () => (
  <svg
    className="pointer-events-none absolute bottom-4 left-1/2 w-[90%] -translate-x-1/2"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 273 136"
    fill="none"
  >
    <path
      opacity="0.05"
      d="M22.1612 0L249.474 0L272.268 67.2283L250.301 136H22.7936L0 68.7717L22.1612 0Z"
      fill="url(#paint0_linear_473_8867)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_473_8867"
        x1="148.511"
        y1="12.4313"
        x2="17.9858"
        y2="31.515"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset="1" stopColor="#07A438" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);
