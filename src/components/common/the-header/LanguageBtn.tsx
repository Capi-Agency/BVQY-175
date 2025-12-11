'use client';
import React, { useState } from 'react';
import NextImg from '../next-img';
import useStoreLanguage from '@/src/store/store';

type LanguageBtnProps = {
  changeLanguage: (value: string) => void;
};

export default function LanguageBtn({ changeLanguage }: LanguageBtnProps) {
  const language = useStoreLanguage((state: any) => state.language);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const dataLang = ['vi', 'en'];

  return (
    <div
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className="btn-menu relative hidden gap-1 uppercase text-white xl:flex"
    >
      {language}
      <div className="relative size-4">
        <NextImg
          src="/assets/icons/arrow_down_white.svg"
          alt="icon arrow down"
        />
      </div>
      <div
        className={`${isOpen ? 'pointer-events-auto scale-100 opacity-100' : 'pointer-events-none scale-90 opacity-0'} absolute bottom-0 right-0 z-[110] origin-center w-full translate-y-full pt-[22px] transition-all duration-200 md:pt-4 lg:pt-5 xl:pt-2 2xl:pt-3`}
      >
        <div
          className="relative w-full rounded-[6px] bg-white py-[2px]"
          style={{
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
          }}
        >
          {dataLang?.map((item: any, index: number) => {
            if (language === item) return null;
            return (
              <button
                  onClick={() => changeLanguage(item)}
                className="w-full whitespace-nowrap text-nowrap text-start text-sm font-medium uppercase text-black transition-all duration-100 hover:text-primary-600 2xl:p-[6px_12px] 3xl:p-[10px_16px]"
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
