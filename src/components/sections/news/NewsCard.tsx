'use client';
import React from 'react';
import NextImg from '../../common/next-img';
import Link from 'next/link';
import { getAssetUrlById } from '@/src/utils/image';
import { formatDate } from '@/src/utils/validate';
import { useTranslate } from '@/src/hooks/useTranslate';
import useStoreLanguage from '@/src/store/store';

export default function NewsCard({ item, url }: any) {
  const { trans } = useTranslate();
  const language = useStoreLanguage((state: any) => state.language);

  const { short_content } = item;
  return (
    <Link
      href={`/${language}${url}/${short_content?.slug}`}
      className="group relative cursor-pointer space-y-4 bg-primary-50 p-3 text-start transition-all duration-200 hover:bg-primary-600 xl:p-4"
    >
      {/* cover */}
      <div className="relative aspect-video">
        <NextImg
          src={getAssetUrlById(short_content?.thumbnail?.id)}
          alt="post cover"
          objectFit="cover"
        />
      </div>
      <div className="space-y-1">
        <h4 className="line-clamp-2 text-lg font-semibold !leading-[1.6] text-primary-1000 duration-200 group-hover:text-primary-50 xl:text-xl 3xl:text-[22px] 4xl:text-2xl">
          {short_content?.title}
        </h4>
        <div
          className="line-clamp-3 text-sm font-thin text-[#03110899] duration-200 group-hover:text-primary-100"
          dangerouslySetInnerHTML={{
            __html: short_content?.blurb,
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
            {formatDate(short_content?.date_published)}
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-medium text-gray-950 duration-200 group-hover:text-primary-50 2xl:text-base 3xl:text-lg">
            {trans('view-more-label')}
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
