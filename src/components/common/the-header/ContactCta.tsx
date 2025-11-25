'use client';
import { useTranslate } from '@/src/hooks/useTranslate';
import { useMetadata } from '@/src/providers/MetadataProvider';
import React from 'react';
import NextImg from '../next-img';

export default function ContactCta() {
  const { trans } = useTranslate();
  const { contact_information } = useMetadata();

  return (
    <div className="relative flex h-[352px] w-[330px] flex-col justify-between overflow-hidden rounded-[6px] bg-[#092E15] py-9 2xl:h-[400px] 2xl:w-[380px] 2xl:py-10 4xl:h-[424px] 4xl:w-[400px]">
      <div
        className="w-full px-6 text-[28px] font-bold leading-[1.3] text-[#F6FAF7] 2xl:px-7 2xl:text-[32px] 4xl:px-8 4xl:text-[36px]"
        dangerouslySetInnerHTML={{
          __html: trans('make-an-appointment-title'),
        }}
      ></div>

      <div
        className="p-[14px_24px] 2xl:p-[18px_30px] 4xl:p-[20px_32px]"
        style={{
          background:
            'linear-gradient(0deg, #06500D 4.41%, rgba(21, 86, 40, 0.00) 234.22%)',
        }}
      >
        <div className="w-[220px] text-xs font-normal text-[#F4F4F5] 2xl:w-[254px] 2xl:text-sm">
          {trans('make-an-appointment-des')}
        </div>
      </div>

      <div className="px-6 2xl:px-7 4xl:px-8">
        <a
          href={`${contact_information?.hot_line_url || '/'}`}
          className="btn-danger relative z-[2]"
        >
          {trans('make-an-appointment-btn')}

          <div className="relative size-5">
            <NextImg src="/assets/icons/phone_white.svg" alt="phone icon" />
          </div>
        </a>
      </div>

      <div className="absolute bottom-0 right-0 z-[1] aspect-[2/3] w-[160px] 2xl:w-[180px] 4xl:w-[200px]">
        <NextImg
          src="/assets/images/tran_quoc_viet_cover.png"
          alt="cover"
          objectFit="cover"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 size-full opacity-70 mix-blend-soft-light">
        <NextImg
          src="/assets/images/grid_layout.png"
          alt="cover"
          objectFit="cover"
        />
      </div>
    </div>
  );
}
