import { CommonSection } from '@/src/types/pageBuilder';
import React from 'react';
import CustomLink from '../../common/custom-link';

export default function ContentCongDichVuCong({ data }: CommonSection) {
  const button = data?.buttons?.[0];
  return (
    <section className="container py-[60px] md:py-[80px] xl:py-[120px]">
      <div className="flex flex-col gap-6 md:grid md:grid-cols-[auto,220px] md:flex-row lg:grid-cols-[auto,260px] lg:gap-8 lg:px-6 xl:gap-11 xl:px-[60px] 2xl:gap-12 2xl:px-[100px] 3xl:gap-[60px] 3xl:px-[80px] 4xl:px-[160px]">
        <div className="space-y-8">
          {data?.title && (
            <h1 className="text-[24px] font-bold text-primary-600 md:text-[28px] xl:text-[32px] 4xl:text-[32px]">
              {data?.title}
            </h1>
          )}

          {button && (
            <CustomLink
              href={button.url}
              className="flex h-[50px] w-fit items-center justify-center rounded-md bg-primary-700 px-[20px] text-center text-[16px] font-bold text-white md:px-[40px] md:text-[18px] xl:px-[50px] xl:text-[20px]"
            >
              {button.title}
            </CustomLink>
          )}

          <div
            className="content-wrapper overflow-auto"
            dangerouslySetInnerHTML={{
              __html: data?.contents,
            }}
          ></div>
        </div>
        {/* Sidebar */}
        <div className="sidebar-container relative"></div>
      </div>
    </section>
  );
}
