import { CommonSection } from '@/src/types/pageBuilder';
import React from 'react';
import NextImg from '../../common/next-img';
import { getAssetUrlById } from '@/src/utils/image';
import CustomLink from '../../common/custom-link';
import TeamSlider5ColClient from './TeamSlider5Col.client';

export default function TeamSlider5Col({ data }: CommonSection) {
  return (
    <section className="bg-primary-50 py-10 md:py-6 lg:py-10 xl:py-11 2xl:py-12 3xl:py-[52px] 4xl:py-[60px]">
      <div className="container">
        <div className="section-sub-title text-center">{data?.subtitle}</div>
        {data?.title && (
          <h1 className="section-title mt-1 text-center">{data?.title}</h1>
        )}
      </div>

      <TeamSlider5ColClient data={data} />

      <div className="container">
        <div className="flex justify-center pt-5 xl:pt-6 2xl:pt-7 3xl:pt-8 4xl:pt-10">
          <CustomLink
            href={`${data?.buttons?.[0]?.url}`}
            className="btn-danger"
            aria-label="Xem tất cả bác sĩ"
          >
            {data?.buttons?.[0]?.title}
            <div className="relative size-5 2xl:size-6">
              <NextImg
                src={getAssetUrlById(data?.buttons?.[0]?.icon?.id)}
                alt="icon"
              />
            </div>
          </CustomLink>
        </div>
      </div>
    </section>
  );
}
