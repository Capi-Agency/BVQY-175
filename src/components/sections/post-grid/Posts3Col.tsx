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
import { Navigation } from 'swiper/modules';

const Posts3Col = ({ data }: CommonSection) => {
  return (
    <div className="py-10 text-center md:py-6 lg:py-10 xl:py-11 2xl:py-12 3xl:py-[52px] 4xl:py-[60px]">
      <div className="section-sub-title">{data?.subtitle}</div>
      <h1 className="section-title">{data?.title}</h1>

      <div className="md:container">
        <div className="relative pt-6 2xl:pt-8 3xl:pt-10">
          <Swiper
            touchEventsTarget="container"
            grabCursor={true}
            slidesPerView={1.2}
            loop={false}
            spaceBetween={16}
            speed={700}
            modules={[Navigation]}
            breakpoints={{
              768: {
                slidesPerView: 2.4,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="w-full !px-6 md:!px-0"
          >
            {Array(3)
              .fill(null)
              .map((_, index) => {
                return (
                  <SwiperSlide
                    key={'post_' + index}
                    className="bg-primary-50 group space-y-4 p-3 text-start transition-all duration-300 hover:bg-primary-600"
                  >
                    {/* cover */}
                    <div className="relative aspect-video">
                      <NextImg
                        src="/assets/images/unavailable.png"
                        alt="post cover"
                        objectFit="cover"
                      />
                    </div>
                    <h4 className="text-semibold group-hover:text-primary-50 text-primary-1000 line-clamp-2 text-lg">
                      HAI PHẪU THUẬT NỘI SOI LẤY TẠNG GHÉP ĐƯỢC TIẾN HÀNH ĐỒNG
                      THỜI TRONG CHƯƠNG TRÌNH PHẪU THUẬT THỊ PHẠM GHÉP THẬN,
                      GHÉP GAN CỦA HỘI NGHỊ KHOA HỌC VSOT LẦN THỨ 10 – 2025 ĐƯỢC
                      TỔ CHỨC TẠI BỆNH VIỆN QUÂN Y 175
                    </h4>
                    <p className="text-thin group-hover:text-primary-100 line-clamp-3 text-sm text-[#03110899]">
                      Ngày 04/11/2025, tại Bệnh viện Quân y 175 đã chính thức
                      khai mạc Tuần lễ Hiến và Ghép mô, tạng Việt Nam 2025.
                      Trong khuôn khổ Tuần lễ chương trình tiền hội nghị được
                      diễn ra từ ngày 4 – 6/11/2025 với ba chương trình đào tạo
                      liên tục cấp CME gồm: Đào tạo điều phối viên hiến mô,
                      tạng; Đào tạo chẩn đoán và hồi sức chết não và đào tạo
                      điều phối viên ghép tạng.
                    </p>

                    {/* date published */}
                    <div className="flex justify-between"></div>
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
