'use client';
import Link from 'next/link';
import React from 'react';
import NextImg from '../next-img';
import { useTranslate } from '@/src/hooks/useTranslate';
import useStoreLanguage from '@/src/store/store';

type BreadcrumbItem = {
  title: string;
  url?: string;
};

type Props = {
  items: BreadcrumbItem[];
};

export default function Breadcrumb({ items }: Props) {
  const { trans } = useTranslate();
  const language = useStoreLanguage((state: any) => state.language);

  return (
    <div className="bg-primary-50">
      <div className="container flex items-center gap-1 py-1.5 text-sm md:text-base lg:gap-1.5 lg:py-2 lg:text-lg xl:py-2.5 4xl:gap-2 4xl:py-3 4xl:text-xl">
        {items?.map((item: BreadcrumbItem, index: number) => {
          const isLast = index === items.length - 1;

          return (
            <React.Fragment key={index}>
              {isLast ? (
                <div className="font-semibold text-primary-600">
                  {trans(item?.title)}
                </div>
              ) : (
                <Link
                  href={`/${language}${item?.url}` || '/'}
                  className="font-normal text-[#71717A] transition-colors hover:text-primary-600"
                >
                  {trans(item?.title)}
                </Link>
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
