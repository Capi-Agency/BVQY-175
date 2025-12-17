'use client';
import { CommonSection } from '@/src/types/pageBuilder';
import React from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import DoctorCard from '../../common/doctor-card';

export default function Team2Col({ data, dataDetail }: CommonSection) {
  const description = dataDetail.leadership_board_description;
  const leaders = dataDetail.leaders;
  const { custom } = data;

  const hasContent = !!description || (leaders?.length ?? 0) > 0;

  if (!hasContent) return null;
  return (
    <section className="bg-primary-50 py-6 md:py-8 lg:py-12 xl:py-[60px] 2xl:py-[80px] 3xl:py-[100px] 4xl:py-[120px]">
      <div className="grid grid-cols-12 gap-6 lg:container lg:gap-10 xl:gap-12 3xl:gap-[60px] 4xl:gap-[80px]">
        <div className="col-span-full px-6 md:px-[calc((100vw-688px)/2)] lg:col-span-3 lg:px-0">
          <div className="space-y-1">
            <div className="section-sub-title">{data?.subtitle}</div>

            {data?.title && (
              <h2
                className="section-title mt-1"
                dangerouslySetInnerHTML={{
                  __html: data?.title,
                }}
              ></h2>
            )}
          </div>

          <div
            className="section-content pt-2 text-justify lg:pt-4 2xl:pt-6"
            dangerouslySetInnerHTML={{
              __html: dataDetail?.leadership_board_description,
            }}
          ></div>
        </div>

        <div className="col-span-full lg:col-span-9">
          {leaders?.length > 2 ? (
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
              className="!h-full !w-full !px-6 md:!px-[calc((100vw-688px)/2)] lg:!px-0"
            >
              {leaders?.map((item: any, index: number) => (
                <SwiperSlide key={index}>
                  <DoctorCard
                    item={item}
                    url={data?.buttons?.[0]?.url}
                    avatarType={custom?.avatar_type}
                    subTitle={custom?.sub_title}
                    isLogo={custom?.is_logo}
                    isHover={custom?.is_hover}
                    isRounded={custom?.is_rounded}
                    isLink={custom?.is_link}
                    bgColor='#f4f4f5'
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <>
              <div className="hidden w-full grid-cols-2 gap-8 md:grid md:px-[calc((100vw-688px)/2)] lg:gap-6 lg:px-0 lg:pl-[80px] xl:gap-10 xl:pl-[100px] 2xl:pl-[160px] 3xl:pl-[220px] 4xl:pl-[260px]">
                {leaders?.map((item: any, index: number) => (
                  <div key={index} className="">
                    <DoctorCard
                      item={item}
                      url={data?.buttons?.[0]?.url}
                      avatarType={custom?.avatar_type}
                      subTitle={custom?.sub_title}
                      isLogo={custom?.is_logo}
                      isHover={custom?.is_hover}
                      isRounded={custom?.is_rounded}
                      avatarRatio="3/4"
                      isLink={custom?.is_link}
                      bgColor='#f4f4f5'
                    />
                  </div>
                ))}
              </div>
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
                className="!h-full !w-full !px-6 md:!hidden md:!px-[calc((100vw-688px)/2)] lg:!px-0"
              >
                {leaders?.map((item: any, index: number) => (
                  <SwiperSlide key={index}>
                    <DoctorCard
                      item={item}
                      url={data?.buttons?.[0]?.url}
                      avatarType={custom?.avatar_type}
                      subTitle={custom?.sub_title}
                      isLogo={custom?.is_logo}
                      isHover={custom?.is_hover}
                      isRounded={custom?.is_rounded}
                      isLink={custom?.is_link}
                      bgColor='#f4f4f5'
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
