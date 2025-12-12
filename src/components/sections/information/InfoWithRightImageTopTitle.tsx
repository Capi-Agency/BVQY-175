'use client';
import { CommonSection } from '@/src/types/pageBuilder';
import React, { useEffect, useState } from 'react';
import NextImg from '../../common/next-img';
import { getAssetUrlById } from '@/src/utils/image';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Fancybox from '../../common/Fancybox';
import Link from 'next/link';

export default function InfoWithRightImageTopTitle({
  data,
  dataDetail,
}: CommonSection) {
  const hasContent = dataDetail?.activities_images || dataDetail?.activities;

  if (hasContent === null || hasContent.length === 0) return null;

  const [randomClassSwiper, setRandomClassSwiper] = useState<string | null>(
    null,
  );

  useEffect(() => {
    setRandomClassSwiper(
      `swiper-custom-${Math.random().toString(36).substring(2, 9)}`,
    );
  }, []);

  return (
    <section className="bg-primary-50 py-6 md:py-8 lg:py-12 xl:py-[60px] 2xl:py-[80px] 3xl:py-[100px] 4xl:py-[120px]">
      <div className="container space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-10 2xl:space-y-14 3xl:space-y-[60px]">
        <div className="space-y-1 text-center">
          <div className="section-sub-title">{data?.subtitle}</div>

          <h1
            className="section-title mt-1"
            dangerouslySetInnerHTML={{
              __html: data?.title,
            }}
          ></h1>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6 xl:gap-8 2xl:gap-10 3xl:gap-[52px] 4xl:gap-[60px]">
          <div className="lg:order-2">
            {dataDetail?.activities_images?.length > 0 && randomClassSwiper && (
              <>
                <Fancybox
                  options={{
                    Carousel: {
                      infinite: true,
                    },
                    Images: {
                      zoom: true,
                    },
                  }}
                >
                  <div className="relative aspect-[4/3]">
                    <Swiper
                      touchEventsTarget="container"
                      grabCursor={true}
                      slidesPerView={1}
                      loop={true}
                      spaceBetween={0}
                      speed={700}
                      modules={[Pagination, EffectFade, Autoplay]}
                      effect="fade"
                      autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                      }}
                      pagination={{
                        clickable: true,
                        type: 'bullets',
                        el: `.swiper-bullets-container.${randomClassSwiper}`,
                        bulletElement: 'div',
                      }}
                      className="!h-full !w-full"
                    >
                      {dataDetail?.activities_images?.map((item: any) => (
                        <SwiperSlide key={item?.directus_files_id}>
                          <Link
                            href={getAssetUrlById(item?.directus_files_id)}
                            data-fancybox="gallery"
                            className="relative block size-full"
                          >
                            <NextImg
                              src={getAssetUrlById(item?.directus_files_id)}
                              alt="image"
                              objectFit="cover"
                            />
                          </Link>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </Fancybox>
                <div className="relative mt-3 flex h-5 justify-center lg:mt-4 xl:mt-5 3xl:mt-6">
                  <div className={`swiper-bullets-container ${randomClassSwiper} !w-fit`}></div>
                </div>
              </>
            )}
          </div>

          <div className="sidebar relative md:overflow-y-auto md:pr-2 lg:order-1 lg:aspect-[4/3]">
            <div
              className={`relative space-y-3 text-justify text-sm font-normal text-[#09090B] transition-all duration-700 ease-in-out xl:space-y-4 xl:text-base 2xl:space-y-5 3xl:space-y-6`}
              dangerouslySetInnerHTML={{
                __html: dataDetail?.activities,
              }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
}
