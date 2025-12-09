'use client';
import React, { useState } from 'react';
import { getAssetUrlById } from '@/src/utils/image';
import {
  DialogTrigger,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '../../ui/dialog';
import { cn } from '@/src/lib/utils';
import { X } from 'lucide-react';
import Fancybox from '../../common/Fancybox';
import useTranslation from '@/src/hooks/use-translation';
import NextImg from '../../common/next-img';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';
import { Fancybox as NativeFancybox } from '@fancyapps/ui';
export default function Card1ColDetail({ event, data }: any) {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const trans = useTranslation();

  const fancyBoxItems = event?.images?.map((image: any) => ({
    src: getAssetUrlById(image?.directus_files_id),
    type: 'image',
  }));

  const fancyBoxOptions = {
    Carousel: {
      infinite: true,
    },
    Images: {
      zoom: true,
    },
  };

  return (
    <Dialog open={isOpenModal} onOpenChange={setIsOpenModal}>
      <DialogTrigger asChild>
        {
          <div className="grid cursor-pointer grid-cols-1 gap-8 md:grid-cols-2 md:gap-6 lg:gap-8 xl:gap-10 2xl:gap-11 3xl:gap-[52px] 4xl:gap-[60px]">
            <div className="relative aspect-video overflow-hidden">
              <NextImg
                src={getAssetUrlById(event?.images?.[0]?.directus_files_id)}
                alt="event cover"
                objectFit="cover"
              />
            </div>

            <div className="flex flex-col items-stretch justify-center">
              <div className="line-clamp-3 text-xl font-semibold uppercase text-primary-600 lg:text-2xl 2xl:text-[28px] 2xl:!leading-[1.5] 3xl:text-[30px] 4xl:text-[32px]">
                {trans(event?.title, event?.title_en)}
              </div>

              <div
                className="line-clamp-3 pt-1.5 text-sm font-normal text-black lg:pt-2 xl:text-base 2xl:pt-3 4xl:pt-4"
                dangerouslySetInnerHTML={{
                  __html: trans(event?.content, event?.content_en),
                }}
              ></div>

              <div className="flex items-center justify-between pt-3 lg:pt-4 2xl:pt-5 3xl:pt-6">
                <div className="flex items-center gap-1.5 xl:gap-2">
                  <div className="relative size-5 xl:size-6">
                    <NextImg
                      src="/assets/icons/calendar_gray.svg"
                      alt="calendar icon"
                    />
                  </div>
                  <p className="text-sm font-medium text-black lg:text-base 3xl:text-lg 4xl:text-xl">
                    {event?.timestamp}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 xl:gap-2">
                  <p className="text-sm font-medium text-black lg:text-base 3xl:text-lg 4xl:text-xl">
                    {data?.buttons?.[0]?.title}
                  </p>

                  <div className="relative size-5 xl:size-6">
                    <NextImg
                      src={getAssetUrlById(data?.buttons?.[0]?.icon?.id)}
                      alt="arrow icon"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        onScroll={(e) => e.stopPropagation()}
        className={cn('!scrollbar-hidden bg-black/50 p-0')}
      >
        <div className="hidden">
          <DialogTitle>Lịch sử hình thành</DialogTitle>
          <DialogDescription>Lịch sử hình thành </DialogDescription>
        </div>
        <div
          onClick={() => {
            setIsOpenModal(false);
          }}
          className="flex h-full w-full cursor-auto items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative size-[800px] overflow-y-auto rounded-[16px] bg-white p-[60px_40px_40px]"
          >
            <DialogClose className="data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute right-0 top-0 p-[20px_40px] focus:outline-none disabled:pointer-events-none">
              <X className="h-5 w-5 brightness-0" />
            </DialogClose>

            <div className="scrollbar-hidden relative size-full space-y-6 overflow-x-hidden overflow-y-scroll">
              <Fancybox
                options={fancyBoxOptions}
                className="w-full"
              >
                <div className="relative aspect-video w-full overflow-hidden rounded-[12px]">
                  <Swiper
                    touchEventsTarget="container"
                    grabCursor={true}
                    slidesPerView={1}
                    loop={true}
                    spaceBetween={12}
                    speed={700}
                    className="!h-full !w-full"
                  >
                    {event?.images?.map((image: any, index: number) => (
                      <SwiperSlide key={image?.directus_files_id}>
                        <Link
                          href={getAssetUrlById(image?.directus_files_id)}
                          className="relative block size-full overflow-hidden rounded-[12px]"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (fancyBoxItems && fancyBoxItems.length > 0) {
                              NativeFancybox.show(fancyBoxItems, {
                                ...fancyBoxOptions,
                                Hash: false,
                                hideScrollbar: false,
                                startIndex: index,
                              });
                            }
                          }}
                        >
                          <NextImg
                            src={getAssetUrlById(image?.directus_files_id)}
                            objectFit="cover"
                            alt="facilities images"
                          />
                        </Link>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </Fancybox>

              <div className="h-[1px] bg-[#E8E8E8]"></div>
              <div
                className="space-y-2 text-sm font-medium text-[#6C6C71]"
                dangerouslySetInnerHTML={{
                  __html: event?.content,
                }}
              ></div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
