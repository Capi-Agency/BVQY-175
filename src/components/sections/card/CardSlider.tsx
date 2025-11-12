'use client';
import { CommonSection } from '@/src/types/pageBuilder';
import React, { useMemo, useRef, useState } from 'react';
import NextImg from '../../common/next-img';
import { getAssetUrlById } from '@/src/utils/image';
import clsx from 'clsx';

const CardSlider = ({ data }: CommonSection) => {
  const [activeItem, setActiveItem] = useState(0);
  const item = useMemo(
    () => data?.items?.[activeItem],
    [activeItem, data?.items],
  );
  return (
    <div className="container bg-primary-50 py-10 md:py-6 lg:py-10 2xl:py-20 3xl:py-[100px] 4xl:py-20">
      <h3 className="section-title uppercase text-primary-600">
        {data?.title}
      </h3>

      {/* navigation dots */}
      <NavDots
        items={data?.items}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />

      {/* content */}
      <div className="flex flex-col gap-10 md:gap-6 lg:flex-row xl:gap-8 3xl:gap-10">
        <div className="w-full lg:w-[460px] xl:w-[524px] 2xl:w-[540px] 3xl:w-[654px] 4xl:w-[700px]">
          <p className="text-sm font-semibold text-primary-500 2xl:text-base">
            {item.title}
          </p>
          <h4 className="mb-4 text-[30px] font-bold leading-[1.25] text-primary-950 md:text-[32px] lg:mb-6 lg:text-[36px] xl:mb-7 xl:text-[40px] 2xl:text-[48px] 3xl:text-[60px] 4xl:mb-10 4xl:text-[72px]">
            {item.subtitle}
          </h4>
          <p
            className="section-content"
            dangerouslySetInnerHTML={{
              __html: item?.blurb as string,
            }}
          ></p>
        </div>
        <div className="relative h-[220px] w-full md:h-[256px] lg:h-[280px] lg:flex-1 xl:h-[312px] 2xl:h-[360px] 3xl:h-[376px] 4xl:h-[400px]">
          <NextImg
            src={getAssetUrlById(item?.cover?.id)}
            alt="Giá trị cốt lõi icon"
            objectFit="contain"
          />
        </div>
      </div>
    </div>
  );
};

export default CardSlider;

type CardItem = {
  title: string;
  subtitle: string;
  blurb: string;
  cover: string;
};

const NavDots = ({
  items,
  activeItem,
  setActiveItem,
}: {
  items: CardItem[];
  activeItem: any;
  setActiveItem: any;
}) => {
  return (
    <div className="my-6 max-w-full overflow-x-auto overflow-y-visible pt-6 xl:mb-10 xl:mt-8 3xl:mb-12 4xl:mb-[52px] 4xl:mt-10">
      <div className="relative flex -translate-y-5 items-center justify-start transition-all duration-500 ease-in-out">
        {items.map((item, index) => {
          const isActive = index === activeItem;
          return (
            <div
              key={'dot_' + index}
              onClick={() => setActiveItem(index)}
              className={clsx(
                'flex cursor-pointer flex-col items-center justify-center gap-2 transition-all duration-500 ease-in-out 4xl:gap-4',
                isActive ? 'text-primary-600' : 'text-gray-300',
              )}
              style={{
                // tăng khoảng cách giữa dot active và các dot xung quanh
                marginRight: isActive ? '7.25rem' : '2.5rem', // 1.5rem * 2.5 = 3.75rem
                marginLeft: isActive ? '3.25rem' : '2.5rem', // 1.5rem * 1.5 = 2.25rem
              }}
            >
              <div
                className={clsx(
                  'relative size-6 rounded-full bg-[currentColor] transition-all duration-500 ease-in-out xl:size-7 4xl:size-8',
                  isActive ? 'outline outline-[6px] outline-white' : '',
                )}
              ></div>
              <p
                className={clsx(
                  'text-2xl font-semibold leading-[1.12] transition-all duration-500 ease-in-out xl:text-[28px] 4xl:text-[32px]',
                  isActive ? 'text-primary-600' : 'text-[#969696]',
                )}
              >
                {item.subtitle}
              </p>
            </div>
          );
        })}

        <div className="absolute top-2 -z-10 h-2 w-[1280px] bg-gray-300 xl:top-2.5 4xl:top-3.5"></div>
        {/* <div className="absolute top-3.5 z-10 h-1 bg-primary-600"></div> */}
      </div>
    </div>
  );
};
