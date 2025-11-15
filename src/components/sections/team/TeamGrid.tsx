import { CommonSection } from '@/src/types/pageBuilder';
import React, { useState } from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import NextImg from '../../common/next-img';
import clsx from 'clsx';
import { getAssetUrlById } from '@/src/utils/image';
import { useTranslate } from '@/src/hooks/useTranslate';

const TeamGrid = ({ data }: CommonSection) => {
  return (
    <div>
      <div className="relative h-[340px] w-full overflow-hidden md:hidden">
        <NextImg
          src={getAssetUrlById(data?.cover?.[0]?.id)}
          objectFit="cover"
          alt="banner image"
        />
      </div>
      <div className="relative hidden h-[174px] w-full overflow-hidden md:block lg:h-[232px] xl:h-[290px] 2xl:h-[326px] 3xl:h-[364px] 4xl:h-[436px]">
        <NextImg
          src={getAssetUrlById(data?.cover?.[1]?.id)}
          objectFit="cover"
          alt="banner image"
        />
      </div>

      <div className="py-10 md:container md:py-6 lg:py-10 xl:py-[60px] 2xl:py-[80px] 3xl:py-[100px]">
        <h2
          className="section-title px-6 uppercase text-primary-600 md:px-0"
          dangerouslySetInnerHTML={{
            __html: data?.title,
          }}
        ></h2>

        <div
          className="section-content px-6 pt-4 text-justify md:px-0 lg:pt-5 2xl:pt-6"
          dangerouslySetInnerHTML={{
            __html: data?.blurb,
          }}
        ></div>

        <div className="hidden space-y-20 pt-10 md:block md:pt-[80px] lg:space-y-[100px] lg:pt-[100px] xl:space-y-[120px] xl:pt-[120px] 2xl:space-y-[140px] 2xl:pt-[140px] 3xl:space-y-[160px] 3xl:pt-[160px]">
          {data?.items.map((item: any, index: number) => (
            <LeaderCard
              key={'card_' + index}
              item={item}
              directionLTR={index % 2 === 0}
              data={data}
            />
          ))}
        </div>

        <div className="relative w-full md:hidden pt-10">
          <Swiper
            touchEventsTarget="container"
            grabCursor={true}
            slidesPerView={1.1}
            loop={false}
            spaceBetween={16}
            speed={500}
            className="!px-6 !w-full"
          >
            {data?.items.map((item: any, index: number) => (
              <SwiperSlide key={'card_' + index}>
                <LeaderCard
                  item={item}
                  directionLTR={index % 2 === 0}
                  data={data}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default TeamGrid;

const LeaderCard = ({
  directionLTR,
  item,
  data,
}: {
  directionLTR: boolean;
  item: any;
  data: any;
}) => {
  const { trans } = useTranslate();
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="relative rounded-[6px] bg-primary-50 lg:rounded-xl 2xl:rounded-[20px] 3xl:rounded-[24px]">
      <div
        onClick={() => setExpanded((prev) => !prev)}
        className={clsx(
          'relative z-[1] flex cursor-pointer flex-col rounded-[6px] p-4 duration-200 md:p-6 lg:rounded-[16px] lg:p-10 xl:p-[52px] 2xl:rounded-[20px] 2xl:p-16 3xl:p-[72px] 4xl:rounded-[24px] 4xl:p-20',
          directionLTR ? 'md:flex-row' : 'md:flex-row-reverse',
          expanded ? 'bg-primary-600' : 'bg-primary-50',
        )}
      >
        {/* Text */}
        <div className="space-y-3 md:basis-1/2 xl:space-y-4 2xl:space-y-5 3xl:space-y-6">
          {/* Year */}
          <div className="flex items-center gap-1 xl:gap-2">
            <div
              className={clsx(
                'relative size-6 transition-all duration-200',
                expanded ? 'brightness-0 invert' : 'rotate-0',
              )}
            >
              <NextImg src="/assets/icons/primary_star.svg" alt="star icon" />
            </div>
            <div
              className={clsx(
                'text-xl font-bold duration-200 lg:text-[22px] xl:text-2xl 2xl:text-[28px] 3xl:text-[30px] 4xl:text-[32px]',
                expanded ? 'text-[#F0FDF4]' : 'text-primary-600',
              )}
            >
              {item?.subtitle}
            </div>
          </div>

          {/* title & name */}
          <div className="space-y-[2px] lg:space-y-1">
            {item?.title?.type === 'list' && (
              <>
                <div
                  className={clsx(
                    'text-sm font-normal duration-200 lg:text-base 2xl:text-lg 4xl:text-xl',
                    expanded ? 'text-[#E4E4E7]' : 'text-gray-700',
                  )}
                >
                  {item?.title?.contents?.[0]}
                </div>

                <div
                  className={clsx(
                    'text-2xl font-bold leading-[1.3] duration-200 lg:text-[28px] xl:text-[30px] 2xl:text-[32px] 3xl:text-[36px] 4xl:text-[40px]',
                    expanded ? 'text-primary-50' : 'text-primary-1000',
                  )}
                >
                  {item?.title?.contents?.[1]}
                </div>
                <div
                  className={clsx(
                    'text-sm font-medium duration-200 lg:text-base 2xl:text-lg 4xl:text-xl',
                    expanded ? 'text-primary-100' : 'text-primary-500',
                  )}
                >
                  {item?.title?.contents?.[2]}
                </div>
              </>
            )}
          </div>

          {/* blurb */}
          <div
            className={clsx(
              'text-justify text-sm font-normal !leading-normal duration-200 md:text-xs lg:text-sm xl:text-base 3xl:text-lg 4xl:text-xl',
              expanded ? 'text-primary-300' : 'text-gray-700',
            )}
            dangerouslySetInnerHTML={{
              __html: item?.blurb,
            }}
          ></div>

          {/* Avatar */}
          <div
            className={clsx(
              'relative bottom-0 mx-auto aspect-[4/5] w-[288px] md:absolute md:mx-0 md:w-[336px] lg:w-[366px] xl:w-[416px] 2xl:w-[506px] 3xl:w-[556px] 4xl:w-[576px]',
              directionLTR ? 'right-0' : 'left-0',
            )}
          >
            <NextImg
              src={getAssetUrlById(item?.cover?.[0]?.id)}
              objectFit="cover"
              alt="doctor"
            />
          </div>

          <img
            src="/assets/images/logo-short-form.png"
            alt="logo short form"
            className={clsx(
              'absolute top-6 z-10 aspect-[5/4] w-20 xl:w-[120px] 2xl:w-[203px]',
              directionLTR ? 'right-6' : 'left-6',
            )}
          />

          {/* see more */}
          <div
            className={clsx(
              'flex items-center gap-1 text-base font-bold duration-200',
              expanded ? 'text-primary-50' : 'text-[#092E15]',
            )}
          >
            {expanded ? data?.buttons?.[1]?.title : data?.buttons?.[0]?.title}
            <div
              className={clsx(
                'relative size-5 transition-all duration-200 xl:size-6',
                expanded ? '-rotate-180 invert' : 'rotate-0',
              )}
            >
              <NextImg
                src={getAssetUrlById(data?.buttons?.[0]?.icon?.id)}
                alt="star icon"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Info panel - (TODO) chưa responsive theo design */}
      <div
        className={clsx(
          'overflow-hidden transition-all duration-500 ease-out',
          expanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <div className="2xl:space-8 relative z-0 space-y-6 overflow-hidden rounded-b-[6px] bg-primary-50 p-4 md:p-[32px_16px] lg:rounded-b-xl lg:p-6 xl:space-y-7 xl:p-[40px_32px] 2xl:rounded-b-[20px] 2xl:p-[48px_32px] 3xl:space-y-9 3xl:rounded-b-[24px] 3xl:p-[52px_32px] 4xl:space-y-10 4xl:p-[60px_40px]">
          {item?.content?.contents?.[0] && (
            <div className="space-y-2">
              <div className="flex items-start gap-2 md:gap-3 lg:gap-4 3xl:gap-6 4xl:gap-6">
                <div className="relative size-6 md:size-7 lg:size-8 xl:size-9 2xl:size-10 3xl:size-11 4xl:size-12">
                  <NextImg
                    src="/assets/icons/brief.svg"
                    alt="brief"
                    objectFit="cover"
                  />
                </div>
                <div className="flex-1 space-y-3 lg:space-y-4 2xl:space-y-5 3xl:space-y-6 4xl:space-y-8">
                  <h3 className="text-lg font-bold !leading-[1.3] text-primary-950 md:text-xl lg:text-[22px] xl:text-2xl 2xl:text-[28px] 3xl:text-[30px] 4xl:text-[32px]">
                    {trans('doctor-education-label')}
                  </h3>
                  <div
                    className="hidden text-sm font-normal text-gray-700 md:block lg:text-base 4xl:text-lg [&>ul]:list-inside [&>ul]:list-disc"
                    dangerouslySetInnerHTML={{
                      __html: item?.content?.contents?.[0],
                    }}
                  ></div>
                </div>
              </div>

              <div
                className="text-sm font-normal text-gray-700 md:hidden lg:text-base 4xl:text-lg [&>ul]:list-inside [&>ul]:list-disc"
                dangerouslySetInnerHTML={{
                  __html: item?.content?.contents?.[0],
                }}
              ></div>
            </div>
          )}

          {item?.cover?.length > 1 && (
            <div className="space-y-2 md:space-y-3 lg:space-y-4 2xl:space-y-5 3xl:space-y-6">
              <div className="flex items-start gap-2 md:gap-3 lg:gap-4 3xl:gap-6 4xl:gap-6">
                <div className="relative size-6 md:size-7 lg:size-8 xl:size-9 2xl:size-10 3xl:size-11 4xl:size-12">
                  <NextImg
                    src="/assets/icons/image.svg"
                    alt="image"
                    objectFit="cover"
                  />
                </div>
                <div className="relative flex-1 space-y-3 lg:space-y-4 2xl:space-y-5 3xl:space-y-6 4xl:space-y-8">
                  <h3 className="text-lg font-bold !leading-[1.3] text-primary-950 md:text-xl lg:text-[22px] xl:text-2xl 2xl:text-[28px] 3xl:text-[30px] 4xl:text-[32px]">
                    {trans('doctor-activity-label')}
                  </h3>
                </div>
              </div>

              <div className="relative w-full overflow-hidden">
                <Swiper
                  touchEventsTarget="container"
                  grabCursor={true}
                  slidesPerView={1.2}
                  loop={false}
                  spaceBetween={16}
                  speed={700}
                  breakpoints={{
                    768: {
                      slidesPerView: 2.1,
                    },
                    1024: {
                      slidesPerView: 2.5,
                      spaceBetween: 20,
                    },
                    1280: {
                      slidesPerView: 3,
                      spaceBetween: 20,
                    },
                    1600: {
                      slidesPerView: 3,
                      spaceBetween: 24,
                    },
                  }}
                  className="!w-full !flex-1"
                >
                  {item?.cover
                    ?.slice(1)
                    .map((itemCover: any, indexCover: number) => (
                      <SwiperSlide key={indexCover}>
                        <div className="relative aspect-[4/3] overflow-hidden rounded-[6px]">
                          <NextImg
                            src={getAssetUrlById(itemCover?.id)}
                            alt="image"
                            objectFit="cover"
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                </Swiper>
              </div>
            </div>
          )}

          {item?.content?.contents?.[1] && (
            <div className="space-y-2">
              <div className="flex items-start gap-2 md:gap-3 lg:gap-4 3xl:gap-6 4xl:gap-6">
                <div className="relative size-6 md:size-7 lg:size-8 xl:size-9 2xl:size-10 3xl:size-11 4xl:size-12">
                  <NextImg
                    src="/assets/icons/medal.svg"
                    alt="medal"
                    objectFit="cover"
                  />
                </div>
                <div className="flex-1 space-y-3 lg:space-y-4 2xl:space-y-5 3xl:space-y-6 4xl:space-y-8">
                  <h3 className="text-lg font-bold !leading-[1.3] text-primary-950 md:text-xl lg:text-[22px] xl:text-2xl 2xl:text-[28px] 3xl:text-[30px] 4xl:text-[32px]">
                    {trans('doctor-awards-label')}
                  </h3>
                  <div
                    className="hidden text-sm font-normal text-gray-700 md:block lg:text-base 4xl:text-lg [&>ul]:list-inside [&>ul]:list-disc"
                    dangerouslySetInnerHTML={{
                      __html: item?.content?.contents?.[1],
                    }}
                  ></div>
                </div>
              </div>

              <div
                className="text-sm font-normal text-gray-700 md:hidden lg:text-base 4xl:text-lg [&>ul]:list-inside [&>ul]:list-disc"
                dangerouslySetInnerHTML={{
                  __html: item?.content?.contents?.[1],
                }}
              ></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
