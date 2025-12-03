'use client';
import React from 'react';
import NextImg from '../../common/next-img';
import Link from 'next/link';
import { getAssetUrlById } from '@/src/utils/image';
import { formatDate } from '@/src/utils/validate';
import { useTranslate } from '@/src/hooks/useTranslate';
import useStoreLanguage from '@/src/store/store';
import useTranslation from '@/src/hooks/use-translation';

type NewsCardProps = {
  item: any;
  url: string;
  cateUrl?: string;
};

export default function NewsCard({ item, url, cateUrl }: NewsCardProps) {
  const trans = useTranslation();
  const language = useStoreLanguage((state: any) => state.language);

  const category = cateUrl || item?.categories?.[0]?.category?.slug || '';

  return (
    <Link
      href={`/${language}${url}/${category}/${item?.slug}`}
      aria-label="Xem chi tiết tin tức"
      className="group relative block cursor-pointer space-y-4 bg-primary-50 p-3 text-start transition-all duration-200 hover:bg-primary-600 xl:p-4"
    >
      {/* cover */}
      <div className="relative aspect-video">
        <NextImg
          src={getAssetUrlById(item?.thumbnail?.id || item?.thumbnail)}
          alt="post cover"
          objectFit="cover"
        />
      </div>
      <div className="space-y-1">
        <div className="line-clamp-2 h-[58px] text-lg font-semibold !leading-[1.6] text-primary-1000 duration-200 group-hover:text-primary-50 xl:h-[64px] xl:text-xl 3xl:h-[71px] 3xl:text-[22px] 4xl:h-[77px] 4xl:text-2xl">
          {trans(item?.title, item?.title_en)}
        </div>
        <div
          className="line-clamp-3 h-[60px] text-sm font-thin text-[#03110899] duration-200 group-hover:text-primary-100"
          dangerouslySetInnerHTML={{
            __html: trans(item?.blurb, item?.blurb_en),
          }}
        ></div>
      </div>

      {/* date published */}
      <div className="flex justify-between">
        <div className="flex items-center gap-1.5">
          <div className="relative size-5 transition-all duration-200 group-hover:brightness-0 group-hover:invert 2xl:size-6">
            <NextImg
              src="/assets/icons/calendar_gray.svg"
              alt="calendar icon"
            />
          </div>

          <p className="text-sm font-medium text-gray-700 duration-200 group-hover:text-primary-50 2xl:text-base">
            {formatDate(item?.date_published)}
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-medium text-gray-950 duration-200 group-hover:text-primary-50 2xl:text-base 3xl:text-lg">
            {trans('Xem chi tiết', 'View more')}
          </span>
          <div className="relative size-5 transition-all duration-200 group-hover:brightness-0 group-hover:invert 2xl:size-6">
            <NextImg
              src="/assets/icons/arrow_right_black.svg"
              alt="arrow icon"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
