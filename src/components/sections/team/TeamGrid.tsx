import { CommonSection } from '@/src/types/pageBuilder';
import React from 'react';
import DoctorCard from '../../common/doctor-card';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import NextImg from '../../common/next-img';
import clsx from 'clsx';
import { getAssetUrlById } from '@/src/utils/image';

const TeamGrid = ({ data }: CommonSection) => {
  return (
    <div className="container py-10 md:py-6 lg:py-10 xl:py-[60px] 2xl:py-[80px] 3xl:py-[100px]">
      <h2 className="section-title mb-4 uppercase text-primary-600">
        {data?.title}
      </h2>
      <div
        className="section-content mb-20"
        dangerouslySetInnerHTML={{
          __html: data?.blurb,
        }}
      ></div>
      <div className="space-y-20 lg:space-y-[100px] xl:space-y-[120px] 2xl:space-y-[140px] 3xl:space-y-40">
        <div></div>
        {data?.items.map((item: any, index: number) => (
          <LeaderCard
            key={'card_' + index}
            item={item}
            directionLTR={index % 2 === 0}
          />
        ))}
      </div>
    </div>
  );
};

export default TeamGrid;

const LeaderCard = ({
  directionLTR,
  item,
}: {
  directionLTR: boolean;
  item: any;
}) => (
  <div
    className={clsx(
      'flex flex-col items-stretch justify-between rounded-[6px] bg-primary-50 lg:rounded-xl 2xl:rounded-[20px] 3xl:rounded-[24px] 4xl:gap-6',
      directionLTR ? 'md:flex-row' : 'md:flex-row-reverse',
    )}
  >
    {/* Text */}
    <div className="space-y-3 p-6 md:w-[calc(302px+80px)] lg:w-[calc(464px+80px)] lg:p-10 xl:w-[calc(464px+104px)] xl:space-y-4 xl:p-[52px] 2xl:w-[calc(480px+64px*2)] 2xl:space-y-5 2xl:p-16 3xl:space-y-6 3xl:p-20 4xl:w-[calc(680px+160px)]">
      {/* Year */}
      <div className="flex items-center gap-1.5">
        <div className="relative size-6">
          <NextImg src="/assets/icons/star.svg" alt="star" objectFit="cover" />
        </div>
        <div className="text-xl font-bold text-primary-600 lg:text-[22px] xl:text-2xl 2xl:text-[28px] 4xl:text-[32px]">
          2025
        </div>
      </div>

      {/* title & name */}
      <div>
        <div className="text-sm font-normal text-gray-700 lg:text-base 2xl:text-lg 3xl:text-lg 4xl:text-xl">
          Thiếu tướng, TS. TTND
        </div>
        <div className="text-[24px] font-bold leading-[1.25] text-primary-1000 lg:text-[28px] xl:text-[32px] 3xl:text-[40px]">
          Trần Quốc Việt
        </div>
        <div className="text-sm font-medium text-primary-500 lg:text-base 2xl:text-lg 4xl:text-xl">
          Giám đốc Bệnh viện (2022 - đến nay)
        </div>
      </div>

      {/* blurb */}
      <p className="text-xs font-normal text-gray-700 lg:text-sm xl:text-base 3xl:text-lg 4xl:text-xl">
        Dưới sự lãnh đạo của Thiếu tướng, TS. TTND Trần Quốc Việt, Bệnh viện đã
        đạt được nhiều thành tựu nổi bật trong công tác khám chữa bệnh, nâng cao
        chất lượng dịch vụ y tế và phát triển đội ngũ cán bộ. Ông chú trọng ứng
        dụng khoa học – công nghệ hiện đại vào điều trị, đồng thời đẩy mạnh hợp
        tác trong và ngoài nước, góp phần khẳng định uy tín và vị thế của bệnh
        viện trong ngành y tế.
      </p>
    </div>

    {/* Avatar */}
    <div className="relative shrink-0 md:max-h-[380px] lg:max-h-[386px] xl:max-h-[440px] 2xl:max-h-[524px] 3xl:max-h-[574px] 4xl:max-h-[610px]">
      {/* Translate Y đoạn bằng h ảnh - h của div */}
      <div className="relative z-20 aspect-[4/5] max-w-full md:w-[338px] md:-translate-y-[calc(422px-380px)] lg:w-[365px] lg:-translate-y-[calc(456px-386px)] xl:w-[416px] xl:-translate-y-[calc(520px-440px)] 2xl:w-[506px] 2xl:-translate-y-[108px] 3xl:w-[536px] 3xl:-translate-y-[96px] 4xl:w-[576px] 4xl:-translate-y-[calc(720px-610px)]">
        <NextImg src={getAssetUrlById(item?.cover?.id)} alt="doctor" />
      </div>

      {/* trademark */}
      <img
        src="/assets/images/logo-short-form.png"
        alt="logo short form"
        className={clsx(
          'absolute top-6 z-10 aspect-[5/4] w-20 xl:w-[120px] 2xl:w-[180px]',
          directionLTR ? 'right-6' : 'left-6',
        )}
      />
    </div>
  </div>
);
