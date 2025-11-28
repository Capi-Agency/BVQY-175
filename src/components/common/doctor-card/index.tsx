'use client';
import React, { JSX } from 'react';
import NextImg from '../next-img';
import { getAssetUrlById } from '@/src/utils/image';
import Link from 'next/link';
import useStoreLanguage from '@/src/store/store';

interface DoctorCardProps {
  item: any;
  type: 'blouse_no_logo' | 'blouse_logo' | 'uniform_logo';
}

const titleMap: Record<string, string> = {
  director: 'Giám đốc',
  deputy_director: 'Phó giám đốc',
  doctor: 'Bác sĩ điều trị',
};

export default function DoctorCard({
  item,
  type = 'blouse_logo',
}: DoctorCardProps) {
  const language = useStoreLanguage((state: any) => state.language);

  const hospitalTitle =
    titleMap[item?.hospital_title?.toLowerCase()] ?? item?.hospital_title;

  const renderImageByType: Record<DoctorCardProps['type'], JSX.Element> = {
    blouse_no_logo: (
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-[8px]">
        <NextImg
          src={getAssetUrlById(item?.avatar?.id || item?.avatar)}
          alt="Doctor image"
          objectFit="cover"
          className="z-[2]"
        />
      </div>
    ),
    blouse_logo: (
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-[8px] transition-colors duration-200 group-hover:bg-primary-600">
        <NextImg
          src={getAssetUrlById(item?.avatar?.id || item?.avatar)}
          alt="Doctor image"
          objectFit="cover"
          className="z-[2]"
        />
        <NextImg
          src="/assets/images/doctor_card_bg.png"
          alt="doctor card bg image"
          objectFit="cover"
          className="z-[1]"
        />
      </div>
    ),
    uniform_logo: (
      <div className="px-0 md:px-5 lg:px-10 xl:px-0">
        <div className="relative aspect-[2/3] w-full overflow-hidden bg-[#FAFAFA]">
          <NextImg
            src={getAssetUrlById(
              item?.uniform_avatar?.id || item?.uniform_avatar,
            )}
            alt="Doctor image"
            objectFit="cover"
            className="z-[2]"
          />
          <NextImg
            src="/assets/images/doctor_card_bg.png"
            alt="doctor card bg image"
            objectFit="cover"
            className="z-[1]"
          />
        </div>
      </div>
    ),
  };

  return (
    <Link
      href={`/${language}/doi-ngu-bac-si/${item?.slug}`}
      className="group block space-y-3 2xl:space-y-[14px] 3xl:space-y-4"
    >
      {renderImageByType[type]}

      <div className="text-center xl:space-y-[2px] 3xl:space-y-1">
        <div className="text-xs font-normal text-[#3F3F46] lg:text-sm 2xl:text-base">
          {item?.full_title}
        </div>

        <div className="text-nowrap text-base font-bold text-[#010502] lg:text-lg 2xl:text-xl 3xl:text-[22px] 4xl:text-2xl">
          {item?.full_name}
        </div>

        <div className="text-xs font-medium text-subTitle lg:text-sm 2xl:text-base">
          {type === 'blouse_logo' ? item?.specialty : hospitalTitle}
        </div>
      </div>
    </Link>
  );
}
