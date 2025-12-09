'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import PaginationPrimary from '../pagination/PaginationPrimary';
import useTranslation from '@/src/hooks/use-translation';
import { useSearchParams } from 'next/navigation';
import {
  fnGetAdminDepartments,
  getTotalAdminDepartmentCount,
} from '@/src/services/adminDepartment';
import { CommonSection } from '@/src/types/pageBuilder';
import { getAssetUrlById } from '@/src/utils/image';
import NextImg from '../../common/next-img';
import CustomLink from '../../common/custom-link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollToPlugin, ScrollTrigger);

export default function Card4Col({ data }: CommonSection) {
  const containerRef = useRef<any>(null);
  const selector = gsap.utils.selector(containerRef);

  const trans = useTranslation();
  const searchParams = useSearchParams();

  const [adminDepartData, setAdminDepartData] = useState<any>([]);
  const [length, setLength] = useState<number>(0);

  const currentPage = Number(searchParams.get('page')) || 1;
  const totalPage: number = useMemo(() => {
    return length
      ? Math.ceil(Number(length) / data?.collection_items_limit)
      : 0;
  }, [length, data?.collection_items_limit]);

  async function fetchData() {
    try {
      const response = await fnGetAdminDepartments({
        collection: data?.collections,
        page: currentPage,
        limit: data?.collection_items_limit,
      });
      setAdminDepartData(response);
    } catch (error) {
      console.log('Error:', error);
    }
  }

  useGSAP(
    () => {
      gsap.to(selector('.admin-depart-card'), {
        scale: 0.9,
        opacity: 0,
        stagger: {
          each: 0.1,
          grid: 'auto',
        },
        duration: 0.3,
        onStart: () => {
          fetchData();
        },
      });
    },
    {
      scope: containerRef,
      dependencies: [data, currentPage],
    },
  );

  useEffect(() => {
    (async () => {
      try {
        const response = await getTotalAdminDepartmentCount({
          collection: data?.collections,
        });
        setLength(response);
      } catch (error) {
        console.log('Error:', error);
      }
    })();
  }, [data]);

  useGSAP(
    () => {
      if (!adminDepartData) return;
      ScrollTrigger.batch(selector('.admin-depart-card'), {
        start: 'top 90%',
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            scale: 1,
            stagger: {
              each: 0.05,
              grid: 'auto',
              ease: 'power1.out',
            },
            duration: 0.7,
          });
        },
      });
    },
    { scope: containerRef, dependencies: [adminDepartData] },
  );

  return (
    <section ref={containerRef}>
      <div
        id="admin-depart-list"
        className="p-[40px_0] lg:p-[40px_0] xl:p-[48px_0] 2xl:p-[52px_0] 3xl:p-[56px_0] 4xl:p-[64px_0]"
      >
        <div className="container">
          {adminDepartData?.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 2xl:gap-5 3xl:gap-6 4xl:gap-8">
              {adminDepartData?.map((item: any, index: number) => (
                <div
                  key={item?.slug ?? index}
                  className="admin-depart-card col-span-1 origin-center scale-[0.9] opacity-0"
                >
                  <CustomLink
                    href={`${data?.buttons?.[0]?.url}/${item?.slug}`}
                    aria-label="Xem chi tiết khối cơ quan hành chính"
                    className="group relative flex cursor-pointer flex-col justify-between gap-4 bg-primary-50 p-3 text-start transition-all duration-200 hover:bg-primary-600 md:h-full xl:p-4"
                  >
                    {/* cover */}
                    <div className="space-y-4">
                      <div className="relative aspect-video">
                        <NextImg
                          src={getAssetUrlById(item?.cover?.id || item?.cover)}
                          alt="admin department cover"
                          objectFit="cover"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="text-lg font-semibold !leading-[1.5] text-primary-1000 duration-200 group-hover:text-primary-50 xl:text-xl 2xl:line-clamp-2 2xl:h-16 3xl:h-[66px] 3xl:text-[22px] 4xl:h-[72px] 4xl:text-2xl">
                          {trans(item?.title, item?.title_en)}
                        </div>
                        <div
                          className="text-sm font-thin text-[#03110899] duration-200 group-hover:text-primary-100"
                          dangerouslySetInnerHTML={{
                            __html: trans(
                              item?.organizational_structure,
                              item?.organizational_structure_en,
                            ),
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-medium text-gray-950 duration-200 group-hover:text-primary-50 2xl:text-base 3xl:text-lg">
                          {data?.buttons?.[0]?.title}
                        </span>
                        <div className="relative size-5 transition-all duration-200 group-hover:brightness-0 group-hover:invert 2xl:size-6">
                          <NextImg
                            src={getAssetUrlById(data?.buttons?.[0]?.icon?.id)}
                            alt="arrow icon"
                          />
                        </div>
                      </div>
                    </div>
                  </CustomLink>
                </div>
              ))}

              <PaginationPrimary
                currentPage={currentPage}
                totalPage={totalPage}
                idSection="admin-depart-list"
              />
            </div>
          ) : (
            <div className="text-normal flex h-[calc(100vh/3)] items-center justify-center text-sm font-medium text-black lg:text-base xl:text-lg">
              {trans('Không có dữ liệu', 'No data available')}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
