'use client';
import { CommonSection } from '@/src/types/pageBuilder';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../ui/accordion';
import { useRouter, useSearchParams } from 'next/navigation';
import { getPaginatedPages } from '@/src/utils/pagination';
import { getListFaq, getTotalFaqCount } from '@/src/services/faq';
import { handleScrollTo } from '@/src/utils/gsap';
import { useGsapMatchMedia } from '@/src/providers/GsapMatchMediaProvider';
import NextImg from '../../common/next-img';
import useTranslation from '@/src/hooks/use-translation';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default function FaqsOneCol({ data }: CommonSection) {
  const trans = useTranslation();
  const { conditions } = useGsapMatchMedia();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [dataFaqs, setDataFaqs] = useState<any>([]);
  const [length, setLength] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>('');

  const currentPage = Number(searchParams.get('page')) || 1;
  const currentSearch = searchParams.get('s') ?? '';
  const startIndex = (currentPage - 1) * data?.collection_items_limit;

  const totalPage: number = useMemo(() => {
    return length
      ? Math.ceil(Number(length) / data?.collection_items_limit)
      : 0;
  }, [length, data?.collection_items_limit]);

  const pagination = useMemo(
    () => getPaginatedPages(totalPage, currentPage),
    [totalPage, currentPage],
  );

  useEffect(() => {
    (async () => {
      setLoading(true);
      console.log(currentSearch);
      try {
        const response = await getListFaq({
          collection: data?.collections,
          page: currentPage,
          limit: data?.collection_items_limit,
          keyword: currentSearch,
        });
        setDataFaqs(response);
      } catch (error) {
        console.log('Error:', error);
      } finally {
        setLoading(false);
        ScrollTrigger.refresh()
      }
    })();
  }, [data, currentPage, currentSearch]);

  useEffect(() => {
    (async () => {
      try {
        const response = await getTotalFaqCount({
          collection: data?.collections,
          keyword: currentSearch,
        });
        setLength(response);
      } catch (error) {
        console.log('Error:', error);
      } finally {
        ScrollTrigger.refresh()
      }
    })();
  }, [currentSearch]);

  const handleChangePage = useCallback(
    (pageNumber: number) => {
      const params = new URLSearchParams(searchParams);
      params.set('page', pageNumber.toString());
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  const handleSearch = useCallback(
    (searchText: string) => {
      const params = new URLSearchParams(searchParams);
      params.set('s', searchText.trim());
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  return (
    <section
      id="faq-list"
      className="container py-8 lg:py-12 xl:py-[60px] 2xl:py-[80px] 3xl:py-[100px] 4xl:py-[120px]"
    >
      <div className="flex flex-col gap-6 md:grid md:grid-cols-[auto,220px] md:flex-row lg:grid-cols-[auto,260px] lg:gap-8 lg:px-6 xl:gap-11 xl:px-[60px] 2xl:gap-12 2xl:px-[100px] 3xl:gap-[60px] 3xl:px-[80px] 4xl:px-[160px]">
        <div className="space-y-4 xl:space-y-8">
          {data?.title && (
            <h1 className="section-title text-primary-600">{data?.title}</h1>
          )}

          <div className="relative flex items-center gap-2 rounded-[6px] bg-gray-100 p-2 shadow-md lg:p-3">
            <button
              onClick={() => {
                handleSearch(searchText);
                handleScrollTo('faq-list', conditions);
              }}
              className="relative size-5"
            >
              <NextImg src="/assets/icons/search_gray.svg" alt="search_gray" />
            </button>

            <input
              type="text"
              id="search"
              name="search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="flex-1 border-none bg-transparent bg-none text-base text-gray-950 outline-none placeholder:text-gray-500 lg:text-base"
              placeholder={trans('Tìm kiếm', 'Search')}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSearch(searchText);
                  handleScrollTo('faq-list', conditions);
                }
              }}
            />
          </div>

          {loading ? (
            <>
              <div className="flex h-10 items-center justify-center">
                <div className="relative size-8 animate-spin">
                  <NextImg
                    src="/assets/icons/loading_spin_primary.svg"
                    alt="loading spin"
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              {dataFaqs?.length > 0 ? (
                <>
                  <Accordion.Root
                    className="w-full space-y-1 md:space-y-[6px] 2xl:space-y-2"
                    type="single"
                    collapsible
                  >
                    {dataFaqs?.map((item: any, index: number) => (
                      <AccordionItem
                        value={`page-${currentPage}-item-${index}`}
                        key={`page-${currentPage}-item-${index}`}
                        className="group pb-0"
                      >
                        <AccordionTrigger className="flex w-full items-center gap-3 p-[4px_0px] lg:p-[6px_0px] 2xl:p-[8px_0px] 3xl:p-[10px_0px]">
                          <div className="flex-1 text-start text-base font-medium text-black transition-all duration-200 group-hover:text-primary-600 group-data-[state=open]:text-primary-600 lg:text-lg">
                            {startIndex + index + 1}.{item?.question}
                          </div>

                          <div className="relative size-5 brightness-0 transition-all duration-200 group-hover:brightness-100 group-data-[state=open]:-rotate-180 group-data-[state=open]:brightness-100 lg:size-6">
                            <NextImg
                              src="/assets/icons/arrow_down_primary.svg"
                              alt="arrow_down_primary"
                            />
                          </div>
                        </AccordionTrigger>

                        <AccordionContent>
                          <div className="w-full py-1 pl-3 lg:pl-4 xl:py-0">
                            <div
                              className="content-wrapper"
                              dangerouslySetInnerHTML={{
                                __html: item?.answer,
                              }}
                            ></div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion.Root>

                  {totalPage > 1 && (
                    <div className="col-span-full flex items-center justify-center gap-[2px] md:gap-1">
                      <button
                        disabled={currentPage === 1}
                        onClick={() => {
                          handleChangePage(currentPage - 1);
                          handleScrollTo('faq-list', conditions);
                        }}
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
                                ? () => {
                                    handleChangePage(item);
                                    handleScrollTo('faq-list', conditions);
                                  }
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
                        onClick={() => {
                          handleChangePage(currentPage + 1);
                          handleScrollTo('faq-list', conditions);
                        }}
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
                </>
              ) : (
                <div className="text-normal flex h-[calc(100vh/3)] items-center justify-center text-sm font-medium text-black lg:text-base xl:text-lg">
                  {trans('Không có dữ liệu', 'No data available')}
                </div>
              )}
            </>
          )}
        </div>
        {/* Sidebar */}
        <div className="sidebar-container relative"></div>
      </div>
    </section>
  );
}
