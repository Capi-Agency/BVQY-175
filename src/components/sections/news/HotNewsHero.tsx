'use client';
import { useTranslate } from '@/src/hooks/useTranslate';
import React, { useEffect, useState } from 'react';
import NextImg from '../../common/next-img';
import Link from 'next/link';
import { getListItemByEndpoint } from '@/src/services/news';
import { CommonSection } from '@/src/types/pageBuilder';
import { getAssetUrlById } from '@/src/utils/image';
import { formatDate } from '@/src/utils/validate';
import useStoreLanguage from '@/src/store/store';

export default function HotNewsHero({ data }: CommonSection) {
  const language = useStoreLanguage((state: any) => state.language);
  const { trans } = useTranslate();
  const [dataNews, setDataNews] = useState<any>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await getListItemByEndpoint(data?.url);
        setDataNews(response);
      } catch (error) {
        console.log('Error:', error);
      }
    })();
  }, [data]);

  return (
    <div>
      <div className="bg-primary-50">
        <div className="container flex h-[50px] items-center gap-1 text-xl">
          <Link href={'/'} className="font-normal text-[#71717A]">
            {trans('home-page-label')}
          </Link>

          <div className="relative size-4 -rotate-90">
            <NextImg src="/assets/icons/arrow_down_gray.svg" alt="arrow icon" />
          </div>

          <div className="font-semibold text-primary-600">
            {trans('news-page-label')}
          </div>
        </div>
      </div>

      <div className="container flex items-center justify-between py-4">
        <div className="text-[40px] font-bold uppercase !leading-[1.3] text-black">
          TIN NỔI BẬT
        </div>

        <button className="flex items-center gap-2">
          <div className="text-lg font-medium text-[#09090B]">Xem tất cả</div>
          <div className="relative size-6">
            <NextImg
              src="/assets/icons/arrow_right_primary.svg"
              alt="arrow icon"
            />
          </div>
        </button>
      </div>
      {dataNews?.length > 0 &&
        dataNews?.map(({ short_content }: any, index: number) => (
          <div
            key={index}
            className="container grid grid-cols-2 gap-[75px] py-10"
          >
            <Link
              href={`/${language}${data?.buttons?.[0]?.url}/${short_content?.slug}`}
              className="relative aspect-[4/3] overflow-hidden rounded-[20px]"
            >
              <NextImg
                src={getAssetUrlById(short_content?.thumbnail?.id)}
                alt="news thumbnail"
                objectFit="cover"
              />
            </Link>

            <div className="flex flex-col items-stretch justify-center gap-4">
              <div className="line-clamp-3 text-[32px] font-semibold uppercase text-black">
                {short_content?.title}
              </div>

              <div
                className="text-base font-normal text-black"
                dangerouslySetInnerHTML={{
                  __html: short_content?.blurb,
                }}
              ></div>

              <div className="flex items-center justify-between pt-4">
                <div className="flex items-center gap-3">
                  <div className="relative size-9">
                    <NextImg
                      src="/assets/icons/calendar_primary.svg"
                      alt="calendar icon"
                    />
                  </div>
                  <p className="text-xl font-medium text-black">
                    {formatDate(short_content?.date_published)}
                  </p>
                </div>

                <Link
                  href={`/${language}${data?.buttons?.[0]?.url}/${short_content?.slug}`}
                  className="flex items-center gap-3"
                >
                  <p className="text-xl font-medium text-black">
                    {data?.buttons?.[0]?.title}
                  </p>

                  <div className="relative size-9">
                    <NextImg
                      src={getAssetUrlById(data?.buttons?.[0]?.icon?.id)}
                      alt="arrow icon"
                    />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
