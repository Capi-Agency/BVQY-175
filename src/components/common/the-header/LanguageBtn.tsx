'use client';
import React, { useState } from 'react';
import NextImg from '../next-img';
import useStoreLanguage from '@/src/store/store';
import { cn } from '@/src/lib/utils';

type LanguageBtnProps = {
  changeLanguage: (value: string) => void;
  className?: string;
  side?: "top" | "bottom"
};

export default function LanguageBtn({ changeLanguage, className, side = "bottom" }: LanguageBtnProps) {
  const language = useStoreLanguage((state: any) => state.language);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const dataLang = ['vi', 'en'];

  return (
    <div
      onClick={() => setIsOpen(true)}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className={cn("btn-menu relative gap-1 uppercase text-white text-sm xl:text-base flex", className)}
    >
      {language}
      <div className="relative size-4">
        <NextImg
          src="/assets/icons/arrow_down_white.svg"
          alt="icon arrow down"
        />
      </div>

      <div
        className={cn("absolute right-0 z-[110] w-full origin-center   transition-all duration-200 ",
          isOpen ? 'pointer-events-auto scale-100 opacity-100' : 'pointer-events-none scale-90 opacity-0',
          side === "bottom" && "bottom-0 pt-1 xl:pt-2 2xl:pt-3 translate-y-full",
          side === "top" && "top-0 pb-1 xl:pb-2 2xl:pb-3 -translate-y-full"
        )}>
        <div
          className="relative w-full rounded-[6px] overflow-hidden bg-white py-[2px]"
          style={{
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
          }}
        >
          {dataLang?.map((item: any, index: number) => {
            if (language === item) return null;
            return (
              <button
                onClick={() => changeLanguage(item)}
                key={index}
                className="w-full whitespace-nowrap text-nowrap text-start text-sm font-medium uppercase text-black transition-all duration-100 hover:text-primary-600 p-[6px_10px] 2xl:p-[6px_12px] 3xl:p-[10px_16px]"
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
