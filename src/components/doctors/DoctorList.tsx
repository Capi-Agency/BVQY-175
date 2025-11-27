'use client';
import NextImg from '@/src/components/common/next-img';
import { getAssetUrlById } from '@/src/utils/image';
import clsx from 'clsx';
import Link from 'next/link';
import React, { useState } from 'react';

type Props = {
  data: any;
};

const DoctorList = ({ data }: Props) => {
  const [searchText, setSearchText] = useState('');
  const [debouncedText, setDebouncedText] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('');
  const [searchMethod, setSearchMethod] = useState<
    'by_name' | 'by_department' | null
  >(null);

  return (
    <div className="bg-primary-50">
      {/* Breadcrumb */}

      {/* Banner + Search box */}
      <div className="md:relative">
        <div
          className="flex h-full flex-col items-center gap-1 py-40 text-center md:py-[100px] lg:gap-2 lg:py-[120px] 2xl:gap-4 2xl:py-[140px] 3xl:py-40"
          style={{
            background: ` linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%), url("${getAssetUrlById(data?.cover.id)}") lightgray 50% / cover no-repeat`,
          }}
        >
          {/* title */}
          <h1 className="text-[28px] font-bold text-white md:text-[40px] lg:text-[44px] 2xl:text-[48px] 3xl:text-[60px] 4xl:text-[72px]">
            {data?.title}
          </h1>
          {/* subtitle */}
          <p className="text-base font-normal text-gray-200 md:text-lg lg:text-xl">
            {data?.subtitle}
          </p>
        </div>

        {/* Search form */}
        <div className="mx-auto w-full max-w-[320px] -translate-y-1/2 bg-transparent md:bottom-0 md:max-w-[600px] md:px-0 md:py-0 lg:max-w-[800px] xl:max-w-[1000px]">
          <form
            className="flex items-center justify-between rounded-[6px] bg-white px-3 py-2 shadow-md 3xl:p-6"
            onSubmit={(e: any) => {
              e.preventDefault();
            }}
          >
            <div className="flex flex-1 flex-col text-start">
              <label
                htmlFor="searchText"
                className="text-sm font-normal text-gray-500"
              >
                Tìm kiếm bác sĩ
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Nhập tên, chuyên khoa"
                className="text-base font-normal placeholder:text-[#0F2F64] focus:border-none focus:outline-none md:text-lg"
              />
            </div>
            <button
              type="submit"
              className="flex size-10 items-center justify-center rounded-[4px] bg-primary-600 p-3 text-white md:size-auto md:gap-4 3xl:px-8 3xl:py-4"
            >
              <span className="hidden md:block">Tìm kiếm</span>
              <img
                src="/assets/icons/arrow_right_white.svg"
                alt="arrow right"
              />
            </button>
          </form>
        </div>
      </div>

      {/* Danh sách bác sĩ */}
      <div className="container space-y-8 pb-20 lg:pb-16 xl:pb-[72px] 2xl:pb-20 3xl:pb-[100px] 4xl:pb-[120px]">
        {/* Nút chuyển tabs */}
        <div className="flex flex-col gap-4 md:flex-row">
          {/* Tim theo ten */}
          <div
            className={clsx(
              'flex w-full flex-col justify-center px-5 py-4 shadow-lg md:flex-1 xl:h-40',
              searchMethod === 'by_name'
                ? 'bg-primary-600 *:!text-gray-50'
                : 'bg-white',
            )}
            onClick={() => setSearchMethod('by_name')}
          >
            <div className="mb-2 flex items-center gap-2.5 text-lg font-semibold text-gray-500">
              {/* icon */}
              <div className="flex items-center justify-center rounded-[6px] bg-primary-50 p-2">
                <img
                  src={'/assets/icons/search_by_name.svg'}
                  alt="search by name"
                  className="size-5"
                />
              </div>
              Tìm theo Tên
            </div>
            <p className="text-sm font-medium text-gray-500">
              Tìm nhanh bác sĩ theo tên
            </p>
          </div>

          {/* Tim theo khoa */}
          <div
            className={clsx(
              'flex w-full flex-col justify-center px-5 py-4 shadow-lg md:flex-1 xl:h-40',
              searchMethod === 'by_department'
                ? 'bg-primary-600 *:!text-gray-50'
                : 'bg-white',
            )}
            onClick={() => setSearchMethod('by_department')}
          >
            <div className="mb-2 flex items-center gap-2.5 text-lg font-semibold text-gray-500">
              {/* icon */}
              <div className="flex items-center justify-center rounded-[6px] bg-primary-50 p-2">
                <img
                  src={'/assets/icons/search_by_department.svg'}
                  alt="search by department"
                  className="size-5"
                />
              </div>
              Tìm theo Chuyên khoa
            </div>
            <p className="text-sm font-medium text-gray-500">
              Tìm bác sĩ theo đúng chuyên khoa
            </p>
          </div>
        </div>

        <div className="bg-white p-6">
          {/* Bàn phím */}
          {searchMethod === 'by_name' ? (
            <div className="space-y-6 py-6">
              <h3 className="text-center text-base font-semibold text-black">
                Tìm kiếm bác sĩ theo tên
              </h3>
              <div className="flex flex-wrap justify-center gap-6">
                {letters.map((letter: string, index: number) => {
                  return (
                    <div
                      className={clsx(
                        'flex size-10 items-center justify-center rounded-xl text-xl font-semibold',
                        selectedLetter === letter
                          ? 'bg-primary-600 text-primary-50'
                          : 'text-gray-500',
                      )}
                      key={index}
                      onClick={() => setSelectedLetter(letter)}
                    >
                      {letter}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}

          {/* Hiển thị kết quả */}
          <div className="flex flex-col gap-3">
            <div className="text-base font-medium text-gray-700">
              <span className="text-xl font-semibold text-primary-600">6 </span>
              kết quả phù hợp với tìm kiếm{' '}
              <span className="font-semibold text-primary-600">“Minh”</span>
            </div>
            <div className="flex items-center justify-end gap-1.5 font-medium text-[#ED5252]">
              Xóa bộ lọc
              <img src="/assets/icons/close_red.svg" alt="close_red" />
            </div>
          </div>

          {/* Danh sách */}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            {Array(6)
              .fill(null)
              .map((_, index: number) => (
                <div
                  key={index}
                  className="flex flex-col gap-5 rounded-2xl bg-white p-5 shadow-lg md:flex-row"
                >
                  <div className="relative h-[240px] w-full overflow-hidden rounded-[10px] md:max-w-[192px]">
                    <NextImg
                      src="/assets/images/tran_quoc_viet_cover.png"
                      alt="cover"
                      objectFit="cover"
                      className="object-top"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-center md:px-5">
                    <div className="text-sm font-normal text-gray-500">
                      Đại tá, PGS. TS, TTƯT
                    </div>
                    <div className="text-xl font-bold text-primary-1000">
                      Nguyễn Văn Minh
                    </div>
                    <div className="mb-6 text-base font-medium text-primary-500">
                      Giám đốc Bệnh viện
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5">
                        <img
                          src="/assets/icons/first_aid_black.svg"
                          alt="first aid"
                          className="size-5"
                        />
                        <p className="gray-700 text-base font-normal">
                          Hồi sức - Cấp cứu
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <img
                          src="/assets/icons/first_aid_black.svg"
                          alt="first aid"
                          className="size-5"
                        />
                        <p className="gray-700 text-base font-normal">
                          Khoa hồi sức tích cực ngoại (A12.2)
                        </p>
                      </div>
                    </div>

                    <Link
                      href={'#'}
                      className="mt-6 flex items-center gap-2 font-medium text-gray-950 group-hover:text-primary-50 3xl:text-lg"
                    >
                      Xem chi tiết
                      <img
                        src="/assets/icons/arrow_right_black.svg"
                        alt="arrow right"
                        className="size-6 group-hover:brightness-0 group-hover:invert"
                      />
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorList;

const letters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'G',
  'H',
  'I',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'X',
  'Y',
];
