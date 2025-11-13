import { CommonSection } from '@/src/types/pageBuilder';
import React from 'react';
import DoctorCard from '../../common/doctor-card';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import NextImg from '../../common/next-img';

export default function Team4Col({ data }: CommonSection) {
  return (
    <div className="bg-white py-10 md:py-6 lg:py-10 xl:py-[60px] 3xl:py-[80px]">
      <div className="container grid grid-cols-1 gap-6 lg:gap-6 xl:grid-cols-4 xl:gap-4 3xl:gap-6">
        <div className="col-span-2 flex flex-col justify-center gap-4 2xl:gap-5 3xl:gap-6">
          <h2 className="section-title uppercase text-primary-600">
            {data?.title}
          </h2>
          <div
            className="section-content"
            dangerouslySetInnerHTML={{
              __html: data?.blurb,
            }}
          ></div>
        </div>

        <div className="col-span-1 hidden xl:block"></div>

        {data?.items?.map((item: any, index: number) => (
          <div key={index} className="hidden xl:block">
            <DoctorCard key={index} item={item} />
          </div>
        ))}
      </div>
      <div className="pt-6 lg:container lg:pt-8 xl:hidden">
        <div className='relative w-full'>
          <Swiper
            touchEventsTarget="container"
            grabCursor={true}
            slidesPerView={1.5}
            loop={false}
            spaceBetween={16}
            speed={700}
            modules={[Navigation]}
            navigation={{
              nextEl: '.team-slider-4-col-button-next',
              prevEl: '.team-slider-4-col-button-prev',
            }}
            breakpoints={{
              768: {
                slidesPerView: 3.3,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="w-full !px-6 md:!px-[calc((100vw-688px)/2)] lg:!px-0"
          >
            {data?.items?.map((item: any, index: number) => (
              <SwiperSlide key={index}>
                <DoctorCard item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
          <button className="team-slider-4-col-button-prev absolute left-0 top-1/2 z-[1] hidden size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#24422D] hover:bg-[#3E9459] lg:flex xl:size-10 xl:-translate-x-[calc(100%+24px)] 2xl:size-11 3xl:-translate-x-[calc(100%+30px)] 4xl:size-[54px]">
            <div className="relative size-6">
              <NextImg
                src="/assets/icons/arrow_left_white.svg"
                alt="arrow white left"
              />
            </div>
          </button>

          <button className="team-slider-4-col-button-next absolute right-0 top-1/2 z-[1] hidden size-8 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-[#24422D] hover:bg-[#3E9459] lg:flex xl:size-10 xl:translate-x-[calc(100%+24px)] 2xl:size-11 3xl:translate-x-[calc(100%+30px)] 4xl:size-[54px]">
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
