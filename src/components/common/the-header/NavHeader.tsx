'use client';
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

export default function NavHeader() {
  const { top_navigation } = useMetadata();
  const language = useStoreLanguage((state: any) => state.language);

  const [leftPosition, setLeftPosition] = useState(0);
  const menuItemsRef = useRef<(HTMLElement | null)[]>([]);
  const handleMouseEnter = (index: number) => {
    const item = menuItemsRef.current[index];
    if (item) {
      const rect = item.getBoundingClientRect();
      setLeftPosition(rect.left);
    }
  };

  return (
    <NavigationMenu.Root className="relative w-full bg-secondary shadow-md">
      <NavigationMenu.List className="container flex justify-center gap-5 2xl:gap-6 3xl:gap-8 4xl:gap-10">
        {top_navigation?.length > 0 &&
          top_navigation?.map((item: any, index: any) => {
            return item?.sub_items ? (
              <NavigationMenu.Item key={index}>
                <NavigationMenu.Trigger
                  className="group relative select-none"
                  onMouseEnter={(e) => handleMouseEnter(index)}
                >
                  {item?.url ? (
                    <AnimatedLink
                      href={`/${language}${item?.url || ''}`}
                      ref={(el: any) => {
                        menuItemsRef.current[index] = el;
                      }}
                      className="relative flex items-center gap-[2px] whitespace-nowrap text-nowrap py-3 text-sm font-bold uppercase text-white 3xl:gap-1 3xl:text-base"
                    >
                      {language === 'en'
                        ? `${item?.title_en}`
                        : `${item?.title}`}
                      <div className="relative size-5 origin-center duration-200 group-data-[state=open]:-rotate-180 3xl:size-6">
                        <NextImg
                          src="/assets/icons/arrow_down_white.svg"
                          alt="arrow down icon"
                        />
                      </div>
                    </AnimatedLink>
                  ) : (
                    <div
                      ref={(el: any) => {
                        menuItemsRef.current[index] = el;
                      }}
                      className="relative flex items-center gap-[2px] whitespace-nowrap text-nowrap py-3 text-sm font-bold uppercase text-white 3xl:gap-1 3xl:text-base"
                    >
                      {language === 'en'
                        ? `${item?.title_en}`
                        : `${item?.title}`}{' '}
                      <div className="relative size-5 origin-center duration-200 group-data-[state=open]:-rotate-180 3xl:size-6">
                        <NextImg
                          src="/assets/icons/arrow_down_white.svg"
                          alt="arrow down icon"
                        />
                      </div>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 hidden h-[8px] w-full translate-y-full cursor-default group-data-[state=open]:block 2xl:h-[10px]"></div>
                </NavigationMenu.Trigger>

                <NavigationMenu.Content className="relative w-fit overflow-hidden py-2 data-[motion=from-end]:animate-enterFromRight data-[motion=from-start]:animate-enterFromLeft data-[motion=to-end]:animate-exitToRight data-[motion=to-start]:animate-exitToLeft">
                  {item?.sub_items?.map(
                    (related_item: any, related_item_index: any) => (
                      <AnimatedLink
                        key={related_item_index}
                        href={`/${language}${related_item?.url || ''}`}
                        className="block whitespace-nowrap text-nowrap p-[8px_16px] text-sm font-medium text-[#FAFAFA]"
                      >
                        {language === 'en'
                          ? `${related_item?.title_en}`
                          : `${related_item?.title}`}
                      </AnimatedLink>
                    ),
                  )}
                </NavigationMenu.Content>
              </NavigationMenu.Item>
            ) : (
              <NavigationMenu.Item key={index}>
                <AnimatedLink
                  href={`/${language}${item?.url || ''}`}
                  className="relative block whitespace-nowrap text-nowrap py-3 text-sm font-bold uppercase text-white 3xl:text-base"
                >
                  {language === 'en'
                    ? `${item?.title_en}`
                    : `${item?.title}`}{' '}
                </AnimatedLink>
              </NavigationMenu.Item>
            );
          })}
      </NavigationMenu.List>
      <div
        className="perspective-[2000px] absolute left-0 top-[50px] w-full transition-all duration-300 2xl:top-[54px] 3xl:top-[58px]"
        style={{ left: `${leftPosition}px` }}
      >
        <NavigationMenu.Viewport className="relative h-[var(--radix-navigation-menu-viewport-height)] w-[var(--radix-navigation-menu-viewport-width)] origin-[top_center] overflow-hidden rounded-[6px] bg-secondary/90 shadow-[0_4px_12px_0_rgba(0,0,0,0.07)] transition-all duration-100 data-[state=closed]:animate-scaleOut data-[state=open]:animate-scaleIn" />
      </div>
    </NavigationMenu.Root>
  );
}
