'use client';
import React, { useEffect, useRef, useState } from 'react';
import NextImg from '../next-img';
import useTranslation from '@/src/hooks/use-translation';

type SearchHeaderProps = {
  handleSearch: (key: string, value: string) => void;
};

export default function SearchHeader({ handleSearch }: SearchHeaderProps) {
  const trans = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  const [searchText, setSearchText] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Nếu click không nằm trong boxRef
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchText('');
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={boxRef} className="relative">
      <div
        onClick={() => setIsOpen((prev: boolean) => !prev)}
        className="flex cursor-pointer items-center justify-center md:h-9 md:w-[52px] md:rounded-[6px] md:bg-primary-600 2xl:h-10 2xl:w-[60px]"
      >
        <div className="relative size-5 brightness-0 md:brightness-100 2xl:size-6">
          <NextImg src="/assets/icons/search_white.svg" alt="search icon" />
        </div>
      </div>

      <div
        className={`${isOpen ? 'pointer-events-auto translate-y-full opacity-100' : 'pointer-events-none translate-y-[130%] opacity-0'} absolute bottom-0 right-0 z-[110] pt-2 transition-all duration-200 xl:pt-3`}
      >
        <div className="relative flex w-[350px] items-center gap-2 rounded-[6px] bg-white px-2 shadow-2xl lg:px-3 3xl:w-[400px]">
          <button
            onClick={() => {
              handleSearch('s', searchText);
              setIsOpen(false);
            }}
            className="relative size-5"
          >
            <NextImg src="/assets/icons/search_gray.svg" alt="search_gray" />
          </button>

          <input
            ref={inputRef}
            type="text"
            id="search"
            name="search"
            value={searchText}
            autoFocus={true}
            onChange={(e) => setSearchText(e.target.value)}
            className="flex-1 border-none bg-transparent bg-none py-2 text-base text-gray-950 outline-none placeholder:text-gray-500 lg:py-3"
            placeholder={trans('Tìm kiếm', 'Search')}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSearch('s', searchText);
                setIsOpen(false);
              }
            }}
          />

          <button
            onClick={() => {
              setSearchText('');
              inputRef.current?.focus();
            }}
            className={`${searchText === '' ? 'pointer-events-none opacity-0' : ''} flex size-7 items-center justify-center brightness-0`}
          >
            <div className="relative size-4">
              <NextImg src="/assets/icons/close.svg" alt="close icon" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
