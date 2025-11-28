import React from 'react';
import NextImg from '../next-img';
import { getAssetUrlById } from '@/src/utils/image';
import Link from 'next/link';
import useStoreLanguage from '@/src/store/store';

interface DoctorCardProps {
  item: any;
  type?: 'type_position' | 'type_specialty'; // thêm prop type
}

export default function DoctorCard({
  item,
  type = 'type_specialty',
}: DoctorCardProps) {
  const language = useStoreLanguage((state: any) => state.language);

  return (
    <Link
      href={`/${language}/doi-ngu-bac-si/${item?.slug}`}
      className="group block space-y-3 2xl:space-y-[14px] 3xl:space-y-4"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-[8px] transition-colors duration-200 group-hover:bg-primary-600">
        <NextImg
          src={getAssetUrlById(item?.avatar)}
          alt="Doctor image"
          objectFit="cover"
          className="z-[2]"
        />
        {type === 'type_specialty' && (
          <NextImg
            src="/assets/images/doctor_card_bg.png"
            alt="doctor card bg image"
            objectFit="cover"
            className="z-[1]"
          />
        )}
      </div>

      <div className="text-center xl:space-y-[2px] 3xl:space-y-1">
        <div className="text-xs font-normal text-[#3F3F46] xl:text-sm 3xl:text-base">
          {item?.full_title}
        </div>

        <div className="text-lg font-bold text-[#010502] xl:text-xl 3xl:text-[22px] 4xl:text-2xl">
          {item?.full_name}
        </div>

        <div className="text-xs font-medium text-subTitle xl:text-sm 3xl:text-base">
          {type === 'type_position' && <>{item?.position}</>}
          {type === 'type_specialty' && <>{item?.specialty}</>}
        </div>
      </div>
    </Link>
  );
}
