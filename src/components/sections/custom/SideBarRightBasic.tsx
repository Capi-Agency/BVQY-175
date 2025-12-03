'use client';
import { fnGetListitem } from '@/src/services/common';
import useStoreLanguage from '@/src/store/store';
import { CommonSection } from '@/src/types/pageBuilder';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

export default function SideBarRightBasic({ data }: CommonSection) {
  const [cateData, setCateData] = useState<any>([]);
  const language = useStoreLanguage((state: any) => state.language);
  const sidebarRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    if (!data.collections) return;
    (async () => {
      try {
        const response = await fnGetListitem({ collection: data?.collections });
        setCateData(response);
      } catch (error) {
        console.log('Error fetching data' + error);
      }
    })();
  }, []);

  useEffect(() => {
    if (!cateData) return;
    const sidebarContainer = document.querySelector('.sidebar-container');
    if (sidebarContainer) {
      sidebarContainer?.appendChild?.(sidebarRef.current);
    }
  }, [cateData]);

  return (
    <div ref={sidebarRef} className="w-full">
      {/*  Tags  */}
      <h3 className="mb-2 text-base font-semibold text-gray-950 lg:mb-4 lg:text-lg 3xl:mb-5">
        {data?.title}
      </h3>

      {cateData?.map((cate: any) => (
        <Link
          href={`/${language}/tin-tuc/${cate?.slug}`}
          key={cate?.slug}
          className="block border-b border-gray-200 py-2.5 text-sm font-medium text-gray-700 lg:py-3 lg:text-base"
        >
          {language === 'en' ? cate?.title_en : cate?.title}
        </Link>
      ))}

      {data?.items?.map((item: any, index: number) => (
        <Link
          href={`/${language}${item?.buttons?.[0]?.url}`}
          key={index}
          className="block border-b border-gray-200 py-2.5 text-sm font-medium text-gray-700 lg:py-3 lg:text-base"
        >
          {item?.buttons?.[0]?.title}
        </Link>
      ))}
    </div>
  );
}
