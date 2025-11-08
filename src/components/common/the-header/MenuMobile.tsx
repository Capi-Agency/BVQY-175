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

type MobileMenuProps = {
  topNavData: any;
  changeLanguage: (value: string) => void;
};

export default function MobileMenu({
  topNavData,
  changeLanguage,
}: MobileMenuProps) {
  const language = useStoreLanguage((state: any) => state.language);

  const { smoother } = useScrollSmoother();
  return (
    <Dialog>
      <DialogTrigger
        onClick={() => smoother?.paused(true)}
        asChild
        className="block"
      >
        <button className="2lg:hidden relative size-6">
          <NextImg
            src="/assets/icons/grid.svg"
            alt="search icon"
            objectFit="contain"
          />
        </button>
      </DialogTrigger>

      <DialogContentMenuMobile>
        <div className="hidden">
          <DialogTitle>Mobile menu</DialogTitle>
          <DialogDescription>Mobile menu</DialogDescription>
        </div>

        <div className="header-container flex h-full flex-col items-stretch bg-[#EDECEB]">
          <div className="flex h-[56px] items-center justify-between">
            <DialogClose
              onClick={() => smoother?.paused(false)}
              asChild
              className="border-none outline-none"
            >
              <AnimatedLink
                href="/"
                className="2lg:h-[40px] 2lg:w-[155px] relative block h-[32px] w-[124px] md:h-[32px] md:w-[124px] lg:h-[36px] lg:w-[140px] xl:h-[44px] xl:w-[171px] 2xl:h-[48px] 2xl:w-[186px]"
              >
                <NextImg
                  src="/assets/logo/logo_ramond_primary.svg"
                  alt="logo ramond"
                  objectFit="contain"
                  className="h-full w-full"
                />
              </AnimatedLink>
            </DialogClose>

            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <button
                  onClick={() => changeLanguage('vi')}
                  className={`${language == 'vi' ? 'text-primary' : 'text-[#111]'} font-manche p-3 text-sm font-medium uppercase md:p-[12px_24px]`}
                >
                  VN
                </button>
                <div className="h-4 w-[1px] bg-black"></div>
                <button
                  // onClick={() => changeLanguage('en')}
                  className={`${language == 'en' ? 'text-primary' : 'text-[#111]'} font-manche cursor-not-allowed p-3 text-sm font-medium uppercase md:p-[12px_24px]`}
                >
                  EN
                </button>
                <div className="h-9 w-[1px] bg-white"></div>
              </div>

              <DialogClose
                onClick={() => smoother?.paused(false)}
                asChild
                className="border-none outline-none"
              >
                <button className="relative size-6">
                  <NextImg
                    src="/assets/icons/close_menu.svg"
                    alt="THM"
                    objectFit="contain"
                  />
                </button>
              </DialogClose>
            </div>
          </div>

          <div className="scrollbar-hidden relative flex-1 overflow-y-scroll pt-6">
            <AccordionRoot
              className="w-full space-y-1"
              type="single"
              collapsible
            >
              {topNavData &&
                topNavData?.map((item: any, index: any) => {
                  return item?.sub_items ? (
                    <AccordionItem
                      value={`item-${index}`}
                      key={index}
                      className="group w-full"
                    >
                      <AccordionTrigger className="flex h-[44px] w-full items-center justify-between">
                        <div className="font-manche text-normal block text-sm font-medium uppercase transition-all duration-300 hover:text-primary group-data-[state=open]:text-primary">
                          {item?.title}
                        </div>

                        <div className="relative size-6">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="absolute inset-0 size-full"
                          >
                            <path
                              d="M18 9L12 15L6 9"
                              stroke="#111111"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className={`stroke-normal origin-center transition-all duration-300 ease-in group-data-[state=open]:-rotate-180 group-data-[state=open]:stroke-primary`}
                            />
                          </svg>
                        </div>
                      </AccordionTrigger>

                      <AccordionContent>
                        <div className="flex flex-col gap-1 px-4">
                          {item?.sub_items?.map(
                            (related_item: any, itemIndex: any) => (
                              <DialogClose
                                onClick={() => smoother?.paused(false)}
                                asChild
                                key={itemIndex}
                                className="w-full"
                              >
                                <AnimatedLink
                                  target={
                                    related_item?.url?.startsWith('http')
                                      ? '_blank'
                                      : '_parent'
                                  }
                                  href={
                                    related_item?.url?.startsWith('http')
                                      ? related_item.url
                                      : `/${language}${related_item?.url || ''}`
                                  }
                                  className="font-manche text-normal h-[32px] text-sm font-medium uppercase transition-all duration-100 hover:text-primary"
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
                          target={
                            item?.url?.startsWith('http') ? '_blank' : '_parent'
                          }
                          href={
                            item?.url?.startsWith('http')
                              ? item.url
                              : `/${language}${item?.url || ''}`
                          }
                          className="font-manche text-normal flex h-[44px] w-full items-center text-sm font-medium uppercase transition-all duration-100 hover:text-primary"
                        >
                          {item?.title}
                        </AnimatedLink>
                      </DialogClose>
                    </AccordionItem>
                  );
                })}
            </AccordionRoot>
          </div>
        </div>
      </DialogContentMenuMobile>
    </Dialog>
  );
}
