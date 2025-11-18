'use client';
import React, { useEffect, useState } from 'react';
import NextImg from '../../common/next-img';
import NewsCard from './NewsCard';
import { getListNews } from '@/src/services/news';
import { CommonSection } from '@/src/types/pageBuilder';

export default function NewsListCard({data}:CommonSection) {
  const [dataNews, setDataNews] = useState<any>([]);

  console.log(dataNews)
  useEffect(() => {
    (async () => {
      try {
        const response = await getListNews({ collection: 'posts' });
        setDataNews(response);
      } catch (error) {
        console.log('Error:', error);
      }
    })();
  }, [data]);

  return (
    <div>
      <div className="container flex items-center justify-between py-4">
        <div className="text-[40px] font-bold uppercase !leading-[1.3] text-black">
          {data?.title}
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

      <div className="container grid grid-cols-3 gap-x-10 gap-y-[52px] py-[64px]">
        {dataNews?.length > 0 && dataNews?.map((item: any, index: number) => (
          <NewsCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
}
