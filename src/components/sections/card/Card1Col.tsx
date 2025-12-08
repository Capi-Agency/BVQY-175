'use client';
import {
  getListMilestone,
  getTotalMilestoneCount,
} from '@/src/services/milestone';
import { CommonSection } from '@/src/types/pageBuilder';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../ui/accordion';
import {
  TooltipProvider,
  TooltipContent,
  TooltipRoot,
  TooltipTrigger,
  TooltipArrow,
} from '../../ui/tooltip';
import useTranslation from '@/src/hooks/use-translation';
import NextImg from '../../common/next-img';
import Card1ColDetail from './Card1ColDetail';
import PaginationPrimary from '../pagination/PaginationPrimary';

export default function Card1Col({ data }: CommonSection) {
  const trans = useTranslation();
  const searchParams = useSearchParams();

  const [milestoneData, setMilestoneData] = useState<any>([]);
  const [length, setLength] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const currentPage = Number(searchParams.get('page')) || 1;
  const totalPage: number = useMemo(() => {
    return length
      ? Math.ceil(Number(length) / data?.collection_items_limit)
      : 0;
  }, [length, data?.collection_items_limit]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await getListMilestone({
          collection: data?.collections,
          page: currentPage,
          limit: data?.collection_items_limit,
        });
        setMilestoneData(response);
      } catch (error) {
        console.log('Error:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, [data, currentPage]);

  useEffect(() => {
    (async () => {
      try {
        const response = await getTotalMilestoneCount({
          collection: data?.collections,
        });
        setLength(response);
      } catch (error) {
        console.log('Error:', error);
      }
    })();
  }, []);

  return (
    <div
      id="milestone-list"
      className="container space-y-[80px] py-8 lg:py-12 xl:py-[60px] 2xl:py-[80px] 3xl:py-[100px] 4xl:py-[120px]"
    >
      {loading ? (
        <div className="flex h-10 items-center justify-center">
          <div className="relative size-8 animate-spin">
            <NextImg
              src="/assets/icons/loading_spin_primary.svg"
              alt="loading spin"
            />
          </div>
        </div>
      ) : (
        <>
          {milestoneData?.length > 0 && (
            <Accordion.Root
              className="w-full space-y-[80px]"
              type="single"
              collapsible
            >
              <TooltipProvider delayDuration={100}>
                {milestoneData?.map((item: any, index: number) => (
                  <div key={index} className="flex items-stretch gap-[80px]">
                    <div className="relative">
                      <TooltipRoot open={true} delayDuration={0}>
                        <TooltipTrigger asChild>
                          <div className="relative z-[2] size-8 rounded-full border-[6px] border-primary-400 bg-primary-50"></div>
                        </TooltipTrigger>

                        <TooltipContent
                          side="left"
                          align="center"
                          sideOffset={8}
                          avoidCollisions={false}
                          asChild={false}
                          className="rounded-lg bg-primary-600 p-[8px_24px] text-lg text-white"
                        >
                          {item?.year}
                          <TooltipArrow className="fill-primary-600" />
                        </TooltipContent>
                      </TooltipRoot>

                      <div
                        className={`${milestoneData?.length - 1 === index ? 'bottom-0' : '-bottom-[80px]'} absolute left-1/2 top-0 w-2 -translate-x-1/2 bg-primary-400`}
                      ></div>
                    </div>

                    <div className="flex-1">
                      <AccordionItem
                        value={`page-${currentPage}-item-${index}`}
                        key={`page-${currentPage}-item-${index}`}
                        className="group w-full pb-0"
                      >
                        <AccordionTrigger className="w-full text-start">
                          <div className="text-[32px] font-semibold uppercase !leading-[1.3] text-primary-600">
                            {item?.title}
                          </div>
                          <div
                            className="content-wrapper pt-4"
                            dangerouslySetInnerHTML={{
                              __html: item?.blurb,
                            }}
                          ></div>
                        </AccordionTrigger>

                        <AccordionContent>
                          <div className="w-full space-y-[80px] py-8">
                            {item?.events?.map(
                              (event: any, eventIndex: number) => (
                                <Card1ColDetail
                                  key={eventIndex}
                                  event={event}
                                  data={data}
                                />
                              ),
                            )}
                          </div>
                        </AccordionContent>

                        <div className="flex justify-center pt-6">
                          <AccordionTrigger>
                            <div className="flex items-center gap-[6px]">
                              <span className="group-data-[state=open]:hidden">
                                {trans('Mở rộng', 'Expand')}
                              </span>
                              <span className="hidden group-data-[state=open]:block">
                                {trans('Rút gọn', 'Collapse')}
                              </span>
                              <div className="relative size-5 transition-all duration-200 group-data-[state=open]:-rotate-180">
                                <NextImg
                                  src="/assets/icons/arrow_down_black.svg"
                                  alt="arrow_down_black.svg"
                                />
                              </div>
                            </div>
                          </AccordionTrigger>
                        </div>
                      </AccordionItem>
                    </div>
                  </div>
                ))}
              </TooltipProvider>
            </Accordion.Root>
          )}
        </>
      )}

      <PaginationPrimary
        currentPage={currentPage}
        totalPage={totalPage}
        idSection="milestone-list"
      />
    </div>
  );
}
