'use client';
import { fnGetListitem } from '@/src/services/common';
import useStoreLanguage from '@/src/store/store';
import { CommonSection } from '@/src/types/pageBuilder';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import CustomLink from '../../common/custom-link';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default function SideBarRightBasic({ data }: CommonSection) {
  const [cateData, setCateData] = useState<any>([]);
  const language = useStoreLanguage((state: any) => state.language);
  const sidebarRef = useRef<HTMLDivElement>(null!);
  const [hasSidebarContainer, setHasSidebarContainer] = useState(false);

  useEffect(() => {
    if (!data.collections) return;
    (async () => {
      try {
        const response = await fnGetListitem({ collection: data?.collections });
        setCateData(response);
      } catch (error) {
        console.log('Error fetching data' + error);
      } finally {
        ScrollTrigger.refresh();
      }
    })();
  }, []);

  useEffect(() => {
    if (!cateData) return;
    const sidebarContainer = document.querySelector('.sidebar-container');
    if (sidebarContainer) {
      sidebarContainer?.appendChild?.(sidebarRef.current);
      setHasSidebarContainer(true);
    } else {
      setHasSidebarContainer(false);
    }
  }, [cateData]);

  return (
    <div ref={sidebarRef} className="w-full h-fit md:sticky md:top-[100px] lg:top-[120px] xl:top-[170px] 2xl:top-[190px] 3xl:top-[200px] 4xl:top-[220px]">
      {/*  Tags  */}
      {hasSidebarContainer && (
        <>
          <h3 className="mb-2 text-base font-semibold text-gray-950 lg:mb-4 lg:text-lg 3xl:mb-5">
            {data?.title}
          </h3>

          {cateData?.map((cate: any, index: number) => (
            <Link
              href={`/${language}${data?.buttons?.[0]?.url}/${cate?.slug}`}
              key={cate?.slug || index}
              className="block border-b border-gray-200 py-2.5 text-sm font-medium hover:text-primary-600 text-gray-700 transition-all duration-200 lg:py-3 lg:text-base"
            >
              {language === 'en' ? cate?.title_en : cate?.title}
            </Link>
          ))}

          {cateData?.length === 0 && data?.buttons?.map((item: any, index: number) => (
            <CustomLink
              href={item?.url}
              key={index}
              className="block border-b border-gray-200 py-2.5 text-sm font-medium hover:text-primary-600 text-gray-700 transition-all duration-200 lg:py-3 lg:text-base"
            >
              {item?.title}
            </CustomLink>
          ))}
        </>
      )}
    </div>
  );
}
