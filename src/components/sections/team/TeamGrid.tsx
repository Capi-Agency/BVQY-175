import { CommonSection } from '@/src/types/pageBuilder';
import React, { useState } from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
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
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="*:transition-all *:duration-300">
      <div
        className={clsx(
          'relative z-10 flex flex-col items-stretch justify-between rounded-[6px] bg-primary-50 lg:rounded-xl 2xl:rounded-[20px] 3xl:rounded-[24px] 4xl:gap-6',
          directionLTR ? 'md:flex-row' : 'md:flex-row-reverse',
          expanded ? 'bg-primary-600' : 'bg-primary-50',
        )}
      >
        {/* Text */}
        <div className="space-y-3 p-6 md:w-[calc(302px+80px)] lg:w-[calc(464px+80px)] lg:p-10 xl:w-[calc(464px+104px)] xl:space-y-4 xl:p-[52px] 2xl:w-[calc(480px+64px*2)] 2xl:space-y-5 2xl:p-16 3xl:space-y-6 3xl:p-20 4xl:w-[calc(680px+160px)]">
          {/* Year */}
          <div
            className={clsx(
              'flex items-center gap-1.5',
              expanded ? 'text-[#F0FDF4]' : 'text-primary-600',
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M15.5303 8.00641L12.0293 2.01277C12.0255 2.00616 12.0159 2.00616 12.012 2.01277L8.50252 8.00641L2.02321 9.63266C2.01583 9.63451 2.01313 9.64358 2.01829 9.64916L6.50648 14.5009L4.8213 21.9956C4.81952 22.0035 4.8274 22.0101 4.8349 22.007L12.0221 19.0318L19.1924 22.007C19.1999 22.0101 19.2078 22.0035 19.206 21.9956L17.524 14.4897L22.0129 9.65571C22.0181 9.65014 22.0154 9.64106 22.0081 9.6392L15.5303 8.00641Z"
                fill="currentColor"
              />
            </svg>
            <div
              className={clsx(
                'text-xl font-bold lg:text-[22px] xl:text-2xl 2xl:text-[28px] 4xl:text-[32px]',
              )}
            >
              2025
            </div>
          </div>

          {/* title & name */}
          <div>
            <div
              className={clsx(
                'text-sm font-normal lg:text-base 2xl:text-lg 3xl:text-lg 4xl:text-xl',
                expanded ? 'text-[#E4E4E7]' : 'text-gray-700',
              )}
            >
              Thiếu tướng, TS. TTND
            </div>
            <div
              className={clsx(
                'text-[24px] font-bold leading-[1.25] lg:text-[28px] xl:text-[32px] 3xl:text-[40px]',
                expanded ? 'text-primary-50' : 'text-primary-1000',
              )}
            >
              Trần Quốc Việt
            </div>
            <div
              className={clsx(
                'text-sm font-medium lg:text-base 2xl:text-lg 4xl:text-xl',
                expanded ? 'text-primary-100' : 'text-primary-500',
              )}
            >
              Giám đốc Bệnh viện (2022 - đến nay)
            </div>
          </div>

          {/* blurb */}
          <p
            className={clsx(
              'text-xs font-normal !leading-normal lg:text-sm xl:text-base 3xl:text-lg 4xl:text-xl',
              expanded ? 'text-primary-300' : 'text-gray-700',
            )}
          >
            Dưới sự lãnh đạo của Thiếu tướng, TS. TTND Trần Quốc Việt, Bệnh viện
            đã đạt được nhiều thành tựu nổi bật trong công tác khám chữa bệnh,
            nâng cao chất lượng dịch vụ y tế và phát triển đội ngũ cán bộ. Ông
            chú trọng ứng dụng khoa học – công nghệ hiện đại vào điều trị, đồng
            thời đẩy mạnh hợp tác trong và ngoài nước, góp phần khẳng định uy
            tín và vị thế của bệnh viện trong ngành y tế.
          </p>

          {/* see more */}
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className={clsx(
              'flex items-center gap-1 text-base font-bold',
              expanded ? 'text-primary-50' : 'text-[#092E15]',
            )}
          >
            {expanded ? 'Rút gọn' : 'Xem thêm'}
            <DownArrowIcon
              className={clsx('', expanded ? 'rotate-180' : 'rotate-0')}
            />
          </button>
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

      {/* Info panel - (TODO) chưa responsive theo design */}
      <div
        className={clsx(
          'overflow-hidden transition-all duration-500 ease-in-out',
          expanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <div className="relative z-0 -mt-6 space-y-10 overflow-hidden rounded-b-[6px] bg-primary-50 p-[60px_24px_40px_24px] lg:rounded-b-xl lg:p-[80px_40px_60px_40px] 2xl:rounded-b-[20px] 3xl:rounded-b-[24px] 3xl:p-[100px_40px_60px_40px]">
          {/* Hoc van qua trinh cong tac */}
          <div className="flex gap-3 3xl:gap-6">
            <div className="relative size-8 lg:size-10 3xl:size-12">
              <NextImg
                src="/assets/icons/brief.svg"
                alt="brief"
                objectFit="cover"
              />
            </div>
            <div className="flex-1 space-y-4 lg:space-y-6 4xl:space-y-8">
              <h3 className="text-lg font-medium !leading-[1.3] text-primary-950 md:text-xl lg:text-[22px] xl:text-2xl 2xl:text-[28px] 3xl:text-[30px] 4xl:text-[32px]">
                Học vấn & Quá trình công tác
              </h3>
              <div className="text-sm text-gray-700 lg:text-base 3xl:pr-[72px] 3xl:text-lg">
                <p>
                  Ông có học hàm/học vị Tiến sĩ (TS.), chuyên ngành y học — tuy
                  nhiên không tìm được nơi và năm cấp bằng rõ ràng.
                </p>
                <br />
                <p>
                  Trong quá trình công tác, dưới sự lãnh đạo của ông, bệnh viện
                  đã: Thực hiện thành công 22 ca ghép thận chỉ trong khoảng một
                  năm kể từ khi ca ghép thận đầu tiên vào tháng 7/2023. Thực
                  hiện thành công ca lấy và ghép đa tạng từ người hiến chết não
                  đầu tiên.
                </p>
                <p>
                  Tổ chức và triển khai chương trình chuyển giao kỹ thuật lấy,
                  ghép tạng giữa Bệnh viện Trung ương Quân đội 108 và Bệnh viện
                  Quân y 175, bao gồm đào tạo chuyên môn cho đội ngũ bác sĩ, kỹ
                  thuật viên.
                </p>
                <p>
                  Chủ trì việc thành lập Trung tâm Huấn luyện cấp cứu chấn
                  thương quốc tế (ITLS) đầu tiên tại Việt Nam trực thuộc BV Quân
                  y 175.
                </p>
              </div>
            </div>
          </div>

          {/* Hinh anh */}
          <div className="flex gap-6 overflow-visible">
            <div className="relative size-8 shrink-0 lg:size-10 3xl:size-12">
              <NextImg
                src="/assets/icons/image.svg"
                alt="image"
                objectFit="cover"
              />
            </div>
            <div className="max-w-full space-y-4 lg:space-y-6 4xl:space-y-8">
              <h3 className="text-lg font-medium !leading-[1.3] text-primary-950 md:text-xl lg:text-[22px] xl:text-2xl 2xl:text-[28px] 3xl:text-[30px] 4xl:text-[32px]">
                Hình ảnh hoạt động
              </h3>
              <Swiper
                touchEventsTarget="container"
                grabCursor={true}
                slidesPerView={3.1}
                loop={false}
                spaceBetween={24}
                speed={700}
                breakpoints={{
                  320: {
                    slidesPerView: 1.2,
                  },
                  768: {
                    slidesPerView: 2.1,
                  },
                  1024: {
                    slidesPerView: 3.1,
                  },
                }}
              >
                {Array(5)
                  .fill(null)
                  .map((_, index: number) => (
                    <SwiperSlide key={index}>
                      <div className="relative aspect-[4/3] overflow-hidden rounded-[6px]">
                        <NextImg
                          src="/assets/images/demo-image.png"
                          alt="demo image"
                          objectFit="cover"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </div>

          {/* Giải thưởng & Danh hiệu */}
          <div className="flex gap-6">
            <div className="relative size-8 lg:size-10 3xl:size-12">
              <NextImg
                src="/assets/icons/medal.svg"
                alt="medal"
                objectFit="cover"
              />
            </div>
            <div className="flex-1 space-y-4 lg:space-y-6 4xl:space-y-8">
              <h3 className="text-lg font-medium !leading-[1.3] text-primary-950 md:text-xl lg:text-[22px] xl:text-2xl 2xl:text-[28px] 3xl:text-[30px] 4xl:text-[32px]">
                Học vấn & Quá trình công tác
              </h3>
              <ul className="list-inside list-disc text-sm text-gray-700 lg:text-base 3xl:pr-[72px] 3xl:text-lg">
                <li> Thầy thuốc Ưu tú </li>
                <li> Thầy thuốc Nhân dân</li>
                <li> Thầy thuốc Ưu tú </li>
                <li>Thầy thuốc Nhân dân</li>
                <li> Thầy thuốc Ưu tú</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DownArrowIcon = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="8"
    viewBox="0 0 14 8"
    fill="none"
    className={className}
  >
    <path
      d="M0.530273 0.530321L6.53032 6.53027L12.5303 0.530273"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeMiterlimit="16"
    />
  </svg>
);
