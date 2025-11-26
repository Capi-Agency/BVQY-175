'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import useStoreLanguage from '@/src/store/store';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import NewsCard from '../news/NewsCard';
import { getListNews } from '@/src/services/news';
import { useTranslate } from '@/src/hooks/useTranslate';
import { CommonSection } from '@/src/types/pageBuilder';
import { getAssetUrlById } from '@/src/utils/image';
import NextImg from '../../common/next-img';
import { fnGetListItemByEndpoint } from '@/src/services/common';

const RelatedPosts = ({ data }: CommonSection) => {
  const language = useStoreLanguage((state: any) => state.language);
  const { trans } = useTranslate();

  const [newsData, setNewsData] = useState<any>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fnGetListItemByEndpoint(data?.url);
        setNewsData(response);
      } catch (error) {
        console.log('Error:', error);
      }
    })();
  }, [data]);

  return (
    <div className="py-10 lg:py-12 xl:py-14 2xl:py-16 3xl:py-[72px] 4xl:py-20">
      <div className="container flex items-center justify-between">
        <h1 className="section-title">{data?.title}</h1>
        <Link
          href={`/${language}${data?.buttons?.[0]?.url}`}
          className="group flex items-center gap-1.5 text-gray-950"
        >
          <span className="text-sm font-medium transition-colors duration-100 group-hover:text-primary-500 2xl:text-base 3xl:text-lg">
            {data?.buttons?.[0]?.title}
          </span>

          <div className="relative size-5 brightness-0 transition-all duration-100 group-hover:brightness-100 xl:size-6">
            <NextImg
              src={getAssetUrlById(data?.buttons?.[0]?.icon?.id)}
              alt="arrow icon"
            />
          </div>
        </Link>
      </div>

      <div className="lg:container">
        <div className="relative mt-6 md:mt-8 lg:mt-10 xl:mt-11 2xl:mt-12 3xl:mt-[52px] 4xl:mt-[60px]">
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
            {newsData?.length > 0 &&
              newsData?.map((item: any, index: number) => (
                <SwiperSlide key={'post_' + index}>
                  <NewsCard item={item} url={data?.buttons?.[0]?.url ?? '/tin-tuc'} />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default RelatedPosts;
