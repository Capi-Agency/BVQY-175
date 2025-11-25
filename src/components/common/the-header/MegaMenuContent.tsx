'use client';
import React, { useState } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import ContactCta from './ContactCta';
import useStoreLanguage from '@/src/store/store';
import Link from 'next/link';

export default function MegaMenuContent({ item }: any) {
  const language = useStoreLanguage((state: any) => state.language);
  const [currentTab, setCurrentTab] = useState<number>(0);

  return (
    <NavigationMenu.Content className="relative flex w-[calc(100vw*0.8)] gap-6 overflow-hidden p-[12px_16px] data-[motion=from-end]:animate-enterFromRight data-[motion=from-start]:animate-enterFromLeft data-[motion=to-end]:animate-exitToRight data-[motion=to-start]:animate-exitToLeft 2xl:gap-7 2xl:p-[20px_24px] 3xl:gap-8 4xl:gap-10 4xl:p-[24px_32px]">
      <div className="flex-1">
        <div className="flex w-full items-stretch">
          {item?.sub_items?.map(
            (item_second: any, item_second_index: number) => (
              <div
                onClick={() => setCurrentTab(item_second_index)}
                key={item_second_index}
                className={`${currentTab === item_second_index ? 'border-primary-600 text-primary-600' : 'border-[#E4E4E7] text-[#71717A] hover:border-primary-300 hover:text-primary-400'} flex-1 cursor-pointer border-b-[2px] pb-3 text-center text-sm font-semibold uppercase transition-all duration-100 3xl:text-base 4xl:pb-4`}
              >
                {language === 'en'
                  ? `${item_second?.title_en}`
                  : `${item_second?.title}`}{' '}
              </div>
            ),
          )}
        </div>

        {item?.sub_items?.map((item_second: any, item_second_index: number) => (
          <div
            key={item_second_index}
            className={`${currentTab === item_second_index ? 'grid' : 'hidden'} grid-cols-3 gap-5 pt-4 2xl:grid-cols-4 2xl:gap-6 2xl:pt-5 3xl:gap-7 4xl:gap-8 4xl:pt-6`}
          >
            {item_second?.sub_items?.map(
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
                      (item_fourth: any, item_fourth_index: number) =>
                        item_fourth?.url ? (
                          <Link
                            key={item_fourth_index}
                            href={`/${language}${item_fourth?.url || ''}`}
                            className="block py-[6px] text-sm font-medium text-[#010502] duration-100 hover:text-primary-600 3xl:py-[10px]"
                          >
                            {language === 'en'
                              ? `${item_fourth?.title_en}`
                              : `${item_fourth?.title}`}
                          </Link>
                        ) : (
                          <div
                            key={item_fourth_index}
                            className="block py-[6px] text-sm font-medium text-[#010502] duration-100 hover:text-primary-600 3xl:py-[10px]"
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
        ))}
      </div>

      <ContactCta />
    </NavigationMenu.Content>
  );
}
