'use client';
import { CommonSection } from '@/src/types/pageBuilder';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import NextImg from '../../common/next-img';
import { getAssetUrlById } from '@/src/utils/image';
import clsx from 'clsx';

type Props = {};

const InforWIthFeatureImage = ({ data }: CommonSection) => {
  return (
    <div className="container flex flex-col gap-20 py-[60px] md:gap-40 md:py-20 lg:py-[100px] xl:flex-row xl:gap-6 xl:py-40 2xl:gap-7 3xl:py-[176px] 4xl:justify-between 4xl:py-[200px]">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-6 xl:flex xl:flex-1 xl:flex-col xl:justify-center xl:gap-12 2xl:gap-[52px] 3xl:gap-[60px] 4xl:max-w-[700px]">
        {data?.items?.map((item: any, index: number) => (
          <div className="space-y-4" key={'i_' + index}>
            <h1 className="section-title uppercase text-primary-600">
              {item?.title}
            </h1>
            <div
              className="section-content"
              dangerouslySetInnerHTML={{
                __html: item?.blurb,
              }}
            ></div>
          </div>
        ))}
      </div>

      <div className="space-y-6 xl:space-y-[30px]">
        {/* Card Doctor */}
        <div className="relative h-[156px] w-full overflow-y-visible rounded-xl bg-primary-600 p-5 text-end md:mx-auto md:h-[264px] md:max-w-[580px] md:px-8 md:py-9 4xl:p-10">
          <div className="text-[14px] text-primary-200 md:text-[22px] 4xl:text-[24px]">
            {data?.subtitle}
          </div>
          <div className="text-[18px] text-primary-50 md:text-[30px] 4xl:text-[32px]">
            {data?.title}
          </div>
          <div className="text-[14px] text-primary-100 md:text-[22px] 4xl:text-[24px]">
            {data?.blurb}
          </div>
          <img
            src={getAssetUrlById(data?.cover?.id)}
            alt="doctor"
            className="absolute bottom-0 left-0 h-[234px] md:h-[396px]"
          />
          <img
            src="/assets/images/logo-short-form.png"
            alt="logo"
            className="absolute bottom-0 right-5 md:w-[203px]"
          />
        </div>
        {/* Quote */}
        <div
          className="w-full text-center text-lg !leading-[1.4] text-primary-950 md:mx-auto md:max-w-[580px] lg:text-xl xl:text-[28px] 3xl:text-[32px]"
          dangerouslySetInnerHTML={{
            __html: data?.contents as string,
          }}
        ></div>
      </div>
    </div>
  );
};

export default InforWIthFeatureImage;
