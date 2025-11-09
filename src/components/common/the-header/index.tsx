'use client';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import Link from 'next/link';
import useStoreLanguage from '@/src/store/store';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { CommonSection } from '@/src/types/pageBuilder';
import { fnGetMetadata } from '@/src/services/metadata';
import { fnGetTopNavBySlug } from '@/src/services/page';
import NextImg from '../next-img';
import { AnimatedLink } from '../../animation/LinkAnimated';
import { useMetadata } from '@/src/providers/MetadataProvider';
import { getAssetUrlById } from '@/src/utils/image';
import NavHeader from './NavHeader';
import MobileMenu from './MenuMobile';

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = {
  data: any;
};

export default function TheHeader({ data }: Props) {
  const { contact_information } = useMetadata();
  const language = useStoreLanguage((state: any) => state.language);
  const updateLanguage = useStoreLanguage((state: any) => state.updateLanguage);
  const pathname = usePathname();
  const router = useRouter();

  const headerRef = useRef<any>(null);
  const selector = gsap.utils.selector(headerRef);

  const changeLanguage = (value: string) => {
    const segments = pathname.split('/');

    segments[1] = value;

    if (segments[2]) {
      const slugParts = segments[2].split('-');
      const lastPart = slugParts[slugParts.length - 1];

      if (lastPart === 'en' || lastPart === 'vi') {
        if (value === 'vi') {
          slugParts.pop();
          segments[2] = slugParts.join('-');
        } else {
          slugParts[slugParts.length - 1] = 'en';
          segments[2] = slugParts.join('-');
        }
      }
    }
    const newPath = segments.join('/') || '/';
    router.push(newPath);
    updateLanguage(value);
  };

  useGSAP(
    () => {
      gsap.to(selector('.header-primary'), {
        yPercent: 0,
        opacity: 1,
        duration: 0.3,
        ease: 'power1.out',
        delay: 0.2,
      });

      ScrollTrigger.create({
        trigger: selector('.header-primary'),
        start: () => 'top top',
        end: 'max',
        pin: true,
        pinSpacing: false,
        // onUpdate: (self) => {
        //   if (self.direction === 1) {
        //     gsap.to(selector('.header-primary'), {
        //       yPercent: -100,
        //       duration: 0.4,
        //       ease: 'power1.out',
        //     });
        //   } else {
        //     gsap.to(selector('.header-primary'), {
        //       yPercent: 0,
        //       duration: 0.4,
        //       ease: 'power1.out',
        //     });
        //   }
        // },
      });
    },
    { scope: headerRef },
  );

  return (
    <header ref={headerRef}>
      <div
        className={`header-primary absolute left-0 top-0 z-[100] w-full -translate-y-full opacity-0`}
      >
        <div className="bg-white py-[6px] xl:py-2 2xl:py-[10px] 4xl:py-3 shadow-md">
          <div className="container relative flex items-center justify-between">
            <AnimatedLink
              href="/"
              className="relative h-[52px] w-[214px] md:h-[56px] md:w-[230px] lg:h-[64px] lg:w-[262px] 2xl:h-[72px] 2xl:w-[296px] 4xl:h-[80px] 4xl:w-[328px]"
            >
              <NextImg
                src="/assets/logo/primary_logo.svg"
                alt="Military hospital logo"
              />
            </AnimatedLink>

            <div className="flex items-center gap-3 md:gap-4 lg:gap-6 2xl:gap-8 4xl:gap-10">
              {/* Start: medal*/}
              <div className="hidden items-center gap-3 md:flex xl:gap-4 2xl:gap-5 4xl:gap-6">
                {contact_information?.files?.length > 0 &&
                  contact_information?.files?.map(
                    (file: any, index: number) => (
                      <div
                        className="relative h-[44px] w-[30px] lg:h-[52px] lg:w-[36px] xl:h-[56px] xl:w-[39px] 2xl:h-[64px] 2xl:w-[44px] 4xl:h-[72px] 4xl:w-[50px]"
                        key={index}
                      >
                        <NextImg
                          src={getAssetUrlById(file?.directus_files_id)}
                          alt="Military hospital"
                        />
                      </div>
                    ),
                  )}
              </div>
              {/* End: medal*/}

              {/* Start: location + search + language */}
              <div className="flex flex-col items-center gap-[6px] 4xl:gap-2">
                <div className="flex items-center gap-2 2xl:gap-3">
                  <button className="hidden h-9 w-[52px] items-center justify-center rounded-[6px] bg-secondary md:flex 2xl:h-10 2xl:w-[60px]">
                    <div className="relative size-5 2xl:size-6">
                      <NextImg
                        src="/assets/icons/hospital_location.svg"
                        alt="hospital location"
                      />
                    </div>
                  </button>

                  <button className="hidden h-9 w-[52px] items-center justify-center rounded-[6px] bg-secondary md:flex 2xl:h-10 2xl:w-[60px]">
                    <div className="relative size-5 2xl:size-6">
                      <NextImg
                        src="/assets/icons/search_white.svg"
                        alt="search icon"
                      />
                    </div>
                  </button>

                  <MobileMenu changeLanguage={changeLanguage} />

                  <button
                    onClick={() =>
                      changeLanguage(`${language === 'en' ? 'en' : 'vi'}`)
                    }
                    className="relative hidden h-9 w-[52px] overflow-hidden rounded-[6px] xl:flex 2xl:h-10 2xl:w-[60px]"
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

                <a
                  href={`${contact_information?.hot_line_url || '/'}`}
                  className="hidden text-lg font-medium text-secondary xl:block 2xl:text-xl 2xl:!leading-[1.6] 4xl:text-[22px] 4xl:!leading-[1.55]"
                >
                  Hotline:{' '}
                  <span className="text-[#E11E30]">
                    {contact_information?.hot_line}
                  </span>
                </a>
              </div>
              {/* End: location + search + language */}
            </div>
          </div>
        </div>

        <div className="hidden w-full xl:block">
          <NavHeader />
        </div>
      </div>
    </header>
  );
}
