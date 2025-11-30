'use client';
import React, { JSX } from 'react';
import NextImg from '../next-img';
import { getAssetUrlById } from '@/src/utils/image';
import Link from 'next/link';
import useStoreLanguage from '@/src/store/store';
import { cn } from '@/src/lib/utils';

interface DoctorCardProps {
  item: any;
  isLogo?: boolean;
  isHover?: boolean;
  bgColor?: string;
  avatarType: 'avatar' | 'uniform_avatar';
  subTitle: 'specialty' | 'hospital_title' | 'department_title';
}

const hospitalTitleMap: Record<string, string> = {
  director: 'Giám đốc',
  deputy_director: 'Phó giám đốc',
  doctor: 'Bác sĩ điều trị',
};

const departmentTitleMap: Record<string, string> = {
  head_of_department: 'Chủ nhiệm Khoa',
  deputy_head_of_department: 'Phó Chủ nhiệm Khoa',
  head_nurse: 'Điều dưỡng trưởng',
};

export default function DoctorCard({
  item,
  isLogo = true,
  isHover = true,
  bgColor = 'bg-white',
  avatarType = 'avatar',
  subTitle = 'specialty',
}: DoctorCardProps) {
  const language = useStoreLanguage((state: any) => state.language);

  const renderSubTitleByType: Record<DoctorCardProps['subTitle'], JSX.Element> =
    {
      specialty: <>{item?.specialty}</>,
      hospital_title: (
        <>{hospitalTitleMap[item?.hospital_title] ?? item?.hospital_title}</>
      ),
      department_title: (
        <>
          {departmentTitleMap[item?.department_title] ?? item?.department_title}
        </>
      ),
    };

  const avatarId = item?.[avatarType]?.id ?? item?.[avatarType];

  return (
    <Link
      href={`/${language}/doi-ngu-bac-si/${item?.slug}`}
      className="group block space-y-3 2xl:space-y-[14px] 3xl:space-y-4"
    >
      <div
        className={cn(
          'relative aspect-[2/3] w-full overflow-hidden rounded-[8px]',
          bgColor,
          isHover &&
            'transition-colors duration-200 group-hover:bg-primary-600',
        )}
      >
        <NextImg
          src={getAssetUrlById(avatarId)}
          alt="Doctor image"
          objectFit="cover"
          className="z-[2]"
        />

        {isLogo && (
          <NextImg
            src="/assets/images/doctor_card_bg.png"
            alt="doctor card bg image"
            objectFit="cover"
            className="z-[1]"
          />
        )}
      </div>

      <div className="text-center xl:space-y-[2px] 3xl:space-y-1">
        <div className="text-xs font-normal text-[#3F3F46] lg:text-sm 2xl:text-base">
          {item?.full_title}
        </div>

        <div className="text-nowrap text-base font-bold text-[#010502] lg:text-lg 2xl:text-xl 3xl:text-[22px] 4xl:text-2xl">
          {item?.full_name}
        </div>

        <div className="text-xs font-medium text-subTitle lg:text-sm 2xl:text-base">
          {renderSubTitleByType[subTitle]}
        </div>
      </div>
    </Link>
  );
}
