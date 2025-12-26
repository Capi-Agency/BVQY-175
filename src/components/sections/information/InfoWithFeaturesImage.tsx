'use client';
import { CommonSection } from '@/src/types/pageBuilder';
import React from 'react';

export default function InfoWithFeaturesImage({ data }: CommonSection) {
  return (
    <div className="container flex flex-col gap-20 py-[60px] md:gap-40 md:py-20 xl:flex-row xl:gap-6 xl:py-40 2xl:gap-7 3xl:py-[176px] 4xl:justify-between 4xl:py-[200px]">
      <div className="grid grid-cols-1 gap-8 md:gap-6 lg:grid-cols-2 xl:gap-12 2xl:gap-[52px] 3xl:gap-[60px] 4xl:max-w-[700px]">
        {data?.items?.map((item: any, index: number) => (
          <div className="space-y-4" key={'i_' + index}>
            {item?.title && (
              <h1 className="section-title uppercase text-primary-600">
                {item?.title}
              </h1>
            )}
            <div
              className="section-content text-justify"
              dangerouslySetInnerHTML={{ __html: item?.blurb }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
