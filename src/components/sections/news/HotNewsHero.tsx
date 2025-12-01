'use client';
import React, { useEffect, useState } from 'react';
import NextImg from '../../common/next-img';
import Link from 'next/link';
import { CommonSection } from '@/src/types/pageBuilder';
import { getAssetUrlById } from '@/src/utils/image';
import { formatDate } from '@/src/utils/validate';
import useStoreLanguage from '@/src/store/store';
import { fnGetListItemByEndpoint } from '@/src/services/common';

export default function HotNewsHero({ data }: CommonSection) {
  const language = useStoreLanguage((state: any) => state.language);
  const [dataNews, setDataNews] = useState<any>([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await fnGetListItemByEndpoint(data?.url);
        setDataNews(response);
      } catch (error) {
        console.log('Error:', error);
      }
    })();
  }, [data]);

  return (
    <section>
      <div className="p-[40px_0] md:p-[44px_0_24px] lg:p-[52px_0_28px] xl:p-[64px_0_32px] 3xl:p-[72px_0_32px] 4xl:p-[80px_0_40px]">
        <div className="container space-y-8 lg:space-y-10 xl:space-y-12 3xl:space-y-[52px] 4xl:space-y-[60px]">
          {data?.title && (
            <h2
              className="section-title text-primary-950"
              dangerouslySetInnerHTML={{
                __html: data?.title,
              }}
            ></h2>
          )}
          {dataNews?.length > 0 &&
            dataNews?.map(({ short_content }: any, index: number) => (
              <Link
                key={index}
                href={`/${language}${data?.buttons?.[0]?.url}/${short_content?.slug}`}
                aria-label="Xem chi tiết tin tức"
                className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-6 lg:gap-8 xl:gap-10 2xl:gap-11 3xl:gap-[52px] 4xl:gap-[60px]"
              >
                <div className="relative aspect-video overflow-hidden">
                  <NextImg
                    src={getAssetUrlById(short_content?.thumbnail?.id)}
                    alt="news thumbnail"
                    objectFit="cover"
                  />
                </div>

                <div className="flex flex-col items-stretch justify-center">
                  <div className="line-clamp-3 text-xl font-semibold uppercase text-primary-600 lg:text-2xl 2xl:text-[28px] 2xl:!leading-[1.5] 3xl:text-[30px] 4xl:text-[32px]">
                    {short_content?.title}
                  </div>

                  <div
                    className="line-clamp-3 pt-1.5 text-sm font-normal text-black lg:pt-2 xl:text-base 2xl:pt-3 4xl:pt-4"
                    dangerouslySetInnerHTML={{
                      __html: short_content?.blurb,
                    }}
                  ></div>

                  <div className="flex items-center justify-between pt-3 lg:pt-4 2xl:pt-5 3xl:pt-6">
                    <div className="flex items-center gap-1.5 xl:gap-2">
                      <div className="relative size-5 xl:size-6">
                        <NextImg
                          src="/assets/icons/calendar_gray.svg"
                          alt="calendar icon"
                        />
                      </div>
                      <p className="text-sm font-medium text-black lg:text-base 3xl:text-lg 4xl:text-xl">
                        {formatDate(short_content?.date_published)}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 xl:gap-2">
                      <p className="text-sm font-medium text-black lg:text-base 3xl:text-lg 4xl:text-xl">
                        {data?.buttons?.[0]?.title}
                      </p>

                      <div className="relative size-5 xl:size-6">
                        <NextImg
                          src={getAssetUrlById(data?.buttons?.[0]?.icon?.id)}
                          alt="arrow icon"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
