'use client';
import Link from 'next/link';
import React from 'react';
import NextImg from '../../common/next-img';
import useStoreLanguage from '@/src/store/store';
import { CommonSection } from '@/src/types/pageBuilder';

export default function BreadcrumbBasic({ data, dataDetail }: CommonSection) {
  const language = useStoreLanguage((state: any) => state.language);
  const categoryTitle = dataDetail?.categories?.[0]?.category?.title || null;
  const rawBtns = data?.buttons || [];
  const len = rawBtns.length;
  const buttons = categoryTitle
    ? [...rawBtns.slice(0, len - 1), { title: categoryTitle }, rawBtns[len - 1]]
    : rawBtns;

  return (
    <div className="bg-primary-50">
      <div className="container flex flex-wrap items-center gap-1 py-2 text-sm md:text-base lg:gap-1.5 lg:py-2 lg:text-lg xl:py-2.5 4xl:gap-2 4xl:py-3 4xl:text-xl">
        {buttons?.map((button: any, index: number) => {
          const isLast = index === buttons.length - 1;

          return (
            <React.Fragment key={index}>
              {button?.url ? (
                <Link
                  href={`/${language}${button?.url}` || '/'}
                  aria-label="Chuyển trang"
                  className={`${isLast ? 'font-semibold text-primary-600' : 'font-normal text-[#71717A] hover:text-primary-600'} block transition-colors duration-100`}
                >
                  {button?.title}
                </Link>
              ) : (
                <div
                  className={`${isLast ? 'font-semibold text-primary-600' : 'font-normal text-[#71717A] hover:text-primary-600'} block transition-colors duration-100`}
                >
                  {button?.title}
                </div>
              )}

              {!isLast && (
                <div className="relative size-4 -rotate-90 xl:size-5">
                  <NextImg
                    src="/assets/icons/arrow_down_gray.svg"
                    alt="arrow icon"
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
