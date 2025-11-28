'use client';

import React, { useState } from 'react';
import { DialogDescription } from '@radix-ui/react-dialog';
import { useScrollSmoother } from '@/src/providers/ScrollSmootherProvider';
import useStoreLanguage from '@/src/store/store';
import NextImg from '../next-img';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  AccordionRoot,
} from '../../ui/accordion';
import {
  Dialog,
  DialogContentMenuMobile,
  DialogTrigger,
  DialogClose,
  DialogTitle,
} from '../../ui/dialog';
import { useMetadata } from '@/src/providers/MetadataProvider';
import { getAssetUrlById } from '@/src/utils/image';
import { useTranslate } from '@/src/hooks/useTranslate';
import Link from 'next/link';

type MobileMenuProps = {
  changeLanguage: (value: string) => void;
};

export default function MobileMenu({ changeLanguage }: MobileMenuProps) {
  const language = useStoreLanguage((state: any) => state.language);
  const { contact_information, top_navigation } = useMetadata();
  const { trans } = useTranslate();
  const [isOpenSubMenu, setIsOpenSubMenu] = useState<boolean>(false);
  const [itemSecond, setItemSecond] = useState<any>();

  const { smoother } = useScrollSmoother();
  return (
    <Dialog>
      <DialogTrigger
        onClick={() => smoother?.paused(true)}
        asChild
        className="block"
      >
        <button className="flex items-center justify-center md:h-9 md:w-[52px] md:rounded-[6px] md:bg-primary-600 xl:hidden 2xl:h-10 2xl:w-[60px]">
          <div className="relative size-5 brightness-0 md:brightness-100 2xl:size-6">
            <NextImg src="/assets/icons/ham_menu.svg" alt="menu icon" />
          </div>
        </button>
      </DialogTrigger>

      <DialogContentMenuMobile>
        <div className="hidden">
          <DialogTitle>Mobile menu</DialogTitle>
          <DialogDescription>Mobile menu</DialogDescription>
        </div>

        <div className="container flex h-full flex-col items-stretch bg-white">
          <div className="flex items-center justify-between py-[6px]">
            <DialogClose
              onClick={() => {
                setIsOpenSubMenu(false);
                smoother?.paused(false);
              }}
              asChild
              className="border-none outline-none"
            >
              <Link
                href="/"
                className="relative h-[52px] w-[214px] md:h-[56px] md:w-[230px] lg:h-[64px] lg:w-[262px] 2xl:h-[72px] 2xl:w-[296px] 4xl:h-[80px] 4xl:w-[328px]"
              >
                <NextImg
                  src="/assets/logo/primary_logo.svg"
                  alt="Military hospital logo"
                />
              </Link>
            </DialogClose>

            <div className="flex items-center gap-2">
              <DialogClose
                onClick={() => {
                  setIsOpenSubMenu(false);
                  smoother?.paused(false);
                }}
                asChild
                className="hidden border-none outline-none md:flex"
              >
                <div className="btn-menu cursor-pointer">
                  <div className="relative size-5 2xl:size-6">
                    <NextImg
                      src="/assets/icons/hospital_location.svg"
                      alt="hospital location"
                    />
                  </div>
                </div>
              </DialogClose>

              <button
                onClick={() =>
                  changeLanguage(`${language === 'en' ? 'vi' : 'en'}`)
                }
                className="relative hidden h-9 w-[52px] overflow-hidden rounded-[6px] md:block 2xl:h-10 2xl:w-[60px]"
              >
                {language && language === 'en' ? (
                  <NextImg
                    src="/assets/images/flag_en.png"
                    alt="English"
                    objectFit="cover"
                  />
                ) : (
                  <NextImg
                    src="/assets/images/flag_vi.png"
                    alt="Vietnamese"
                    objectFit="cover"
                  />
                )}
              </button>

              <DialogClose
                onClick={() => {
                  setIsOpenSubMenu(false);
                  smoother?.paused(false);
                }}
                asChild
                className="border-none outline-none"
              >
                <div className="btn-menu cursor-pointer">
                  <div className="relative size-5 2xl:size-6">
                    <NextImg src="/assets/icons/close.svg" alt="menu icon" />
                  </div>
                </div>
              </DialogClose>
            </div>
          </div>

          <div className="scrollbar-hidden relative flex-1 overflow-x-hidden overflow-y-scroll pb-[100px]">
            <div className="flex items-center justify-center gap-6 pb-[6px] pt-5 md:hidden">
              {contact_information?.files?.length > 0 &&
                contact_information?.files?.map((file: any, index: number) => (
                  <div className="relative h-[72px] w-[50px]" key={index}>
                    <NextImg
                      src={getAssetUrlById(file?.directus_files_id)}
                      alt="Military hospital"
                    />
                  </div>
                ))}
            </div>

            <div className="space-y-6 py-6 lg:space-y-8 lg:py-8">
              <div className="flex h-10 items-stretch rounded-[6px] bg-[#F4F4F5] p-[6px_6px_6px_16px] backdrop-blur-[9.5px]">
                <input
                  type="text"
                  className="flex-1 border-none bg-transparent text-xs font-normal text-black outline-none placeholder:text-[#52525B]"
                  placeholder={trans('search-placeholder')}
                />
                <button className="flex items-center justify-center rounded-[4px] bg-primary-600 px-3">
                  <div className="relative size-5">
                    <NextImg
                      src="/assets/icons/search_white.svg"
                      alt="search icon"
                    />
                  </div>
                </button>
              </div>

              <div className="relative">
                <AccordionRoot
                  className="relative w-full space-y-6"
                  type="single"
                  collapsible
                >
                  {top_navigation &&
                    top_navigation?.map((item: any, index: any) => {
                      return item?.sub_items ? (
                        <AccordionItem
                          value={`item-${index}`}
                          key={index}
                          className="group w-full"
                        >
                          <AccordionTrigger className="flex w-fit items-center gap-[2px]">
                            <div className="text-sm font-bold uppercase text-black">
                              {language === 'en'
                                ? `${item?.title_en}`
                                : `${item?.title}`}{' '}
                            </div>

                            <div className="relative size-5 origin-center transition-all duration-300 ease-in group-data-[state=open]:-rotate-180">
                              <NextImg
                                src="/assets/icons/arrow_down_black.svg"
                                alt="arrow down icon"
                              />
                            </div>
                          </AccordionTrigger>

                          <AccordionContent>
                            <div className="flex flex-col gap-4 px-5 pt-4">
                              {item?.sub_items?.map(
                                (item_second: any, item_second_index: any) =>
                                  item_second?.sub_items?.length > 0 ? (
                                    <div
                                      onClick={() => {
                                        setItemSecond(item_second);
                                        setIsOpenSubMenu(true);
                                      }}
                                      key={item_second_index}
                                      className="flex w-fit cursor-pointer items-center gap-1"
                                    >
                                      <div className="text-sm font-medium text-[#18181B]">
                                        {language === 'en'
                                          ? `${item_second?.title_en}`
                                          : `${item_second?.title}`}
                                      </div>
                                      <div className="rounded-[20px] bg-primary-100 p-[2px_12px] text-sm font-medium text-primary-800">
                                        {item_second?.sub_items?.length}
                                      </div>
                                      <div className="relative size-5 origin-center -rotate-90">
                                        <NextImg
                                          src="/assets/icons/arrow_down_black.svg"
                                          alt="arrow down icon"
                                        />
                                      </div>
                                    </div>
                                  ) : (
                                    <DialogClose
                                      onClick={() => smoother?.paused(false)}
                                      asChild
                                      key={item_second_index}
                                      className="w-fit"
                                    >
                                      <Link
                                        href={`/${language}${item_second?.url || ''}`}
                                        className="text-sm font-medium text-[#18181B]"
                                      >
                                        {language === 'en'
                                          ? `${item_second?.title_en}`
                                          : `${item_second?.title}`}{' '}
                                      </Link>
                                    </DialogClose>
                                  ),
                              )}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ) : (
                        <AccordionItem key={index}>
                          <DialogClose
                            onClick={() => smoother?.paused(false)}
                            asChild
                          >
                            <Link
                              href={`/${language}${item?.url || ''}`}
                              className="text-sm font-bold uppercase text-black"
                            >
                              {language === 'en'
                                ? `${item?.title_en}`
                                : `${item?.title}`}
                            </Link>
                          </DialogClose>
                        </AccordionItem>
                      );
                    })}
                </AccordionRoot>

                <div
                  className={`${isOpenSubMenu ? 'left-1/2 -translate-x-1/2 opacity-100' : 'left-0 translate-x-full opacity-0'} container absolute top-0 z-[200] !m-0 w-[100vw] bg-white pb-[100px] transition-all duration-500`}
                >
                  <AccordionRoot
                    key={isOpenSubMenu ? 'open' : 'closed'}
                    className="relative w-full space-y-6"
                    type="multiple" // Cho phép nhiều tab mở cùng lúc
                    defaultValue={itemSecond?.sub_items?.map(
                      (_: any, i: number) => `item-second-${i}`,
                    )}
                  >
                    <button
                      onClick={() => setIsOpenSubMenu(false)}
                      className="flex items-center gap-1"
                    >
                      <div className="relative size-5 origin-center rotate-90">
                        <NextImg
                          src="/assets/icons/arrow_down_black.svg"
                          alt="arrow down icon"
                        />
                      </div>
                      <div className="text-sm font-bold text-black">
                        {trans('return-menu')}
                      </div>
                    </button>

                    {itemSecond &&
                      itemSecond?.sub_items?.map(
                        (item_third: any, item_third_index: any) => {
                          return item_third?.sub_items ? (
                            <AccordionItem
                              value={`item-second-${item_third_index}`}
                              key={item_third_index}
                              className="group w-full"
                            >
                              <AccordionTrigger className="flex w-fit items-center gap-[2px]">
                                <div className="text-start text-sm font-bold uppercase text-black">
                                  {language === 'en'
                                    ? `${item_third?.title_en}`
                                    : `${item_third?.title}`}{' '}
                                </div>

                                <div className="relative size-5 origin-center transition-all duration-300 ease-in group-data-[state=open]:-rotate-180">
                                  <NextImg
                                    src="/assets/icons/arrow_down_black.svg"
                                    alt="arrow down icon"
                                  />
                                </div>
                              </AccordionTrigger>

                              <AccordionContent>
                                <div className="flex flex-col gap-4 px-5 pt-4">
                                  {item_third?.sub_items?.map(
                                    (
                                      item_fourth: any,
                                      item_fourth_index: any,
                                    ) =>
                                      item_fourth?.sub_items?.length > 0 ? (
                                        <div
                                          key={item_fourth_index}
                                          className="flex w-fit cursor-pointer items-center gap-1"
                                        >
                                          <div className="text-sm font-medium text-[#18181B]">
                                            {language === 'en'
                                              ? `${item_fourth?.title_en}`
                                              : `${item_fourth?.title}`}
                                          </div>
                                          <div className="rounded-[20px] bg-primary-100 p-[2px_12px] text-sm font-medium text-primary-800">
                                            {item_fourth?.sub_items?.length}
                                          </div>
                                          <div className="relative size-5 origin-center -rotate-90">
                                            <NextImg
                                              src="/assets/icons/arrow_down_black.svg"
                                              alt="arrow down icon"
                                            />
                                          </div>
                                        </div>
                                      ) : (
                                        <DialogClose
                                          onClick={() => {
                                            setIsOpenSubMenu(false);
                                            smoother?.paused(false);
                                          }}
                                          asChild
                                          key={item_fourth_index}
                                          className="w-fit"
                                        >
                                          <Link
                                            href={`/${language}${item_fourth?.url || ''}`}
                                            className="text-sm font-medium text-[#18181B]"
                                          >
                                            {language === 'en'
                                              ? `${item_fourth?.title_en}`
                                              : `${item_fourth?.title}`}{' '}
                                          </Link>
                                        </DialogClose>
                                      ),
                                  )}
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          ) : (
                            <AccordionItem key={item_third_index}>
                              <DialogClose
                                onClick={() => {
                                  setIsOpenSubMenu(false);
                                  smoother?.paused(false);
                                }}
                                asChild
                              >
                                <Link
                                  href={`/${language}${item_third?.url || ''}`}
                                  className="text-sm font-bold uppercase text-black"
                                >
                                  {language === 'en'
                                    ? `${item_third?.title_en}`
                                    : `${item_third?.title}`}
                                </Link>
                              </DialogClose>
                            </AccordionItem>
                          );
                        },
                      )}
                  </AccordionRoot>
                </div>
              </div>

              <div className="flex items-center gap-2 md:hidden">
                <DialogClose
                  onClick={() => {
                    setIsOpenSubMenu;
                    smoother?.paused(false);
                  }}
                  asChild
                  className="border-none outline-none"
                >
                  <div className="btn-menu">
                    <div className="relative size-5 2xl:size-6">
                      <NextImg
                        src="/assets/icons/hospital_location.svg"
                        alt="hospital location"
                      />
                    </div>
                  </div>
                </DialogClose>

                <button
                  onClick={() =>
                    changeLanguage(`${language === 'en' ? 'vi' : 'en'}`)
                  }
                  className="relative h-9 w-[52px] overflow-hidden rounded-[6px] 2xl:h-10 2xl:w-[60px]"
                >
                  {language && language === 'en' ? (
                    <NextImg
                      src="/assets/images/flag_en.png"
                      alt="English"
                      objectFit="cover"
                    />
                  ) : (
                    <NextImg
                      src="/assets/images/flag_vi.png"
                      alt="Vietnamese"
                      objectFit="cover"
                    />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </DialogContentMenuMobile>
    </Dialog>
  );
}
