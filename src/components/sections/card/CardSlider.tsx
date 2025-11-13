'use client';
import { CommonSection } from '@/src/types/pageBuilder';
import React, { useMemo, useState } from 'react';
import NextImg from '../../common/next-img';
import { getAssetUrlById } from '@/src/utils/image';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

const CardSlider = ({ data }: CommonSection) => {
  const [activeItem, setActiveItem] = useState<number>(0);

  const item = useMemo(
    () => data?.items?.[activeItem],
    [activeItem, data?.items],
  );

  const rangeYear = useMemo(() => {
    const years = data?.items
      ?.map((item: any) => new Date(item.subtitle).getFullYear())
      .filter((y: any) => !isNaN(y));

    if (!years || years.length === 0) return { minYear: 0, maxYear: 0 };

    return {
      minYear: Math.min(...years),
      maxYear: Math.max(...years),
    };
  }, [data]);

  return (
    <div className="bg-primary-50 py-10 md:py-6 lg:py-10 2xl:py-20 3xl:py-[100px] 4xl:py-[120px]">
      <h3 className="section-title container uppercase text-primary-600">
        {data?.title}
      </h3>

      {/* navigation dots */}
      <div className="pt-6 lg:container lg:pt-7 xl:pt-9 2xl:pt-10 3xl:pt-11 4xl:pt-14">
        <div className="relative w-full overflow-hidden">
          <Swiper
            touchEventsTarget="container"
            grabCursor={true}
            slidesPerView={'auto'}
            loop={false}
            spaceBetween={86}
            speed={700}
            className="!w-[200%] !px-6 md:!w-full md:!px-[calc((100vw-688px)/2)] lg:!px-6 xl:!px-7 3xl:!px-8 4xl:!px-10"
          >
            {data?.items?.map((item: any, index: number) => {
              const year = new Date(item?.subtitle).getFullYear();
              if (isNaN(year)) return null;

              const isActive = index === activeItem;
              // Nếu năm hiện tại cách năm lớn nhất 15 năm thì lấy width 7%
              const width =
                rangeYear.maxYear - year <= 15
                  ? 7
                  : (rangeYear.maxYear - year) * 0.4;
              return (
                <SwiperSlide
                  key={'dot_' + index}
                  style={{
                    width: `${width}%`,
                  }}
                >
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveItem(index);
                    }}
                    className="flex w-fit cursor-pointer flex-col items-center gap-2 xl:gap-3 4xl:gap-4"
                  >
                    <div
                      className={`${isActive ? 'bg-white' : 'bg-transparent'} size-9 rounded-full p-[6px] transition-all duration-200 xl:size-10 4xl:size-11`}
                    >
                      <div
                        className={`${isActive ? 'bg-primary-600' : 'bg-[#D4D4D8]'} size-full rounded-full transition-all duration-200`}
                      ></div>
                    </div>

                    <div
                      className={`${isActive ? 'text-primary-600' : 'text-[#969696]'} text-2xl font-semibold transition-all duration-200 xl:text-[28px] xl:!leading-[1.5] 4xl:text-[32px]`}
                    >
                      {year}
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          <div className="absolute left-0 top-0 h-[6px] w-full translate-y-[calc(18px-3px)] bg-[#D4D4D8] xl:translate-y-[calc(20px-4px)] 4xl:translate-y-[calc(22px-4px)]"></div>
        </div>
      </div>

      {/* content */}
      <div className="container flex flex-col items-stretch gap-4 pt-6 md:gap-6 lg:flex-row lg:items-start lg:pt-8 xl:gap-8 xl:pt-10 2xl:pt-11 3xl:gap-10 3xl:pt-12 4xl:pt-[52px]">
        <div className="lg:basis-1/2">
          <p className="mb-1 text-sm font-semibold text-primary-500 2xl:text-base">
            {item?.title}
          </p>

          <h4 className="mb-4 text-[30px] font-bold leading-[1.25] text-primary-950 md:text-[32px] lg:mb-6 lg:text-[36px] xl:mb-7 xl:text-[40px] 2xl:text-[48px] 3xl:mb-8 3xl:text-[60px] 4xl:mb-10 4xl:text-[72px]">
            {new Date(item?.subtitle).getFullYear() || ''}
          </h4>

          <div
            className="section-content"
            dangerouslySetInnerHTML={{
              __html: item?.blurb as string,
            }}
          ></div>
        </div>

        <div className="flex justify-center lg:basis-1/2 lg:px-[14px] xl:px-[22px] 4xl:px-10">
          <div className="relative aspect-[3/2] w-full md:w-[394px] lg:w-full">
            <NextImg
              src={getAssetUrlById(item?.cover?.id)}
              alt="Giá trị cốt lõi icon"
              objectFit="contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSlider;
