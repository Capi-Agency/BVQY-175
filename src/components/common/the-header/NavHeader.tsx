'use client';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import Link from 'next/link';
import useStoreLanguage from '@/src/store/store';
import { useEffect, useRef, useState } from 'react';
import NextImg from '../next-img';
import { useMetadata } from '@/src/providers/MetadataProvider';
import { useTranslate } from '@/src/hooks/useTranslate';

export default function NavHeader() {
  const { top_navigation } = useMetadata();
  const language = useStoreLanguage((state: any) => state.language);
  const { trans } = useTranslate();

  const [leftPosition, setLeftPosition] = useState(0);

  const menuItemsRef = useRef<(HTMLElement | null)[]>([]);
  const handleMouseEnter = (index: number, isMegaMenu: boolean) => {
    const item = menuItemsRef.current[index];
    if (item) {
      if (isMegaMenu) {
        setLeftPosition(window.innerWidth * 0.1);
      } else {
        const rect = item.getBoundingClientRect();
        setLeftPosition(rect.left);
      }
    }
  };

  return (
    <NavigationMenu.Root className="relative w-full bg-primary-600 shadow-md">
      <NavigationMenu.List className="container flex justify-center gap-5 2xl:gap-6 3xl:gap-8 4xl:gap-10">
        {top_navigation?.length > 0 &&
          top_navigation?.map((item: any, index: any) => {
            return item?.sub_items ? (
              <NavigationMenu.Item key={index}>
                <NavigationMenu.Trigger
                  className="group relative select-none"
                  onMouseEnter={(e) =>
                    handleMouseEnter(index, item?.type === 'mega_menu')
                  }
                >
                  {item?.url ? (
                    <Link
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
                    </Link>
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

                {item?.type === 'mega_menu' ? (
                  <NavigationMenu.Content className="relative flex h-[200px] w-[calc(100vw*0.8)] gap-10 overflow-hidden p-[24px_32px] data-[motion=from-end]:animate-enterFromRight data-[motion=from-start]:animate-enterFromLeft data-[motion=to-end]:animate-exitToRight data-[motion=to-start]:animate-exitToLeft">
                    {/* {item?.sub_items?.map(
                      (related_item: any, related_item_index: any) => (
                        <Link
                          key={related_item_index}
                          href={`/${language}${related_item?.url || ''}`}
                          className="block whitespace-nowrap text-nowrap p-[6px_12px] text-sm font-medium text-black transition-all duration-100 hover:text-primary-600 3xl:p-[10px_16px]"
                        >
                          {language === 'en'
                            ? `${related_item?.title_en}`
                            : `${related_item?.title}`}
                        </Link>
                      ),
                    )} */}

                    {/* <div className="flex-1">demo</div>

                    <div className="relative w-[400px] rounded-[6px] bg-[#092E15] p-[40px_32px]">
                      <div
                        className="text-[36px] font-bold leading-[1.3] text-[#F6FAF7]"
                        dangerouslySetInnerHTML={{
                          __html: trans('make-an-appointment'),
                        }}
                      ></div>

                      <div
                        className="absolute left-0 top-1/2 w-full -translate-y-1/2 p-[20px_32px]"
                        style={{
                          background:
                            'linear-gradient(0deg, #06500D 4.41%, rgba(21, 86, 40, 0.00) 234.22%)',
                        }}
                      >
                        <div className="w-[254px] text-[#F4F4F5] text-sm font-normal">
                          Liên hệ ngay chúng tôi để được phục vụ và sử dụng các
                          dịch vụ khám, chữa bệnh hiện đại & cao cấp nhất.
                        </div>
                      </div>
                    </div> */}
                  </NavigationMenu.Content>
                ) : (
                  <NavigationMenu.Content className="group/nav overflow-hidde relative w-fit py-2">
                    {item?.sub_items?.map(
                      (item_second: any, item_second_index: any) => (
                        <div
                          key={item_second_index}
                          className="group group-data-[motion=from-end]/nav:animate-enterFromRight group-data-[motion=from-start]/nav:animate-enterFromLeft group-data-[motion=to-end]/nav:animate-exitToRight group-data-[motion=to-start]/nav:animate-exitToLeft"
                        >
                          {/* Cấp 1 */}
                          {item_second?.url ? (
                            <Link
                              href={`/${language}${item_second?.url || ''}`}
                              className="flex items-center gap-2 whitespace-nowrap text-nowrap p-[6px_12px] text-sm font-medium text-black transition-all duration-100 group-hover:text-primary-600 2xl:p-[8px_12px] 3xl:p-[10px_16px]"
                            >
                              <div className="flex-1">
                                {language === 'en'
                                  ? `${item_second?.title_en}`
                                  : `${item_second?.title}`}
                              </div>
                              {item_second?.sub_items?.length > 0 && (
                                <div className="relative size-5 brightness-0 transition-all duration-200 group-hover:-rotate-90 group-hover:brightness-100">
                                  <NextImg
                                    src="/assets/icons/arrow_down_primary.svg"
                                    alt="arrow icon"
                                  />
                                </div>
                              )}
                            </Link>
                          ) : (
                            <div className="flex items-center gap-2 whitespace-nowrap text-nowrap p-[6px_12px] text-sm font-medium text-black transition-all duration-100 group-hover:text-primary-600 2xl:p-[8px_12px] 4xl:p-[10px_16px]">
                              <div className="flex-1">
                                {language === 'en'
                                  ? `${item_second?.title_en}`
                                  : `${item_second?.title}`}
                              </div>
                              {item_second?.sub_items?.length > 0 && (
                                <div className="relative size-5 brightness-0 transition-all duration-200 group-hover:-rotate-90 group-hover:brightness-100">
                                  <NextImg
                                    src="/assets/icons/arrow_down_primary.svg"
                                    alt="arrow icon"
                                  />
                                </div>
                              )}
                            </div>
                          )}

                          {/* Cấp 2 */}
                          {item_second?.sub_items?.length > 0 && (
                            <div
                              className="pointer-events-none absolute left-[calc(100%+8px)] top-0 grid w-[512px] scale-95 grid-cols-2 gap-4 rounded-[6px] bg-white p-[12px_16px] opacity-0 shadow-lg transition-all duration-200 after:absolute after:-left-2 after:top-0 after:h-full after:w-2 group-hover:pointer-events-auto group-hover:scale-100 group-hover:opacity-100 2xl:w-[860px] 2xl:grid-cols-4 2xl:p-[20px_24px] 3xl:w-[940px] 3xl:gap-6 4xl:w-[1024px] 4xl:p-[24px_32px]"
                              style={{
                                boxShadow:
                                  '0 20px 25px -4px rgba(18, 26, 43, 0.10), 0 8px 8px -6px rgba(18, 26, 43, 0.04)',
                              }}
                            >
                              {item_second?.sub_items.map(
                                (item_third: any, item_third_index: number) => (
                                  <div key={item_third_index}>
                                    {item_third?.url ? (
                                      <Link
                                        href={`/${language}${item_third?.url || ''}`}
                                        className="block text-sm font-bold uppercase text-black 3xl:text-base"
                                      >
                                        {language === 'en'
                                          ? `${item_third?.title_en}`
                                          : `${item_third?.title}`}
                                      </Link>
                                    ) : (
                                      <div className="block text-sm font-bold uppercase text-black 3xl:text-base">
                                        {language === 'en'
                                          ? `${item_third?.title_en}`
                                          : `${item_third?.title}`}
                                      </div>
                                    )}

                                    <div className="pt-1">
                                      {item_third?.sub_items?.map(
                                        (
                                          item_fourth: any,
                                          item_fourth_index: number,
                                        ) =>
                                          item_fourth?.url ? (
                                            <Link
                                              key={item_fourth_index}
                                              href={`/${language}${item_fourth?.url || ''}`}
                                              className="block py-[6px] text-sm font-medium text-[#010502] duration-100 hover:text-primary-600 2xl:py-2 3xl:py-[10px]"
                                            >
                                              {language === 'en'
                                                ? `${item_fourth?.title_en}`
                                                : `${item_fourth?.title}`}
                                            </Link>
                                          ) : (
                                            <div
                                              key={item_fourth_index}
                                              className="block py-[6px] text-sm font-medium text-[#010502] duration-100 hover:text-primary-600 2xl:py-2 3xl:py-[10px]"
                                            >
                                              {language === 'en'
                                                ? `${item_fourth?.title_en}`
                                                : `${item_fourth?.title}`}
                                            </div>
                                          ),
                                      )}
                                    </div>
                                  </div>
                                ),
                              )}
                            </div>
                          )}
                        </div>
                      ),
                    )}
                  </NavigationMenu.Content>
                )}
              </NavigationMenu.Item>
            ) : (
              <NavigationMenu.Item key={index}>
                <Link
                  href={`/${language}${item?.url || ''}`}
                  className="relative block whitespace-nowrap text-nowrap py-3 text-sm font-bold uppercase text-white 3xl:text-base"
                >
                  {language === 'en'
                    ? `${item?.title_en}`
                    : `${item?.title}`}{' '}
                </Link>
              </NavigationMenu.Item>
            );
          })}
      </NavigationMenu.List>
      <div
        className="perspective-[2000px] absolute left-0 top-[50px] w-full transition-all duration-300 2xl:top-[54px] 3xl:top-[58px]"
        style={{ left: `${leftPosition}px` }}
      >
        <NavigationMenu.Viewport className="overflow-hidde relative h-[var(--radix-navigation-menu-viewport-height)] w-[var(--radix-navigation-menu-viewport-width)] origin-[top_center] rounded-[6px] bg-white shadow-[0_20px_25px_-4px_rgba(18,26,43,0.1)] transition-all duration-100 data-[state=closed]:animate-scaleOut data-[state=open]:animate-scaleIn" />
      </div>
    </NavigationMenu.Root>
  );
}
