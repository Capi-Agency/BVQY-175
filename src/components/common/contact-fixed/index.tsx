'use client';
import React, { useMemo, useState } from 'react';
import NextImg from '../next-img';
import { TooltipProvider, TooltipContent, TooltipRoot, TooltipTrigger, TooltipArrow } from '../../ui/tooltip';
import useTranslation from '@/src/hooks/use-translation';
import { useMetadata } from '@/src/providers/MetadataProvider';

export default function ContactFixed() {
    const { contact_information } = useMetadata()
    const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false)
    const trans = useTranslation()

    const data = useMemo(() => [
        {
            title: "Hotline",
            icon: "/assets/icons/phone_contact.svg",
            url: contact_information?.hot_line_url || "/",
            bgColor: "#63A978",
            isTargetBlank: false
        },
        {
            title: "Đặt khám online",
            icon: "/assets/icons/calendar_contact.svg",
            url: contact_information?.googleplay_url || "/",
            bgColor: "#E50000",
            isTargetBlank: true
        },
        {
            title: "Fanpage",
            icon: "/assets/icons/fb_contact.svg",
            url: contact_information?.facebook_url || "/",
            bgColor: "#1877F2",
            isTargetBlank: true
        },
        {
            title: "Email",
            icon: "/assets/icons/mail_contact.svg",
            url: contact_information?.email_url || "/",
            bgColor: "#F97316",
            isTargetBlank: false
        },
    ], [contact_information])

    return (
        <div className='relative z-[50]'
            style={{
                boxShadow:
                    '0 10px 12.5px -2.5px rgba(18, 26, 43, 0.05), 0 3.333px 5px -2.5px rgba(18, 26, 43, 0.05)',
            }}
        >
            <TooltipProvider delayDuration={100}>
                <TooltipRoot>
                    <TooltipTrigger asChild>
                        <button
                            onClick={() => setIsOpenMenu((prev: boolean) => !prev)}
                            className='relative z-[51] size-12 cursor-pointer rounded-[6px] bg-[#E50000] flex justify-center items-center lg:size-11 xl:size-12'>
                            <div className={`relative size-6`}>
                                <NextImg src="/assets/icons/phone_contact.svg" alt="plus icon" />
                            </div>
                        </button>
                    </TooltipTrigger>

                    <TooltipContent
                        side="right"
                        align="center"
                        className="rounded-md bg-[#E50000] text-sm xl:text-base text-white p-[6px_8px]"
                    >
                        {isOpenMenu ? trans("Đóng", "Close") : trans("Liên hệ", "Contact")}
                        <TooltipArrow className="fill-[#E50000]" />
                    </TooltipContent>
                </TooltipRoot>

                <div className={`${isOpenMenu ? "pointer-events-auto" : "pointer-events-none"} absolute z-[50] pb-2 xl:pb-3 left-0 top-0 -translate-y-full flex flex-col gap-2 xl:gap-3`}>
                    {data?.map((item: any, index: number) => (
                        <div key={index} className={`${isOpenMenu ? "translate-y-0 opacity-100" : "translate-y-[80%] opacity-0"} transition-all duration-200`}
                            style={{
                                transitionDelay: `${(data?.length - index) * 50}ms`
                            }}
                        >
                            <TooltipRoot open={isOpenMenu} delayDuration={1000}>
                                <TooltipTrigger asChild>
                                    <a
                                        target={item?.isTargetBlank ? "_blank" : "_parent"}
                                        rel={item?.isTargetBlank ? "noopener" : undefined}
                                        href={item?.url}
                                        className='relative flex size-12 cursor-pointer items-center justify-center rounded-[6px] lg:size-11 xl:size-12'
                                        style={{
                                            backgroundColor: item?.bgColor
                                        }}
                                    >
                                        <div className="relative size-6">
                                            <NextImg src={item?.icon} alt="contact icon" />
                                        </div>
                                    </a>
                                </TooltipTrigger>

                                <TooltipContent
                                    side="right"
                                    align="center"
                                    className="rounded-md text-sm xl:text-base text-white p-[6px_8px]"
                                    style={{
                                        backgroundColor: item?.bgColor
                                    }}
                                >
                                    {item?.title}
                                    <TooltipArrow style={{ fill: item?.bgColor }} />
                                </TooltipContent>
                            </TooltipRoot>
                        </div>
                    ))}
                </div>
            </TooltipProvider>
        </div>
    );
}





