'use client';
import { CommonSection } from '@/src/types/pageBuilder';
import React, { useMemo, useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import NextImg from '../../common/next-img';
import { getAssetUrlById } from '@/src/utils/image';
import Link from 'next/link';
import useStoreLanguage from '@/src/store/store';

export default function GalleryWithText({ data }: CommonSection) {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const language = useStoreLanguage((state: any) => state.language);

  const embedUrl = useMemo(() => {
    return data?.cover?.split('v=')[1].split('&')[0];
  }, [data]);

  return (
    <section className="bg-primary-50 py-10 md:py-6 lg:py-10 xl:py-[60px] 2xl:py-[80px] 3xl:py-[100px] 4xl:py-[120px]">
      <div className="container grid w-full grid-cols-12 gap-6 xl:gap-10 2xl:gap-12 3xl:gap-[52px] 4xl:gap-[60px]">
        <div className="col-span-full flex flex-col gap-4 md:flex-row lg:gap-6 xl:col-span-4 xl:flex-col xl:gap-[52px] 2xl:gap-[64px] 3xl:gap-[72px] 4xl:gap-[80px]">
          <div className="w-full md:flex-1 xl:flex-none">
            <div className="section-sub-title">{data?.subtitle}</div>

            <div className="section-title mt-1">{data?.title}</div>
          </div>

          <div className="relative aspect-video w-full overflow-hidden md:w-[250px] lg:w-[340px] xl:w-full">
            <iframe
              onClick={(e) => e.stopPropagation()}
              title="Video giới thiệu Bệnh Viện Quân Y 175"
              className="!m-0 h-full w-full object-cover !p-0"
              style={{ display: 'block', border: 'none' }}
              src={`https://www.youtube.com/embed/${embedUrl}?modestbranding=1&rel=0`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        <div className="col-span-full bg-white p-4 xl:col-span-8 2xl:p-5 4xl:p-6">
          <div className="w-full">
            <Swiper
              touchEventsTarget="container"
              grabCursor={true}
              slidesPerView={'auto'}
              loop={false}
              spaceBetween={12}
              speed={700}
              breakpoints={{
                1440: {
                  spaceBetween: 16,
                },
              }}
              className="w-full"
            >
              {data?.items?.map((item: any, index: number) => (
                <SwiperSlide key={index} className="!w-fit">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentTab(index);
                    }}
                    className={`${currentTab === index ? 'text-primary-600' : 'text-[#71717A]'} relative cursor-pointer pb-2 text-sm font-medium uppercase transition-colors duration-200 2xl:pb-3 2xl:text-base`}
                  >
                    {item?.title}
                  </div>
                  <div
                    className={`${currentTab === index ? 'bg-primary-600' : 'bg-transparent'} relative h-[1px] w-full transition-colors duration-200`}
                  ></div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="pt-2">
            {data?.items?.map((item: any, index: number) => (
              <div
                key={index}
                className={`${currentTab === index ? 'block' : 'hidden'} space-y-2 2xl:space-y-[10px] 4xl:space-y-3`}
              >
                <div className="text-lg font-semibold text-[#09090B] 2xl:text-xl 4xl:text-2xl">
                  {item?.title}
                </div>

                <div
                  className="text-sm font-normal text-[#3F3F46] 3xl:text-base"
                  dangerouslySetInnerHTML={{
                    __html: item?.blurb as string,
                  }}
                ></div>

                {item?.cover?.length > 0 && (
                  <div className="grid grid-cols-2 gap-3 pt-1 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-4">
                    {item?.cover?.map((itemCover: any, coverIndex: number) => (
                      <div key={coverIndex} className="relative aspect-square">
                        <NextImg
                          src={getAssetUrlById(itemCover?.id)}
                          alt="Cơ sở vật chất image"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {data?.buttons?.[0]?.url && (
                  <div className="pt-2 lg:pt-4 2xl:pt-5">
                    <Link
                      href={`/${language}${data?.buttons?.[0]?.url}`}
                      className="btn-danger"
                    >
                      {data?.buttons?.[0]?.title}
                      <div className="relative size-5 2xl:size-6">
                        <NextImg
                          src={getAssetUrlById(data?.buttons?.[0]?.icon?.id)}
                          alt="icon"
                        />
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
