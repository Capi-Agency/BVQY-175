'use client';
import { CommonSection } from '@/src/types/pageBuilder';
import React, { useEffect, useMemo, useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import NextImg from '../../common/next-img';
import { getAssetUrlById } from '@/src/utils/image';
import Fancybox from '../../common/Fancybox';
import Link from 'next/link';

export default function InfoWithRightImage({
  data,
  dataDetail,
}: CommonSection) {
  const blurb = dataDetail?.facilities ?? data?.blurb;
  const images = dataDetail?.facilities_images ?? data?.cover ?? [];

  const hasContent = blurb || (images?.length ?? 0) > 0;

  if (!hasContent) return null;

  const [randomClassSwiper, setRandomClassSwiper] = useState<string | null>(
    null,
  );

  useEffect(() => {
    setRandomClassSwiper(
      `swiper-info-right-image-${Math.random().toString(36).substring(2, 9)}`,
    );
  }, []);

  return (
    <div className="bg-primary-50 py-6 md:py-8 lg:py-10 xl:py-11 2xl:py-12 3xl:py-[52px] 4xl:py-[60px]">
      <div className="container grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2 lg:gap-8 xl:gap-10 2xl:gap-12 3xl:gap-[52px] 4xl:gap-[60px]">
        <div className="flex flex-col items-stretch gap-2 lg:aspect-[4/3] lg:gap-4 2xl:gap-5">
          <div className="space-y-1">
            {data?.subtitle && (
              <div className="section-sub-title">{data?.subtitle}</div>
            )}

            {data?.title && (
              <h2
                className="section-title"
                dangerouslySetInnerHTML={{
                  __html: data?.title,
                }}
              ></h2>
            )}
          </div>

          <div
            className="section-content sidebar relative text-justify md:pr-2 lg:flex-1 lg:overflow-y-auto"
            dangerouslySetInnerHTML={{
              __html: blurb,
            }}
          ></div>
        </div>

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
          {images?.length > 0 && randomClassSwiper ? (
            <>
              <div className="relative aspect-[4/3] w-full md:aspect-[2/1] lg:aspect-[4/3]">
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
                    delay: 3000,
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
                  {images?.map((item: any, index: number) => {
                    return (
                      <SwiperSlide
                        key={item?.directus_files_id || item?.id || item}
                      >
                        <Link
                          href={getAssetUrlById(
                            item?.directus_files_id || item?.id || item,
                          )}
                          data-fancybox="gallery"
                          className="relative block size-full"
                        >
                          <div className="relative size-full">
                            <NextImg
                              src={getAssetUrlById(
                                item?.directus_files_id || item?.id || item,
                              )}
                              objectFit="cover"
                              alt="facilities images"
                            />
                          </div>
                        </Link>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
              <div className="relative mt-3 flex justify-center lg:mt-4 xl:mt-5 3xl:mt-6">
                <div
                  className={`swiper-bullets-container ${randomClassSwiper} !w-fit`}
                ></div>
              </div>
            </>
          ) : (
            <div className="relative aspect-[4/3] w-full md:aspect-[2/1] lg:aspect-[4/3]">
              <NextImg
                src="/assets/images/unavailable.png"
                alt="unavailable"
                objectFit="cover"
              />
            </div>
          )}
        </Fancybox>
      </div>
    </div>
  );
}
