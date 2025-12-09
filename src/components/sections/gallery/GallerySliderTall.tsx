'use client';

import React, { useState } from 'react';
import { CommonSection } from '@/src/types/pageBuilder';
import 'swiper/css';

// Hàm lấy ID từ URL Youtube
const getYoutubeId = (url: string) => {
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

// Hàm tạo thumbnail từ ID Youtube
const getThumbnail = (url: string) => {
  const id = getYoutubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : '';
};

export default function GallerySliderTall({ data }: CommonSection) {
  const items = data?.items || [];
  console.log('🚀 ~ GallerySliderTall ~ items:', items);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!items.length) return null;

  const activeVideo = items[activeIndex];
  const activeId = getYoutubeId(activeVideo?.blurb);

  if (items.length === 0) return null;

  return (
    <div className="container py-10 md:py-6 lg:py-10 xl:py-[60px] 2xl:py-[80px] 3xl:py-[100px]">
      {/* VIDEO LỚN */}
      <div className="mx-auto w-full">
        <div className="aspect-video overflow-hidden rounded-lg shadow lg:rounded-xl 2xl:rounded-xl">
          {activeId && (
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${activeId}`}
              allowFullScreen
              className="rounded-xl"
            ></iframe>
          )}
        </div>
      </div>

      {/* THUMBNAIL LIST */}
      <div className="mx-auto mt-6 grid grid-cols-1 gap-4 md:grid-cols-3 lg:mt-10 lg:gap-8 2xl:mt-14 2xl:gap-10">
        {items.map((item: any, index: number) => {
          const thumb = getThumbnail(item?.blurb);

          return (
            <div
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`cursor-pointer space-y-4 overflow-hidden rounded-sm border bg-primary-50 p-2 lg:p-3 2xl:p-4 ${
                activeIndex === index
                  ? 'border-primary-600'
                  : 'border-primary-50'
              }`}
            >
              <img
                src={thumb}
                className="aspect-video w-full object-cover"
                alt={item.title}
              />
              <div className="text-base font-semibold leading-tight text-primary-1000 lg:text-lg 2xl:text-xl">
                {item.title}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
