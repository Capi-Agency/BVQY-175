'use client';
import { CommonSection } from '@/src/types/pageBuilder';
import React, { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import NextImg from '../../common/next-img';
import { getAssetUrlById } from '@/src/utils/image';
import Fancybox from '../../common/Fancybox';
import Link from 'next/link';
import { cn } from '@/src/lib/utils';

export default function InfoWithLeftImage({ data, dataDetail }: CommonSection) {
  const hasContent =
    !!dataDetail?.technologies ||
    (Array.isArray(dataDetail?.technologies_images) &&
      dataDetail.technologies_images.length > 0);
  const [randomClassSwiper, setRandomClassSwiper] = useState<string | null>(
    null,
  );

  useEffect(() => {
    setRandomClassSwiper(
      `swiper-custom-${Math.random().toString(36).substring(2, 9)}`,
    );
  }, []);

  if (!hasContent) return null;

  const hasImages = dataDetail?.technologies_images?.length > 0

  return (
    <div className="bg-primary-50 py-6 md:py-8 lg:py-10 xl:py-11 2xl:py-12 3xl:py-[52px] 4xl:py-[60px]">
      <div className={`${hasImages ? "lg:grid-cols-2" : "lg:grid-cols-1"} container grid grid-cols-1 gap-4 md:gap-6 lg:gap-8 xl:gap-10 2xl:gap-12 3xl:gap-[52px] 4xl:gap-[60px]`}>
        <div className={`${hasImages ? "lg:aspect-[4/3]" : ""} flex flex-col items-stretch gap-2 lg:order-2 lg:gap-4 2xl:gap-5`}>
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
            className={cn("content-wrapper section-content sidebar relative text-justify md:pr-2 lg:flex-1 lg:overflow-y-auto")}
            dangerouslySetInnerHTML={{
              __html: dataDetail?.technologies,
            }}
          ></div>
        </div>

        {hasImages && randomClassSwiper ? (
          <Fancybox
            options={{
              Carousel: {
                infinite: true,
              },
              Images: {
                zoom: true,
              },
            }}
            className="lg:order-1"
          >
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
                fadeEffect={{ crossFade: true }}
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
                {dataDetail?.technologies_images?.map((item: any) => (
                  <SwiperSlide key={item?.directus_files_id}>
                    <Link
                      href={getAssetUrlById(item?.directus_files_id)}
                      data-fancybox="gallery"
                      className="relative block size-full"
                    >
                      <div className="relative size-full">
                        <NextImg
                          src={getAssetUrlById(item?.directus_files_id)}
                          objectFit="cover"
                          alt="facilities images"
                        />
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="relative mt-3 flex justify-center lg:mt-4 xl:mt-5 3xl:mt-6">
              <div
                className={`swiper-bullets-container ${randomClassSwiper} !w-fit`}
              ></div>
            </div>
          </Fancybox>
        ) : (
          <div className="relative aspect-[4/3] w-full md:aspect-[2/1] lg:aspect-[4/3]">
            <NextImg
              src="/assets/images/unavailable.png"
              alt="unavailable"
              objectFit="cover"
            />
          </div>
        )}
      </div>
    </div>
  );
}
