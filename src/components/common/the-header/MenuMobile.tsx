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
import CustomLink from '../custom-link';

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

      <DialogContentMenuMobile onOpenAutoFocus={(e) => e.preventDefault()}>
        <div className="hidden">
          <DialogTitle>Mobile menu</DialogTitle>
          <DialogDescription>Mobile menu</DialogDescription>
        </div>

        <div className="container flex h-full flex-col items-stretch">
          {/* header */}
          <div className="flex items-center justify-between py-[6px]">
            {/* Logo 175 */}
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
                aria-label="Chuyển đến trang chủ"
                className="relative h-[40px] w-[230px] md:h-[46px] md:w-[274px] lg:h-[64px] lg:w-[382px] 2xl:h-[72px] 2xl:w-[430px] 4xl:h-[80px] 4xl:w-[478px]"
              >
                <NextImg
                  src="/assets/logo/long_primary_logo.svg"
                  alt="Military hospital logo"
                />
              </Link>
            </DialogClose>

            <div className="flex items-center gap-2">
              {/* Address button */}
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

              {/* Language button */}
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

              {/* Close button */}
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

          <div className="relative flex h-[calc(100vh-64px)] flex-col items-stretch">
            <div className="scrollbar-hidden relative flex-1 overflow-x-hidden overflow-y-scroll pb-5 md:pb-6">
              <div className="relative w-full space-y-5 md:space-y-7 lg:space-y-8">
                {/* Danh hiệu, huân chương */}
                <div className="flex items-center justify-center gap-6 pb-[6px] pt-5 md:hidden">
                  {contact_information?.files?.length > 0 &&
                    contact_information?.files?.map(
                      (file: any, index: number) => (
                        <div className="relative h-[72px] w-[50px]" key={index}>
                          <NextImg
                            src={getAssetUrlById(file?.directus_files_id)}
                            alt="Military hospital"
                          />
                        </div>
                      ),
                    )}
                </div>

                {/* input search */}
                <div className="flex h-11 items-stretch gap-2 rounded-[6px] bg-[#F4F4F5] p-[6px_6px_6px_16px] backdrop-blur-[9.5px] md:gap-3 lg:gap-4">
                  <input
                    tabIndex={1}
                    autoFocus={false}
                    type="text"
                    className="flex-1 border-none bg-transparent text-sm font-normal text-black outline-none placeholder:text-[#52525B]"
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

                {/* menu main */}
                <AccordionRoot
                  className="relative w-full space-y-5 md:space-y-6"
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
                          <div className="flex w-full items-center justify-between gap-[2px]">
                            {item?.url ? (
                              <DialogClose
                                onClick={() => {
                                  smoother?.paused(false);
                                }}
                                asChild
                                className="border-none outline-none"
                              >
                                <CustomLink
                                  href={item?.url || ''}
                                  className="text-sm font-bold uppercase text-black"
                                >
                                  {language === 'en'
                                    ? `${item?.title_en}`
                                    : `${item?.title}`}{' '}
                                </CustomLink>
                              </DialogClose>
                            ) : (
                              <AccordionTrigger className="text-sm font-bold uppercase text-black">
                                {language === 'en'
                                  ? `${item?.title_en}`
                                  : `${item?.title}`}{' '}
                              </AccordionTrigger>
                            )}

                            <AccordionTrigger className="relative flex size-6 origin-center items-center justify-center transition-all duration-300 ease-in group-data-[state=open]:-rotate-180">
                              <div className="relative size-5">
                                <NextImg
                                  src="/assets/icons/arrow_down_black.svg"
                                  alt="arrow down icon"
                                />
                              </div>
                            </AccordionTrigger>
                          </div>

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
                                        {item_second?.sub_items?.length === 1
                                          ? item_second?.sub_items?.[0]
                                              ?.sub_items?.length
                                          : item_second?.sub_items?.length}
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
                                      <CustomLink
                                        href={item_second?.url || ''}
                                        className="text-sm font-medium text-[#18181B]"
                                      >
                                        {language === 'en'
                                          ? `${item_second?.title_en}`
                                          : `${item_second?.title}`}{' '}
                                      </CustomLink>
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
                            <CustomLink
                              href={item?.url || ''}
                              className="text-sm font-bold uppercase text-black"
                            >
                              {language === 'en'
                                ? `${item?.title_en}`
                                : `${item?.title}`}
                            </CustomLink>
                          </DialogClose>
                        </AccordionItem>
                      );
                    })}
                </AccordionRoot>

                {/* footer */}
                <div className="flex items-center gap-2 md:hidden">
                  {/* address button */}
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

                  {/* Language button */}
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

            {/* sub menu: cấp 3 trở đi */}
            <div
              onScroll={(e) => e.stopPropagation()}
              className={`${isOpenSubMenu ? 'left-1/2 -translate-x-1/2 opacity-100' : 'left-0 translate-x-full opacity-0'} container absolute inset-0 z-[200] !m-0 flex h-full w-[100vw] flex-col items-stretch bg-white pt-5 transition-all duration-500 md:pt-6`}
            >
              <button
                onClick={() => setIsOpenSubMenu(false)}
                className="mb-2 flex items-center gap-1 md:mb-3"
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

              <div className="scrollbar-hidden relative flex-1 overflow-x-hidden overflow-y-scroll py-5">
                <AccordionRoot
                  key={isOpenSubMenu ? 'open' : 'closed'}
                  className="relative w-full space-y-6"
                  type="multiple" // Cho phép nhiều tab mở cùng lúc
                  defaultValue={itemSecond?.sub_items?.map(
                    (_: any, i: number) => `item-second-${i}`,
                  )}
                >
                  {itemSecond &&
                    itemSecond?.sub_items?.map(
                      (item_third: any, item_third_index: any) => {
                        return item_third?.sub_items ? (
                          <AccordionItem
                            value={`item-second-${item_third_index}`}
                            key={item_third_index}
                            className="group w-full"
                          >
                            {item_third?.title && item_third?.title_en && (
                              <div className="flex w-full items-center justify-between gap-[2px]">
                                {item_third?.url ? (
                                  <DialogClose
                                    onClick={() => {
                                      setIsOpenSubMenu(false);
                                      smoother?.paused(false);
                                    }}
                                    asChild
                                    className="border-none outline-none"
                                  >
                                    <CustomLink
                                      href={item_third?.url || ''}
                                      className="text-start text-sm font-bold uppercase text-black"
                                    >
                                      {language === 'en'
                                        ? `${item_third?.title_en}`
                                        : `${item_third?.title}`}
                                    </CustomLink>
                                  </DialogClose>
                                ) : (
                                  <AccordionTrigger className="text-start text-sm font-bold uppercase text-black">
                                    {language === 'en'
                                      ? `${item_third?.title_en}`
                                      : `${item_third?.title}`}
                                  </AccordionTrigger>
                                )}

                                <AccordionTrigger className="relative size-5 origin-center transition-all duration-300 ease-in group-data-[state=open]:-rotate-180">
                                  <NextImg
                                    src="/assets/icons/arrow_down_black.svg"
                                    alt="arrow down icon"
                                  />
                                </AccordionTrigger>
                              </div>
                            )}

                            <AccordionContent>
                              <div
                                className={`${item_third?.title && item_third?.title_en ? 'pt-4' : 'pt-0'} flex flex-col gap-4 px-5`}
                              >
                                {item_third?.sub_items?.map(
                                  (item_fourth: any, item_fourth_index: any) =>
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
                                        <CustomLink
                                          href={item_fourth?.url || ''}
                                          className="text-sm font-medium text-[#18181B]"
                                        >
                                          {language === 'en'
                                            ? `${item_fourth?.title_en}`
                                            : `${item_fourth?.title}`}{' '}
                                        </CustomLink>
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
                              <CustomLink
                                href={item_third?.url || ''}
                                className="text-sm font-bold uppercase text-black"
                              >
                                {language === 'en'
                                  ? `${item_third?.title_en}`
                                  : `${item_third?.title}`}
                              </CustomLink>
                            </DialogClose>
                          </AccordionItem>
                        );
                      },
                    )}
                </AccordionRoot>
              </div>
            </div>
          </div>
        </div>
      </DialogContentMenuMobile>
    </Dialog>
  );
}
