'use client';
import { CommonSection } from '@/src/types/pageBuilder';
import React, { useState } from 'react';
import NextImg from '../common/next-img';
import { getAssetUrlById } from '@/src/utils/image';
import * as Accordion from '@radix-ui/react-accordion';
import {
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from '../ui/accordion';
import {
  adminDepartmentTitleMap,
  departmentTitleMap,
  hospitalTitleMap,
  instituteTitleMap,
} from '../common/doctor-card';
import Link from 'next/link';
import useStoreLanguage from '@/src/store/store';
import { getDoctorTitles } from '@/src/utils/render-doctor-title';

export default function DoctorDetail({ data, dataDetail }: CommonSection) {
  console.log('🚀 ~ DoctorDetail ~ dataDetail:', dataDetail);
  const [isViewMore, setIsViewMore] = useState<boolean>(false);
  const language = useStoreLanguage((state: any) => state.language);

  return (
    <div className="bg-primary-50 py-6 md:py-10 2xl:py-[60px]">
      <div className="container grid grid-cols-11 gap-6 md:gap-7 lg:gap-8 xl:gap-10 3xl:gap-12 4xl:gap-14">
        <div className="col-span-full flex flex-col items-stretch gap-6 md:flex-row md:items-start md:gap-7 lg:col-span-4 lg:flex-col lg:items-stretch lg:gap-8 2xl:gap-10 4xl:gap-14">
          <div className="relative aspect-[480/600] w-full bg-white md:basis-1/2 lg:basis-0">
            <NextImg
              src={getAssetUrlById(
                dataDetail?.avatar || dataDetail?.uniform_avatar,
              )}
              objectFit="cover"
              alt="doctor image"
            />

            <div className="absolute bottom-0 left-0 z-[1] w-full p-4 xl:p-5">
              <div className="space-y-1 rounded-[8px] bg-primary-600 p-4 xl:p-6">
                <div className="text-base font-normal text-[#E4E4E7] xl:text-lg 3xl:text-xl">
                  {dataDetail?.full_title}
                </div>
                <div className="text-[22px] font-bold !leading-[1.3] text-[#F6FAF7] md:text-2xl xl:text-[28px] 2xl:text-[32px] 3xl:text-[36px]">
                  {dataDetail?.full_name}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2 md:basis-1/2 lg:basis-0 lg:space-y-3 xl:space-y-4">
            <div className="text-xl font-semibold text-primary-800 md:text-[22px] xl:text-2xl 2xl:text-[28px]">
              Giới thiệu
            </div>

            <div
              className={`space-y-2 text-justify text-sm font-normal text-[#09090B] lg:text-start lg:text-base xl:space-y-3`}
              dangerouslySetInnerHTML={{
                __html: dataDetail?.bio,
              }}
            ></div>

            {/* <div
              className={`${isViewMore ? 'line-clamp-none' : 'line-clamp-[8] md:line-clamp-[16] lg:line-clamp-[8]'} space-y-2 text-justify text-sm font-normal text-[#09090B] lg:text-start lg:text-base xl:space-y-3`}
              dangerouslySetInnerHTML={{
                __html: dataDetail?.bio,
              }}
            ></div>

            <button
              onClick={() => setIsViewMore((prev: boolean) => !prev)}
              className="text-sm font-normal text-[#09090B] underline underline-offset-4 xl:text-base"
            >
              {isViewMore ? 'Thu gọn' : 'Xem thêm'}
            </button> */}
          </div>
        </div>

        <div className="col-span-full lg:col-span-7">
          <div className="space-y-6 rounded-[6px] bg-white p-4 md:p-6 lg:p-6 xl:space-y-8 xl:p-8 3xl:p-10">
            <div className="space-y-4 xl:space-y-5 2xl:space-y-6 3xl:space-y-7 4xl:space-y-8">
              <div className="space-y-1 xl:space-y-2">
                <div className="text-base font-medium text-primary-800 lg:text-lg 2xl:text-xl">
                  Chức vụ
                </div>
                <div className="text-sm font-normal text-[#09090B] lg:text-base">
                  {getDoctorTitles(dataDetail).join(', ')}
                </div>
              </div>

              <div className="space-y-1 xl:space-y-2">
                <div className="text-base font-medium text-primary-800 lg:text-lg 2xl:text-xl">
                  Chuyên ngành
                </div>
                <div className="text-sm font-normal text-[#09090B] lg:text-base">
                  {dataDetail?.specialty}
                </div>
              </div>

              <div className="space-y-1 xl:space-y-2">
                <div className="text-base font-medium text-primary-800 lg:text-lg 2xl:text-xl">
                  Chuyên khoa
                </div>

                <div className="flex flex-wrap gap-3">
                  {dataDetail?.departments?.map(
                    ({ department }: any, index: number) => (
                      <Link
                        key={index}
                        href={`/${language}/chuyen-khoa/${department?.slug}`}
                        className="block text-sm font-normal text-[#09090B] underline underline-offset-2 lg:text-base"
                      >
                        {language === 'en'
                          ? department?.title_en
                          : department?.title}
                      </Link>
                    ),
                  )}
                </div>
              </div>

              <div className="space-y-1 xl:space-y-2">
                <div className="text-base font-medium text-primary-800 lg:text-lg 2xl:text-xl">
                  Số năm kinh nghiệm
                </div>
                <div className="text-sm font-normal text-[#09090B] lg:text-base">
                  {dataDetail?.year_of_experience}
                </div>
              </div>
            </div>

            <Accordion.Root
              className="w-full space-y-6 xl:space-y-8"
              type="multiple"
              defaultValue={['item-1', 'item-2', 'item-3', 'item-4', 'item-5']}
            >
              <AccordionItem value={`item-1`} className="group pb-0">
                <AccordionTrigger className="flex w-full items-center justify-between rounded-[6px] bg-primary-50 p-3 lg:p-[12px_16px] xl:p-4 3xl:p-5">
                  <div className="text-base font-medium text-primary-800 lg:text-lg 2xl:text-xl">
                    Quá trình đào tạo
                  </div>

                  <div className="relative size-5 rotate-180 transition-all duration-200 group-data-[state=open]:rotate-0 lg:size-6">
                    <NextImg
                      src="/assets/icons/chevron_up_accordion.svg"
                      alt="chevron_up_accordion"
                    />
                  </div>
                </AccordionTrigger>

                <AccordionContent>
                  <div
                    className="w-full space-y-1 pt-3 text-sm font-normal text-[#09090B] md:space-y-2 lg:pt-3 lg:text-base xl:space-y-3 [&>ul]:list-inside [&>ul]:list-disc [&>ul]:pl-2 md:[&>ul]:pl-3 lg:[&>ul]:pl-4 xl:[&>ul]:pl-5 2xl:[&>ul]:pl-6"
                    dangerouslySetInnerHTML={{
                      __html: dataDetail?.bio,
                    }}
                  ></div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value={`item-2`} className="group pb-0">
                <AccordionTrigger className="flex w-full items-center justify-between rounded-[6px] bg-primary-50 p-3 lg:p-[12px_16px] xl:p-4 3xl:p-5">
                  <div className="text-base font-medium text-primary-800 lg:text-lg 2xl:text-xl">
                    Kinh nghiệm làm việc
                  </div>

                  <div className="relative size-5 rotate-180 transition-all duration-200 group-data-[state=open]:rotate-0 lg:size-6">
                    <NextImg
                      src="/assets/icons/chevron_up_accordion.svg"
                      alt="chevron_up_accordion"
                    />
                  </div>
                </AccordionTrigger>

                <AccordionContent>
                  <div
                    className="w-full space-y-1 pt-3 text-sm font-normal text-[#09090B] md:space-y-2 lg:pt-3 lg:text-base xl:space-y-3 [&>ul]:list-inside [&>ul]:list-disc [&>ul]:pl-2 md:[&>ul]:pl-3 lg:[&>ul]:pl-4 xl:[&>ul]:pl-5 2xl:[&>ul]:pl-6"
                    dangerouslySetInnerHTML={{
                      __html: dataDetail?.work_experience,
                    }}
                  ></div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value={`item-3`} className="group pb-0">
                <AccordionTrigger className="flex w-full items-center justify-between rounded-[6px] bg-primary-50 p-3 lg:p-[12px_16px] xl:p-4 3xl:p-5">
                  <div className="text-base font-medium text-primary-800 lg:text-lg 2xl:text-xl">
                    Giải thưởng & danh hiệu
                  </div>

                  <div className="relative size-5 rotate-180 transition-all duration-200 group-data-[state=open]:rotate-0 lg:size-6">
                    <NextImg
                      src="/assets/icons/chevron_up_accordion.svg"
                      alt="chevron_up_accordion"
                    />
                  </div>
                </AccordionTrigger>

                <AccordionContent>
                  <div
                    className="w-full space-y-1 pt-3 text-sm font-normal text-[#09090B] md:space-y-2 lg:pt-3 lg:text-base xl:space-y-3 [&>ul]:list-inside [&>ul]:list-disc [&>ul]:pl-2 md:[&>ul]:pl-3 lg:[&>ul]:pl-4 xl:[&>ul]:pl-5 2xl:[&>ul]:pl-6"
                    dangerouslySetInnerHTML={{
                      __html: dataDetail?.award_and_honors,
                    }}
                  ></div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value={`item-4`} className="group pb-0">
                <AccordionTrigger className="flex w-full items-center justify-between rounded-[6px] bg-primary-50 p-3 lg:p-[12px_16px] xl:p-4 3xl:p-5">
                  <div className="text-base font-medium text-primary-800 lg:text-lg 2xl:text-xl">
                    Thành viên của tổ chức
                  </div>

                  <div className="relative size-5 rotate-180 transition-all duration-200 group-data-[state=open]:rotate-0 lg:size-6">
                    <NextImg
                      src="/assets/icons/chevron_up_accordion.svg"
                      alt="chevron_up_accordion"
                    />
                  </div>
                </AccordionTrigger>

                <AccordionContent>
                  <div
                    className="w-full space-y-1 pt-3 text-sm font-normal text-[#09090B] md:space-y-2 lg:pt-3 lg:text-base xl:space-y-3 [&>ul]:list-inside [&>ul]:list-disc [&>ul]:pl-2 md:[&>ul]:pl-3 lg:[&>ul]:pl-4 xl:[&>ul]:pl-5 2xl:[&>ul]:pl-6"
                    dangerouslySetInnerHTML={{
                      __html: dataDetail?.memberships,
                    }}
                  ></div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value={`item-5`} className="group pb-0">
                <AccordionTrigger className="flex w-full items-center justify-between rounded-[6px] bg-primary-50 p-3 lg:p-[12px_16px] xl:p-4 3xl:p-5">
                  <div className="text-base font-medium text-primary-800 lg:text-lg 2xl:text-xl">
                    Sách, báo, công trình nghiên cứu
                  </div>

                  <div className="relative size-5 rotate-180 transition-all duration-200 group-data-[state=open]:rotate-0 lg:size-6">
                    <NextImg
                      src="/assets/icons/chevron_up_accordion.svg"
                      alt="chevron_up_accordion"
                    />
                  </div>
                </AccordionTrigger>

                <AccordionContent>
                  <div
                    className="w-full space-y-1 pt-3 text-sm font-normal text-[#09090B] md:space-y-2 lg:pt-3 lg:text-base xl:space-y-3 [&>ul]:list-inside [&>ul]:list-disc [&>ul]:pl-2 md:[&>ul]:pl-3 lg:[&>ul]:pl-4 xl:[&>ul]:pl-5 2xl:[&>ul]:pl-6"
                    dangerouslySetInnerHTML={{
                      __html: dataDetail?.research_works,
                    }}
                  ></div>
                </AccordionContent>
              </AccordionItem>
            </Accordion.Root>
          </div>
        </div>
      </div>
    </div>
  );
}
