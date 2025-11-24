'use client';

import NextImg from '@/src/components/common/next-img';
import Link from 'next/link';
import React from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

type Props = {};

const DepartmentListPage = (props: Props) => {
  return (
    <div className="padding-top-body bg-primary-50">
      {/* Banner + Search box */}
      <div className="md:relative">
        <div
          className="flex h-full flex-col items-center gap-1 py-40 text-center lg:gap-2 2xl:gap-4"
          style={{
            background: ` linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%), url("/assets/images/demo-image.png") lightgray 50% / cover no-repeat`,
          }}
        >
          {/* title */}
          <h1 className="text-[28px] font-bold text-white md:text-[40px] lg:text-[44px] 2xl:text-[48px] 3xl:text-[60px] 4xl:text-[72px]">
            Khám và điều trị đa khoa
          </h1>
          {/* subtitle */}
          <p className="text-base font-normal text-gray-200 md:text-lg lg:text-xl">
            Chăm sóc toàn diện - Tiết kiệm thời gian
          </p>
        </div>

        {/* Search form */}
        <div className="mx-auto w-full bg-transparent px-6 py-8 md:absolute md:bottom-0 md:left-1/2 md:max-w-[600px] md:-translate-x-1/2 md:translate-y-1/2 md:bg-transparent md:px-0 md:py-0 lg:max-w-[800px]">
          <form className="flex items-center justify-between rounded-[6px] bg-white px-3 py-2 shadow-md">
            <div className="flex flex-1 flex-col text-start">
              <label
                htmlFor="searchText"
                className="text-sm font-normal text-gray-500"
              >
                Tìm kiếm theo tên, mã khoa
              </label>
              <input
                id="searchText"
                type="text"
                placeholder="VD: Khoa Nội tiêu hoá"
                className="text-base font-normal placeholder:text-[#0F2F64] focus:border-none focus:outline-none md:text-lg"
              />
            </div>
            <button
              type="submit"
              className="flex size-10 items-center justify-center rounded-[4px] bg-primary-600 p-3 text-white md:size-auto md:gap-4 md:px-5"
            >
              <span className="hidden md:block">Tìm kiếm</span>
              <img
                src="/assets/icons/arrow_right_white.svg"
                alt="arrow right"
              />
            </button>
          </form>
        </div>
      </div>

      {/* Slider các khối */}
      <DepartmentSlider />
      <div className="container hidden flex-wrap justify-center gap-6 py-[72px] lg:flex">
        {Array(5)
          .fill(null)
          .map((item, index: number) => (
            <DepartmentSlideCard key={'item_' + index} />
          ))}
      </div>

      {/* Các khối */}

      {/* Danh sách khoa */}

      {/* Đối tác bảo hiểm */}
    </div>
  );
};

export default DepartmentListPage;

const DepartmentSlider = () => {
  return (
    <Swiper
      touchEventsTarget="container"
      grabCursor={true}
      slidesPerView={1.2}
      loop={false}
      spaceBetween={24}
      speed={700}
      breakpoints={{
        768: {
          slidesPerView: 2.1,
          spaceBetween: 24,
        },
      }}
      className="w-full !px-6 !py-8 md:!px-[calc((100vw-688px)/2)] md:!py-16 lg:!hidden lg:!px-0"
    >
      {Array(5)
        .fill(null)
        .map((item, index: number) => (
          <SwiperSlide
            key={'department_' + index}
            className="group overflow-visible"
          >
            <DepartmentSlideCard />
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

const DepartmentSlideCard = () => {
  return (
    <div className="space-y-5 bg-white p-5 shadow-lg lg:w-[calc((100%-24px*2)/3)]">
      {/* cover */}
      <div className="relative aspect-video w-full">
        <NextImg src="/assets/images/demo-image.png" alt="cover" />
      </div>

      {/* title + desc */}
      <div className="space-y-3">
        <div className="5 flex items-center gap-2">
          <img
            src="/assets/icons/logo_khoi_noi.svg"
            alt="logo_khoi_noi"
            className="size-7"
          />
          <h4 className="text-xl font-semibold text-gray-500">Khối nội</h4>
        </div>
        <p className="text-sm font-medium text-gray-500">
          Đơn vị chuyên sâu về chẩn đoán và điều trị các bệnh lý nội khoa
        </p>
      </div>

      {/* view details */}
      <Link
        href="#"
        className="flex items-center gap-2 font-medium text-gray-500"
      >
        Xem chi tiết
        <img
          src="/assets/icons/arrow_right_gray.svg"
          alt="arrow right"
          className="size-6"
        />
      </Link>
    </div>
  );
};
