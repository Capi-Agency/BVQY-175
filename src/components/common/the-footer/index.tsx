'use client';
import React, { useState } from 'react';
import NextImg from '@/src/components/common/next-img';
import { useTranslate } from '@/src/hooks/useTranslate';
import { useMetadata } from '@/src/providers/MetadataProvider';
import Link from 'next/link';
import useStoreLanguage from '@/src/store/store';
import RegisterFormFooter from './RegisterFormFooter';

export default function TheFooter({ data }: any) {
  const language = useStoreLanguage((state: any) => state.language);
  const { trans } = useTranslate();
  const { contact_information, bottom_navigation } = useMetadata();
  return (
    <footer className="relative bg-secondary py-6 xl:py-8 3xl:py-10">
      <div className="pointer-events-none absolute inset-0 size-full select-none">
        <NextImg
          src="/assets/images/footer_bg.png"
          alt="footer background"
          objectFit="cover"
          className="hidden md:block"
        />
        <NextImg
          src="/assets/images/footer_bg_mb.png"
          alt="footer background"
          objectFit="cover"
          className="md:hidden"
        />
      </div>
      <div className="container space-y-6 xl:space-y-8 3xl:space-y-10 4xl:!px-[320px]">
        {/* Start: logo and form */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-0">
          <div className="relative h-[72px] w-[295px] 3xl:h-[88px] 3xl:w-[361px]">
            <NextImg
              src="/assets/logo/secondary_logo.svg"
              alt="175 hospital logo"
            />
          </div>

          <RegisterFormFooter />
        </div>
        {/* End: logo and form */}

        <div className="h-[1px] w-full bg-[#00A032]"></div>

        <div className="flex flex-col gap-6 md:flex-row md:flex-wrap md:gap-x-4 md:gap-y-6 xl:flex-nowrap xl:justify-between">
          {/* Start: contact info */}
          <div className="w-full md:w-[256px] lg:w-[432px] xl:w-[308px]">
            <h2 className="text-base font-bold tracking-wider text-white">
              {trans('contact-label')}
            </h2>
            <div className="mt-2 h-[1px] w-8 bg-[#D4D4D8]"></div>

            <div className="mt-5 space-y-4">
              <a
                href={`${contact_information?.hot_line_url || '/'}`}
                className="flex gap-2"
              >
                <div className="relative size-5">
                  <NextImg src="/assets/icons/phone.svg" alt="phone icon" />
                </div>
                <span className="flex-1 text-sm font-normal tracking-wider text-[#FAFAFA]">
                  {contact_information?.hot_line}
                </span>
              </a>

              <a
                href={`${contact_information?.email_url || '/'}`}
                className="flex gap-2"
              >
                <div className="relative size-5">
                  <NextImg src="/assets/icons/mail.svg" alt="mail icon" />
                </div>
                <span className="flex-1 text-sm font-normal tracking-wider text-[#FAFAFA]">
                  {contact_information?.email}
                </span>
              </a>

              <a
                target="_blank"
                rel="noopener"
                href={`${contact_information?.address_url || '/'}`}
                className="flex gap-2"
              >
                <div className="relative size-5">
                  <NextImg
                    src="/assets/icons/location.svg"
                    alt="location icon"
                  />
                </div>
                <span className="flex-1 text-sm font-normal tracking-wider text-[#FAFAFA]">
                  {contact_information?.address}
                </span>
              </a>
            </div>
          </div>
          {/* End: contact info */}

          {/* Start: site map */}
          {bottom_navigation?.length > 0 &&
            bottom_navigation?.map((item: any, index: number) => (
              <div
                key={index}
                className="w-full md:w-[200px] xl:w-[172px] 3xl:w-[200px]"
              >
                <h2 className="text-base font-bold tracking-wider text-white">
                  {language === 'en' ? `${item?.title_en}` : `${item?.title}`}
                </h2>
                <div className="mt-2 h-[1px] w-8 bg-[#D4D4D8]"></div>
                <div className="mt-5 space-y-4">
                  {item?.sub_items?.map(
                    (sub_item: any, sub_item_index: number) => (
                      <Link
                        key={sub_item_index}
                        href={`${language}${sub_item?.url}`}
                        className="block w-fit text-sm font-normal tracking-wider text-[#FAFAFA]"
                      >
                        {sub_item?.title}
                      </Link>
                    ),
                  )}
                </div>
              </div>
            ))}
          {/* End: site map */}

          {/* Start: social network */}
          <div className="md:pr-5 xl:px-3 2xl:px-4 3xl:px-6">
            <h2 className="text-base font-bold tracking-wider text-white">
              {trans('social-network-label')}
            </h2>
            <div className="mt-2 h-[1px] w-8 bg-[#D4D4D8]"></div>

            <div className="mt-3 flex gap-3">
              {contact_information.facebook_url && (
                <Link
                  href={`${contact_information?.facebook_url}`}
                  target="_blank"
                  rel="noopener"
                  className="relative size-8"
                >
                  <NextImg
                    src="/assets/icons/facebook.svg"
                    alt="facebook logo"
                  />
                </Link>
              )}
              {contact_information.youtube_url && (
                <Link
                  href={`${contact_information?.youtube_url}`}
                  target="_blank"
                  rel="noopener"
                  className="relative size-8"
                >
                  <NextImg src="/assets/icons/youtube.svg" alt="youtube logo" />
                </Link>
              )}

              {contact_information.zalo_url && (
                <Link
                  href={`${contact_information?.zalo_url}`}
                  target="_blank"
                  rel="noopener"
                  className="relative size-8"
                >
                  <NextImg src="/assets/icons/zalo.svg" alt="zalo logo" />
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center gap-6 md:px-3 xl:flex-col xl:items-start xl:gap-4 2xl:gap-5 2xl:px-4 3xl:px-6 4xl:gap-6">
            <div className="relative h-[50px] w-[126px] 2xl:h-[58px] 2xl:w-[147px] 4xl:h-[66px] 4xl:w-[167px]">
              <NextImg
                src="/assets/images/bo_cong_thuong.png"
                alt="Bộ công thương"
              />
            </div>

            <Link
              target="_blank"
              rel="noopener"
              href={`${contact_information?.dmca_url || '/'}`}
              className="relative h-[50px] w-[100px] 2xl:h-[58px] 2xl:w-[116px] 4xl:h-[66px] 4xl:w-[132px]"
            >
              <NextImg src="/assets/images/dmca.png" alt="DMCA protected" />
            </Link>
          </div>
          {/* End: social network */}
        </div>

        {/* Start: policy */}
        <div>
          <div className="flex w-full items-stretch justify-center gap-3 text-xs font-medium text-white md:text-nowrap">
            {contact_information?.security_url && (
              <>
                <Link
                  target="_blank"
                  rel="noopener"
                  href={`${contact_information?.security_url || '/'}`}
                  className="block tracking-wider"
                >
                  {trans('policy-label')}
                </Link>
                <div className="w-[1px] bg-white"></div>
              </>
            )}

            {contact_information?.security_url && (
              <Link
                target="_blank"
                rel="noopener"
                href={`${contact_information?.security_url || '/'}`}
                className="block tracking-wider"
              >
                {trans('terms-services-label')}
              </Link>
            )}
          </div>

          <div className="mb-3 mt-4 h-[1px] w-full bg-[#00A032] xl:mt-6"></div>

          <div className="text-center text-sm font-normal tracking-normal text-white md:tracking-wider">
            {trans('copy-right-label')}
          </div>
        </div>
        {/* End: policy */}
      </div>
    </footer>
  );
}
