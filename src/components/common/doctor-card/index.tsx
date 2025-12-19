'use client';
import React, { JSX } from 'react';
import NextImg from '../next-img';
import { getAssetUrlById } from '@/src/utils/image';
import Link from 'next/link';
import useStoreLanguage from '@/src/store/store';
import { cn } from '@/src/lib/utils';

export interface DoctorCardProps {
  item: any;
  url: string;
  isLogo?: boolean;
  isHover?: boolean;
  bgColor?: string;
  type?: 'default' | 'search';
  avatarType: 'avatar' | 'uniform_avatar';
  subTitle:
  | 'specialty'
  | 'hospital_title'
  | 'department_title'
  | 'institute_title'
  | 'admin_department_title'
  | 'unit_title'
  | string;
  avatarRatio?: '2/3' | '5/6' | '3/4' | string;
  avatarOrigin?: 'center' | 'top' | 'left' | 'right' | 'bottom';
  isRounded?: boolean;
  isLink?: boolean;
}

const hospitalTitleMap: Record<string, string> = {
  director: 'Giám đốc',
  deputy_director: 'Phó giám đốc',
  doctor: 'Bác sĩ điều trị',
};

const instituteTitleMap: Record<string, string> = {
  director: 'Giám đốc Viện',
  deputy_director: 'Phó giám đốc Viện',
  center_director: 'Giám đốc Trung tâm',
  deputy_center_director: 'Phó giám đốc Trung tâm',
  head_of_institute: "Viện trưởng",
  deputy_head_of_institute: "Phó viện trưởng"
};

const departmentTitleMap: Record<string, string> = {
  head_of_department: 'Chủ nhiệm Khoa',
  deputy_head_of_department: 'Phó Chủ nhiệm Khoa',
  acting_head_of_department: 'Phụ trách Chủ nhiệm Khoa',
  acting_deputy_head_of_department: 'Phụ trách Phó Chủ nhiệm Khoa',
  head_nurse: 'Điều dưỡng trưởng',
};

const adminDepartmentTitleMap: Record<string, string> = {
  head_of_department: 'Trưởng phòng',
  deputy_head_of_department: 'Phó phòng',
  acting_head_of_department: 'Phụ trách Trưởng phòng',
  acting_department: 'Phụ trách Phòng',
  head_of_division: 'Trưởng ban',
  deputy_head_of_division: 'Phó ban',
};

export default function DoctorCard({
  item,
  url = '/doi-ngu-bac-si',
  isLogo = true,
  isHover = true,
  bgColor = '#fff',
  type = 'default',
  avatarType = 'avatar',
  subTitle = 'specialty',
  avatarRatio = '2/3',
  avatarOrigin = 'center',
  isRounded = true,
  isLink = true,
}: DoctorCardProps) {
  const language = useStoreLanguage((state: any) => state.language);
  const renderSubTitleByType: Record<DoctorCardProps['subTitle'], JSX.Element> =
  {
    specialty: <>{item?.specialty}</>,
    hospital_title: (
      <>{hospitalTitleMap[item?.hospital_title] ?? item?.hospital_title}</>
    ),
    institute_title: (
      <>{instituteTitleMap[item?.institute_title] ?? item?.institute_title}</>
    ),
    department_title: (
      <>
        {departmentTitleMap[item?.department_title] ?? item?.department_title}
      </>
    ),
    admin_department_title: (
      <>
        {adminDepartmentTitleMap[item?.admin_department_title] ??
          item?.admin_department_title}
      </>
    ),
    unit_title: (
      <>{adminDepartmentTitleMap[item?.unit_title] ?? item?.unit_title}</>
    ),
  };

  const avatarId = item?.[avatarType]?.id ?? item?.[avatarType];

  const renderDefault = () => {
    const cardContent = (
      <>
        <div
          className={cn(
            'relative w-full overflow-hidden',
            isRounded && 'rounded-[8px]',
            isHover &&
            'transition-colors duration-200 group-hover:!bg-primary-600',
          )}
          style={{
            aspectRatio: avatarRatio,
            backgroundColor: bgColor
          }}
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
              className="z-[1] origin-center"
            />
          )}
        </div>

        <div className="text-center xl:space-y-[2px] 3xl:space-y-1">
          <div className="text-xs font-normal text-[#3F3F46] md:text-sm 2xl:text-base">
            {item?.full_title}
          </div>

          <div className="text-nowrap text-base font-bold text-[#010502] md:text-lg 2xl:text-xl 3xl:text-[22px] 4xl:text-2xl">
            {item?.full_name}
          </div>

          <div className="text-xs font-medium text-subTitle md:text-sm 2xl:text-base">
            {renderSubTitleByType[subTitle]}
          </div>
        </div>
      </>
    );

    if (isLink) {
      return (
        <Link
          href={`/${language}${url}/${item?.slug}`}
          aria-label="Xem chi tiết bác sĩ"
          className="group block space-y-3 2xl:space-y-[14px] 3xl:space-y-4"
        >
          {cardContent}
        </Link>
      );
    }
    return (
      <div className="group block space-y-3 2xl:space-y-[14px] 3xl:space-y-4">
        {cardContent}
      </div>
    );
  };

  const renderSearch = () => {
    const cardContent = (
      <div className="xl:space-y-[2px] 3xl:space-y-1">
        <div className="text-sm font-normal text-[#3F3F46] xl:text-base">
          {item?.full_title}
        </div>

        <div className="text-nowrap text-lg font-bold text-[#010502] underline underline-offset-2 lg:text-lg xl:text-xl 3xl:text-[22px] 4xl:text-2xl">
          {item?.full_name}
        </div>

        <div className="pt-[2px] text-sm font-medium text-subTitle xl:text-base">
          {renderSubTitleByType[subTitle]}
        </div>
      </div>
    );
    if (isLink) {
      return (
        <Link
          href={`/${language}${url}/${item?.slug}`}
          aria-label="Xem chi tiết bác sĩ"
          className="group block"
        >
          {cardContent}
        </Link>
      );
    }
    return <div className="group block">{cardContent}</div>;
  };

  switch (type) {
    case 'search':
      return renderSearch();
    default:
      return renderDefault();
  }
}

export {
  hospitalTitleMap,
  instituteTitleMap,
  departmentTitleMap,
  adminDepartmentTitleMap,
};
