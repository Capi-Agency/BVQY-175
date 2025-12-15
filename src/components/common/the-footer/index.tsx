'use client';
import React, { useState } from 'react';
import NextImg from '@/src/components/common/next-img';
import { useMetadata } from '@/src/providers/MetadataProvider';
import Link from 'next/link';
import useStoreLanguage from '@/src/store/store';
import RegisterFormFooter from './RegisterFormFooter';
import CustomLink from '../custom-link';
import Script from 'next/script';
import useTranslation from '@/src/hooks/use-translation';


export default function TheFooter() {
  const language = useStoreLanguage((state: any) => state.language);
  const { trans } = useTranslation();
  const { contact_information, bottom_navigation } = useMetadata();


  return (
    <footer className="relative bg-primary-600 py-6 xl:py-8 3xl:py-10 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 hidden size-full select-none md:block">
        <NextImg
          src="/assets/images/footer_bg.png"
          alt="footer background"
          objectFit="cover"
          className=""
        />
      </div>
      <div className="pointer-events-none absolute inset-0 size-full select-none md:hidden">
        <NextImg
          src="/assets/images/footer_bg_mb.png"
          alt="footer background"
          objectFit="cover"
        />
      </div>
      <div className="container space-y-6 xl:space-y-8 3xl:space-y-10">
        {/* Start: logo and form */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-0">
          <Link
            href={'/'}
            aria-label="Chuyển đến trang chủ"
            className="relative h-[72px] w-[295px] 3xl:h-[88px] 3xl:w-[361px]"
          >
            <NextImg
              src="/assets/logo/secondary_logo.svg"
              alt="175 hospital logo"
            />
          </Link>

          <RegisterFormFooter />
        </div>
        {/* End: logo and form */}

        <div className="h-[1px] w-full bg-[#00A032]"></div>

        <div className="flex flex-col gap-6 md:flex-row md:flex-wrap md:gap-x-4 md:gap-y-6 xl:flex-nowrap xl:justify-between">
          {/* Start: contact info */}
          <div className="w-full md:w-full lg:w-[432px] xl:w-[320px] 3xl:w-[352px]">
            <h2 className="text-base font-bold tracking-wider text-white 3xl:text-lg">
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
                <span className="flex-1 text-sm font-normal tracking-wider text-[#FAFAFA] 3xl:text-base">
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
                <span className="flex-1 text-sm font-normal tracking-wider text-[#FAFAFA] 3xl:text-base">
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
                <span className="flex-1 text-sm font-normal tracking-wider text-[#FAFAFA] 3xl:text-base">
                  {contact_information?.address}
                </span>
              </a>
            </div>
          </div>
          {/* End: contact info */}

          {/* Start: site map */}
          {bottom_navigation?.length > 0 &&
            bottom_navigation?.map((item: any, index: number) => {
              return item?.title ? (
                <div
                  key={index}
                  className="w-full md:w-[200px] xl:w-[172px] 3xl:w-[200px]"
                >
                  <h2 className="text-base font-bold tracking-wider text-white 3xl:text-lg">
                    {language === 'en' ? `${item?.title_en}` : `${item?.title}`}
                  </h2>
                  <div className="mt-2 h-[1px] w-8 bg-[#D4D4D8]"></div>
                  <div className="mt-5 space-y-4">
                    {item?.sub_items?.map(
                      (sub_item: any, sub_item_index: number) => (
                        <CustomLink
                          key={sub_item_index}
                          href={sub_item?.url}
                          className="block w-fit text-sm font-normal tracking-wider text-[#FAFAFA] 3xl:text-base"
                        >
                          {language === 'en'
                            ? `${sub_item?.title_en}`
                            : `${sub_item?.title}`}
                        </CustomLink>
                      ),
                    )}
                  </div>
                </div>
              ) : null;
            })}
          {/* End: site map */}

          {/* Start: social network */}
          <div className="md:pr-5 xl:px-3 2xl:px-4 3xl:px-6">
            <h2 className="text-base font-bold tracking-wider text-white 3xl:text-lg">
              {trans('social-network-label')}
            </h2>
            <div className="mt-2 h-[1px] w-8 bg-[#D4D4D8]"></div>

            <div className='mt-5 flex flex-col gap-6 lg:gap-8 md:flex-row md:items-center xl:items-start xl:gap-6 2xl:gap-8 3xl:gap-8 4xl:gap-9 xl:flex-col'>
              <div className="flex gap-3">
                {contact_information?.facebook_url && (
                  <Link
                    href={`${contact_information?.facebook_url}`}
                    target="_blank"
                    rel="noopener"
                    aria-label="Facebook bệnh viện 175"
                    className="relative size-8 md:size-9"
                  >
                    <NextImg
                      src="/assets/icons/facebook.svg"
                      alt="facebook logo"
                    />
                  </Link>
                )}
                {contact_information?.youtube_url && (
                  <Link
                    href={`${contact_information?.youtube_url}`}
                    target="_blank"
                    rel="noopener"
                    aria-label="Youtube bệnh viện 175"
                    className="relative size-8 md:size-9"
                  >
                    <NextImg src="/assets/icons/youtube.svg" alt="youtube logo" />
                  </Link>
                )}

                {contact_information?.zalo_url && (
                  <Link
                    href={`${contact_information?.zalo_url}`}
                    target="_blank"
                    rel="noopener"
                    aria-label="Zalo bệnh viện 175"
                    className="relative size-8 md:size-9"
                  >
                    <NextImg src="/assets/icons/zalo_contact.svg" alt="zalo logo" />
                  </Link>
                )}
              </div>

              <div className='gap-3 2xl:gap-4 flex items-center xl:flex-col'>
                <CustomLink
                  href={contact_information?.googleplay_url}
                  className='relative block aspect-[180/50] w-[140px] lg:w-[150px] 2xl:w-[160px] 3xl:w-[170px] 4xl:w-[180px]'>
                  <NextImg src="/assets/images/gg_play_cta.png" alt="gg play cta" />
                </CustomLink>

                <CustomLink
                  href={contact_information?.appstore_url}

                  className='relative block aspect-[180/50] w-[140px] lg:w-[150px] 2xl:w-[160px] 3xl:w-[170px] 4xl:w-[180px]'>
                  <NextImg src="/assets/images/app_store_cta.png" alt="app store cta" />
                </CustomLink>
              </div>
            </div>
          </div>

          <div className="flex items-center md:items-end gap-6 md:px-0 xl:flex-col xl:items-start xl:gap-4 2xl:gap-5 4xl:gap-6">
            <div className="relative h-[50px] w-[126px] 2xl:h-[58px] 2xl:w-[147px] 4xl:h-[66px] 4xl:w-[167px]">
              <NextImg
                src="/assets/images/bo_cong_thuong.png"
                alt="Bộ công thương"
              />
            </div>

            <a
              target="_blank"
              rel="noopener"
              href="//www.dmca.com/Protection/Status.aspx?ID=3fea7e96-c255-4e43-955e-8d80a85d3048"
              title="DMCA.com Protection Status"
              className="dmca-badge"
            >
              <img
                className="h-[50px] w-[100px] 2xl:h-[58px] 2xl:w-[116px] 4xl:h-[66px] 4xl:w-[132px]"
                src="https://images.dmca.com/Badges/dmca-badge-w250-2x1-04.png?ID=3fea7e96-c255-4e43-955e-8d80a85d3048"
                alt="DMCA.com Protection Status"
              />
            </a>
            <Script src="https://images.dmca.com/Badges/DMCABadgeHelper.min.js"></Script>
          </div>
          {/* End: social network */}
        </div>

        {/* Start: policy */}
        <div>
          <div className="flex w-full items-stretch justify-center gap-3 text-xs font-medium text-white md:text-nowrap lg:text-sm">
            {contact_information?.security_url && (
              <>
                <Link
                  target="_blank"
                  rel="noopener"
                  href={`${contact_information?.security_url || '/'}`}
                  className="block tracking-wider"
                  aria-label="Thông tin bảo mật"
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
                aria-label="Thông tin bảo mật"
                className="block tracking-wider"
              >
                {trans('terms-services-label')}
              </Link>
            )}
          </div>

          <div className="my-3 h-[1px] w-full bg-[#00A032] xl:my-4 3xl:mb-5"></div>

          <div className="text-center text-sm 2xl:text-base font-normal tracking-normal text-white md:tracking-wider">
            {trans('copy-right-label')}
          </div>
        </div>
        {/* End: policy */}
      </div>
    </footer>
  );
}
