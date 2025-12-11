'use client';
import { CommonSection } from '@/src/types/pageBuilder';
import React, { useMemo } from 'react';
import NextImg from '../../common/next-img';
import { getAssetUrlById } from '@/src/utils/image';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Fancybox from '../../common/Fancybox';
import Link from 'next/link';
import { useMetadata } from '@/src/providers/MetadataProvider';
import useTranslation from '@/src/hooks/use-translation';
export default function CtaBackgroundImage({ data }: CommonSection) {
    const { contact_information } = useMetadata()
    const trans = useTranslation()

    const dataContact = useMemo(() => [
        {
            title: "Điện thoại",
            title_en: "Hotline",
            icon: "",
            url: contact_information?.hot_line_url || "/",
            content: contact_information?.hot_line,
            isTargetBlank: false
        },
        {
            title: "Đặt lịch qua Zalo",
            title_en: "Book an appointment via Zalo",
            icon: "",
            url: contact_information?.medical_appointment_url || "/",
            content: contact_information?.medical_appointment,
            isTargetBlank: true
        },
        {
            title: "Đặt lịch qua App",
            title_en: "Book an appointment via the App",
            icon: "/assets/icons/icon_bv_contact.svg",
            url: contact_information?.googleplay_url || "/",
            content: "",
            isTargetBlank: true
        },
        {
            title: "Email",
            title_en: "Email",
            icon: "",
            url: contact_information?.email_url || "/",
            content: contact_information?.email,
            isTargetBlank: false
        },
        {
            title: "Địa chỉ",
            title_en: "Address",
            icon: "",
            url: contact_information?.address_url || "/",
            content: contact_information?.address,
            isTargetBlank: true
        },
    ], [contact_information])


    return (
        <section className="bg-white py-6 md:py-8 lg:py-12 xl:py-[60px] 2xl:py-[80px] 3xl:py-[100px] 4xl:py-[120px]">
            <div className="container space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-10 2xl:space-y-14 3xl:space-y-[60px]">
                <div className="space-y-1 text-center">
                    <div className="section-sub-title">{data?.subtitle}</div>

                    <h1
                        className="section-title mt-1"
                        dangerouslySetInnerHTML={{
                            __html: data?.title,
                        }}
                    ></h1>
                </div>

                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6 xl:gap-8 2xl:gap-10 3xl:gap-[52px] 4xl:gap-[60px]">
                    <div className="hidden lg:block lg:order-2">
                        <Fancybox
                            options={{
                                Carousel: {
                                    infinite: true,
                                },
                                Images: {
                                    zoom: true,
                                },
                            }}
                        >
                            {data?.cover?.length > 0 && (
                                <>
                                    <div className="relative aspect-[4/3]">
                                        <Swiper
                                            touchEventsTarget="container"
                                            grabCursor={true}
                                            slidesPerView={1}
                                            loop={true}
                                            spaceBetween={0}
                                            speed={700}
                                            modules={[Pagination, EffectFade, Autoplay]}
                                            effect="fade"
                                            autoplay={{
                                                delay: 5000,
                                                disableOnInteraction: false,
                                            }}
                                            pagination={{
                                                clickable: true,
                                                type: 'bullets',
                                                el: '.swiper-bullets-container.swiper-cta-with-bg-image',
                                                bulletElement: 'div',
                                            }}
                                            className="!h-full !w-full"
                                        >
                                            {data?.cover?.map((item: any) => (
                                                <SwiperSlide key={item?.id}>
                                                    <Link
                                                        href={getAssetUrlById(item?.id)}
                                                        data-fancybox="gallery"
                                                        className="relative block size-full"
                                                    >
                                                        <NextImg
                                                            src={getAssetUrlById(item?.id)}
                                                            alt="image"
                                                            objectFit="cover"
                                                        />
                                                    </Link>
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    </div>
                                </>
                            )}
                        </Fancybox>

                        <div className="relative mt-3 flex h-5 justify-center lg:mt-4 xl:mt-5 3xl:mt-6">
                            <div className="swiper-bullets-container swiper-cta-with-bg-image !w-fit"></div>
                        </div>
                    </div>

                    <div className="relative lg:order-1 space-y-6 md:space-y-7 xl:space-y-8 3xl:space-y-9 4xl:space-y-10">
                        {dataContact?.map((item: any, index: number) => (
                            <div key={index} className='space-y-1'>
                                <div className='text-[#52525B] text-sm lg:text-base 2xl:text-lg font-medium'>
                                    {trans(item?.title, item?.title_en)}
                                </div>
                                <a
                                    target={item?.isTargetBlank ? "_blank" : "_parent"}
                                    rel={item?.isTargetBlank ? "noopener" : undefined}
                                    href={item?.url}
                                    className='flex items-center gap-1 xl:gap-2 w-fit'>
                                    {item?.icon && (
                                        <div className='relative size-10 lg:size-11 2xl:size-12'>
                                            <NextImg src={item?.icon} alt='icon contact' />
                                        </div>
                                    )}
                                    <div className='text-base lx:text-lg xl:text-xl 3xl:text-2xl font-medium text-[#09090B]'>
                                        {item?.content}
                                    </div>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
