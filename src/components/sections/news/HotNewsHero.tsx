'use client';
import { useTranslate } from '@/src/hooks/useTranslate';
import React from 'react';
import NextImg from '../../common/next-img';
import Link from 'next/link';
import NewsCard from './NewsCard';

export default function HotNewsHero() {
  const { trans } = useTranslate();

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

      <div className="container grid grid-cols-2 gap-[75px] py-10">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] bg-red-500"></div>

        <div className='flex flex-col items-stretch gap-4 justify-center'>
<div className='text-[]'>
    BỘ QUỐC PHÒNG KIỂM TRA, ĐÁNH GIÁ CÔNG TÁC CHUYỂN ĐỔI SỐ TẠI BV QUÂN Y 175
</div>
<NewsCard />
        </div>
      </div>
    </div>
  );
}
