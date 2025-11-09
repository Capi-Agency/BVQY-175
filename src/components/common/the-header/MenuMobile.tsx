'use client';

import React from 'react';

import Link from 'next/link';

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
import { AnimatedLink } from '../../animation/LinkAnimated';
import { useMetadata } from '@/src/providers/MetadataProvider';
import { getAssetUrlById } from '@/src/utils/image';
import { useTranslate } from '@/src/hooks/useTranslate';

type MobileMenuProps = {
  changeLanguage: (value: string) => void;
};

export default function MobileMenu({ changeLanguage }: MobileMenuProps) {
  const language = useStoreLanguage((state: any) => state.language);
  const { contact_information, top_navigation } = useMetadata();
  const { trans } = useTranslate();

  const { smoother } = useScrollSmoother();
  return (
    <Dialog>
      <DialogTrigger
        onClick={() => smoother?.paused(true)}
        asChild
        className="block"
      >
        <button className="flex h-9 w-[52px] items-center justify-center rounded-[6px] bg-secondary xl:hidden 2xl:h-10 2xl:w-[60px]">
          <div className="relative size-5 2xl:size-6">
            <NextImg src="/assets/icons/ham_menu.svg" alt="menu icon" />
          </div>
        </button>
      </DialogTrigger>

      <DialogContentMenuMobile>
        <div className="hidden">
          <DialogTitle>Mobile menu</DialogTitle>
          <DialogDescription>Mobile menu</DialogDescription>
        </div>

        <div className="container flex h-full flex-col items-stretch bg-secondary">
          <div className="flex items-center justify-between py-[6px]">
            <DialogClose
              onClick={() => smoother?.paused(false)}
              asChild
              className="border-none outline-none"
            >
              <AnimatedLink
                href="/"
                className="relative h-[52px] w-[214px] md:h-[56px] md:w-[230px] lg:h-[64px] lg:w-[262px] 2xl:h-[72px] 2xl:w-[296px] 4xl:h-[80px] 4xl:w-[328px]"
              >
                <NextImg
                  src="/assets/logo/secondary_logo.svg"
                  alt="Military hospital logo"
                />
              </AnimatedLink>
            </DialogClose>

            <div className="flex items-center gap-2">
              <DialogClose
                onClick={() => smoother?.paused(false)}
                asChild
                className="border-none outline-none"
              >
                <button className="hidden h-9 w-[52px] items-center justify-center rounded-[6px] bg-white/20 md:flex 2xl:h-10 2xl:w-[60px]">
                  <div className="relative size-5 2xl:size-6">
                    <NextImg
                      src="/assets/icons/hospital_location.svg"
                      alt="hospital location"
                    />
                  </div>
                </button>
              </DialogClose>

              <button
                onClick={() =>
                  changeLanguage(`${language === 'en' ? 'en' : 'vi'}`)
                }
                className="relative hidden h-9 w-[52px] overflow-hidden rounded-[6px] md:block 2xl:h-10 2xl:w-[60px]"
              >
                {language === 'en' ? (
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
                onClick={() => smoother?.paused(false)}
                asChild
                className="border-none outline-none"
              >
                <button className="flex h-9 w-[52px] items-center justify-center 2xl:h-10 2xl:w-[60px]">
                  <div className="relative size-5 2xl:size-6">
                    <NextImg src="/assets/icons/close.svg" alt="menu icon" />
                  </div>
                </button>
              </DialogClose>
            </div>
          </div>

          <div className="scrollbar-hidden relative flex-1 overflow-y-scroll pb-[100px]">
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
              <div className="flex h-10 items-stretch rounded-[6px] bg-white/20 p-[6px_6px_6px_16px] backdrop-blur-[9.5px]">
                <input
                  type="text"
                  className="flex-1 border-none bg-transparent text-xs font-normal text-white outline-none placeholder:text-white/50"
                  placeholder={trans('search-placeholder')}
                />
                <button className="flex items-center justify-center rounded-[4px] bg-secondary px-3">
                  <div className="relative size-5">
                    <NextImg
                      src="/assets/icons/search_white.svg"
                      alt="search icon"
                    />
                  </div>
                </button>
              </div>

              <AccordionRoot
                className="w-full space-y-6 lg:space-y-8"
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
                          <div className="text-sm font-bold uppercase text-white">
                            {item?.title}
                          </div>

                          <div className="relative size-5 origin-center transition-all duration-300 ease-in group-data-[state=open]:-rotate-180">
                            <NextImg
                              src="/assets/icons/arrow_down_white.svg"
                              alt="arrow down icon"
                            />
                          </div>
                        </AccordionTrigger>

                        <AccordionContent>
                          <div className="flex flex-col gap-4 px-5 pt-4">
                            {item?.sub_items?.map(
                              (related_item: any, itemIndex: any) => (
                                <DialogClose
                                  onClick={() => smoother?.paused(false)}
                                  asChild
                                  key={itemIndex}
                                  className="w-fit"
                                >
                                  <AnimatedLink
                                    href={`/${language}${related_item?.url || ''}`}
                                    className="text-sm text-white font-medium"
                                  >
                                    {related_item?.title}
                                  </AnimatedLink>
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
                          <AnimatedLink
                            href={`/${language}${item?.url || ''}`}
                            className="text-sm font-bold uppercase text-white"
                          >
                            {item?.title}
                          </AnimatedLink>
                        </DialogClose>
                      </AccordionItem>
                    );
                  })}
              </AccordionRoot>

              <div className="flex items-center gap-2 md:hidden">
                <DialogClose
                  onClick={() => smoother?.paused(false)}
                  asChild
                  className="border-none outline-none"
                >
                  <button className="flex h-9 w-[52px] items-center justify-center rounded-[6px] bg-white/20 2xl:h-10 2xl:w-[60px]">
                    <div className="relative size-5 2xl:size-6">
                      <NextImg
                        src="/assets/icons/hospital_location.svg"
                        alt="hospital location"
                      />
                    </div>
                  </button>
                </DialogClose>

                <button
                  onClick={() =>
                    changeLanguage(`${language === 'en' ? 'en' : 'vi'}`)
                  }
                  className="relative h-9 w-[52px] overflow-hidden rounded-[6px] 2xl:h-10 2xl:w-[60px]"
                >
                  {language === 'en' ? (
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
