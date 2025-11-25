'use client';
import React, {
  useEffect,
  useMemo,
  useState,
  useCallback,
  useRef,
} from 'react';
import NextImg from '../../common/next-img';
import NewsCard from './NewsCard';
import { getListNews, getTotalNewsCount } from '@/src/services/news';
import { CommonSection } from '@/src/types/pageBuilder';
import { getPaginatedPages } from '@/src/utils/pagination';
import { useRouter, useSearchParams } from 'next/navigation';
import { debounce } from 'lodash';
import { useGSAP } from '@gsap/react';
import { useGsapMatchMedia } from '@/src/providers/GsapMatchMediaProvider';
import { getOffsetY } from '@/src/utils/gsap';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useTranslate } from '@/src/hooks/useTranslate';

gsap.registerPlugin(useGSAP, ScrollToPlugin, ScrollTrigger);

export default function NewsListCard({ data }: CommonSection) {
  const { trans } = useTranslate();
  const { conditions } = useGsapMatchMedia();
  const containerRef = useRef<any>(null);
  const selector = gsap.utils.selector(containerRef);

  const router = useRouter();
  const searchParams = useSearchParams();

  const [dataNews, setDataNews] = useState<any>([]);
  const [length, setLength] = useState<number>(0);

  const currentPage = Number(searchParams.get('page')) || 1;
  const isSort: boolean = data?.collection_items_order === '-date_published';

  const totalPage: number = useMemo(() => {
    return length
      ? Math.ceil(Number(length) / data?.collection_items_limit)
      : 0;
  }, [length, data?.collection_items_limit]);

  const pagination = useMemo(
    () => getPaginatedPages(totalPage, currentPage),
    [totalPage, currentPage],
  );

  const { contextSafe } = useGSAP(
    () => {
      gsap.to(selector('.news-card'), {
        scale: 0.9,
        opacity: 0,
        stagger: {
          each: 0.1,
          grid: 'auto',
        },
        duration: 0.3,
        onComplete: () => {
          fetchData();
        },
      });
    },
    {
      scope: containerRef,
      dependencies: [data, currentPage],
    },
  );

  async function fetchData() {
    try {
      const response = await getListNews({
        collection: data?.collections,
        page: currentPage,
        limit: data?.collection_items_limit,
        sort: isSort,
      });
      setDataNews(response);
    } catch (error) {
      console.log('Error:', error);
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const response = await getTotalNewsCount({
          collection: data?.collections,
        });
        console.log(response);
        setLength(response);
      } catch (error) {
        console.log('Error:', error);
      }
    })();
  }, [data]);

  const handleChangePage = useCallback(
    (pageNumber: number) => {
      const params = new URLSearchParams(searchParams);
      params.set('page', pageNumber.toString());
      router.push(`?${params.toString()}`);
    },
    [router, searchParams],
  );

  const debouncedChangePage = useMemo(
    () =>
      debounce((page: number) => {
        handleChangePage(page);
        handleScrollTo('#news-list');
      }, 300),
    [handleChangePage],
  );

  useEffect(() => {
    return () => {
      debouncedChangePage.cancel();
    };
  }, [debouncedChangePage]);

  useGSAP(
    () => {
      if (!dataNews) return;
      ScrollTrigger.batch(selector('.news-card'), {
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
    { scope: containerRef, dependencies: [dataNews] },
  );

  const handleScrollTo = contextSafe((sectionId: string) => {
    const sectionScrollTo = containerRef?.current.querySelector(`${sectionId}`);
    if (sectionScrollTo) {
      gsap.to(window, {
        scrollTo: {
          y: sectionScrollTo,
          offsetY: getOffsetY(conditions),
          autoKill: false,
        },
        duration: 1.5,
        ease: 'power2.out',
      });
    }
  });

  return (
    <section ref={containerRef}>
      <div
        id="news-list"
        className="p-[24px_0_44px] lg:p-[28px_0_52px] xl:p-[32px_0_64px] 3xl:p-[32px_0_72px] 4xl:p-[40px_0_80px]"
      >
        <div className="container space-y-8 lg:space-y-10 xl:space-y-12 3xl:space-y-[52px] 4xl:space-y-[60px]">
          <h2
            className="section-title text-primary-950"
            dangerouslySetInnerHTML={{
              __html: data?.title,
            }}
          ></h2>

          {dataNews?.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-8 4xl:gap-10">
              {dataNews?.length > 0 &&
                dataNews?.map((item: any, index: number) => (
                  <div
                    key={item?.short_content?.slug ?? index}
                    className="news-card col-span-1 origin-center scale-[0.9] opacity-0"
                  >
                    <NewsCard item={item} url={data?.buttons?.[0]?.url} />
                  </div>
                ))}

              {totalPage > 1 && (
                <div className="col-span-full flex items-center justify-center gap-[2px] md:gap-1">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => debouncedChangePage(currentPage - 1)}
                    className="group relative flex size-9 cursor-pointer items-center justify-center rounded-[6px] bg-white transition-all duration-100 hover:bg-primary-600 disabled:hover:cursor-default md:size-10 3xl:size-11"
                  >
                    <div className="relative size-5 rotate-90 transition-all duration-100 group-hover:brightness-0 group-hover:invert">
                      <NextImg
                        src="/assets/icons/arrow_down_gray.svg"
                        alt="arrow icon"
                      />
                    </div>
                  </button>
                  {pagination &&
                    pagination?.map((item: any, index: any) => (
                      <button
                        onClick={
                          typeof item === 'number'
                            ? () => debouncedChangePage(item)
                            : undefined
                        }
                        key={`${item}-${index}`}
                        className={`${currentPage === item ? 'bg-primary-600 text-white' : 'bg-white text-[#71717A]'} ${item === '...' ? 'pointer-events-none cursor-default' : 'cursor-pointer'} relative h-9 min-w-9 rounded-[6px] px-3 text-center text-lg font-medium transition-all duration-100 hover:bg-primary-300 hover:text-white md:h-10 md:min-w-10 md:px-4 3xl:h-11 3xl:min-w-11`}
                      >
                        {item}
                      </button>
                    ))}

                  <button
                    disabled={currentPage === totalPage}
                    onClick={() => debouncedChangePage(currentPage + 1)}
                    className="group relative flex size-9 cursor-pointer items-center justify-center rounded-[6px] bg-white transition-all duration-100 hover:bg-primary-600 disabled:hover:cursor-default md:size-10 3xl:size-11"
                  >
                    <div className="relative size-5 -rotate-90 transition-all duration-100 group-hover:brightness-0 group-hover:invert">
                      <NextImg
                        src="/assets/icons/arrow_down_gray.svg"
                        alt="arrow icon"
                      />
                    </div>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-normal flex h-[calc(100vh/3)] items-center justify-center text-black text-sm font-medium lg:text-base xl:text-lg">
              {trans("no-data-label")}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
