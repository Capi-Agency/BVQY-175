'use client';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import Link from 'next/link';
import useStoreLanguage from '@/src/store/store';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { CommonSection } from '@/src/types/pageBuilder';
import { fnGetMetadata } from '@/src/services/metadata';
import { fnGetTopNavBySlug } from '@/src/services/page';
import NextImg from '../next-img';
import { AnimatedLink } from '../../animation/LinkAnimated';

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = {
  data: any;
};

export default function TheHeader({ data }: Props) {
  // const language = useStoreLanguage((state: any) => state.language);
  // const updateLanguage = useStoreLanguage((state: any) => state.updateLanguage);
  // const pathname = usePathname();
  // const router = useRouter();

  // const [leftPosition, setLeftPosition] = useState(0);
  // const menuItemsRef = useRef<(HTMLElement | null)[]>([]);
  // const [dataTopNav, setDataTopNav] = useState<any>(null);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const response = await fnGetTopNavBySlug(data?.slug);
  //       setDataTopNav(response);
  //     } catch (error) {
  //       console.log('Error:', error);
  //     }
  //   })();
  // }, []);

  // const headerRef = useRef<any>(null);
  // const selector = gsap.utils.selector(headerRef);

  // const handleMouseEnter = (index: number) => {
  //   const item = menuItemsRef.current[index];
  //   if (item) {
  //     const rect = item.getBoundingClientRect();
  //     setLeftPosition(rect.left);
  //   }
  // };

  // const changeLanguage = (value: string) => {
  //   const segments = pathname.split('/');

  //   segments[1] = value;

  //   if (segments[2]) {
  //     const slugParts = segments[2].split('-');
  //     const lastPart = slugParts[slugParts.length - 1];

  //     if (lastPart === 'en' || lastPart === 'vi') {
  //       if (value === 'vi') {
  //         slugParts.pop();
  //         segments[2] = slugParts.join('-');
  //       } else {
  //         slugParts[slugParts.length - 1] = 'en';
  //         segments[2] = slugParts.join('-');
  //       }
  //     }
  //   }
  //   const newPath = segments.join('/') || '/';
  //   router.push(newPath);
  //   updateLanguage(value);
  // };

  // useGSAP(
  //   () => {
  //     if (!dataTopNav) return;

  //     gsap.to(selector('.header-primary'), {
  //       yPercent: 0,
  //       opacity: 1,
  //       duration: 0.3,
  //       ease: 'power1.out',
  //       delay: 0.2,
  //     });

  //     ScrollTrigger.create({
  //       trigger: selector('.header-primary'),
  //       start: () => 'top top',
  //       end: 'max',
  //       pin: true,
  //       pinSpacing: false,
  //       onUpdate: (self) => {
  //         if (self.direction === 1) {
  //           gsap.to(selector('.header-primary'), {
  //             yPercent: -100,
  //             duration: 0.4,
  //             ease: 'power1.out',
  //           });
  //         } else {
  //           gsap.to(selector('.header-primary'), {
  //             yPercent: 0,
  //             duration: 0.4,
  //             ease: 'power1.out',
  //           });
  //         }
  //       },
  //     });
  //   },
  //   { scope: headerRef, dependencies: [dataTopNav] },
  // );

  return (
    // <header ref={headerRef}>
    //   <div
    //     className={` header-primary absolute left-0 top-0 z-[100] w-full -translate-y-full opacity-0`}
    //   >
    //     <NavigationMenu.Root className="relative w-full">
    //       <div className="header-container">
    //         <div className="flex h-[56px] w-full items-center justify-between 2lg:h-[64px] xl:h-[72px] 2xl:h-[76px]">
         

    //           <div className="flex items-center 2lg:gap-2 xl:gap-3 2xl:gap-4">
    //             <NavigationMenu.List className="hidden w-fit items-center 2lg:flex">
    //               {dataTopNav?.length > 0 &&
    //                 dataTopNav?.map((item: any, index: any) => {
    //                   return item?.sub_items ? (
    //                     <NavigationMenu.Item key={index}>
    //                       <NavigationMenu.Trigger
    //                         className="group select-none"
    //                         onMouseEnter={(e) => handleMouseEnter(index)}
    //                       >
    //                         {item?.url ? (
    //                           <AnimatedLink
    //                             target={
    //                               item?.url?.startsWith('http')
    //                                 ? '_blank'
    //                                 : '_parent'
    //                             }
    //                             href={
    //                               item?.url?.startsWith('http')
    //                                 ? item.url
    //                                 : `/${language}${item?.url || ''}`
    //                             }
    //                             ref={(el: any) => {
    //                               menuItemsRef.current[index] = el;
    //                             }}
    //                             className="relative block font-manche text-sm font-medium uppercase text-white 2lg:p-[12px_16px] xl:p-[12px_20px] 2xl:p-[12px_24px]"
    //                           >
    //                             {item?.title}
    //                           </AnimatedLink>
    //                         ) : (
    //                           <div
    //                             ref={(el: any) => {
    //                               menuItemsRef.current[index] = el;
    //                             }}
    //                             className="relative block font-manche text-sm font-medium uppercase text-white 2lg:p-[12px_16px] xl:p-[12px_20px] 2xl:p-[12px_24px]"
    //                           >
    //                             {item?.title}
    //                           </div>
    //                         )}
    //                       </NavigationMenu.Trigger>

    //                       <NavigationMenu.Content className="w-fit data-[motion=from-end]:animate-enterFromRight data-[motion=from-start]:animate-enterFromLeft data-[motion=to-end]:animate-exitToRight data-[motion=to-start]:animate-exitToLeft 2lg:space-y-2 2lg:p-[8px_16px_16px] xl:space-y-3 xl:p-[12px_20px_20px] 2xl:p-[16px_24px_24px] 3xl:space-y-4">
    //                         {item?.sub_items?.map(
    //                           (related_item: any, index: any) => (
    //                             <AnimatedLink
    //                               key={index}
    //                               target={
    //                                 related_item?.url?.startsWith('http')
    //                                   ? '_blank'
    //                                   : '_parent'
    //                               }
    //                               href={
    //                                 related_item?.url?.startsWith('http')
    //                                   ? related_item.url
    //                                   : `/${language}${related_item?.url || ''}`
    //                               }
    //                               className="flex h-[28px] items-center whitespace-nowrap text-nowrap border-b-[1px] border-white font-manche text-xs font-medium text-white"
    //                             >
    //                               {related_item?.title}
    //                             </AnimatedLink>
    //                           ),
    //                         )}
    //                       </NavigationMenu.Content>
    //                     </NavigationMenu.Item>
    //                   ) : (
    //                     <NavigationMenu.Item key={index}>
    //                       <AnimatedLink
    //                         target={
    //                           item?.url?.startsWith('http')
    //                             ? '_blank'
    //                             : '_parent'
    //                         }
    //                         href={
    //                           item?.url?.startsWith('http')
    //                             ? item.url
    //                             : `/${language}${item?.url || ''}`
    //                         }
    //                         className="relative block font-manche text-sm font-medium uppercase text-white 2lg:p-[12px_16px] xl:p-[12px_20px] 2xl:p-[12px_24px]"
    //                       >
    //                         {item?.title}
    //                       </AnimatedLink>
    //                     </NavigationMenu.Item>
    //                   );
    //                 })}
    //             </NavigationMenu.List>

    //             <div className="flex items-center gap-5 2lg:gap-0">
    //               <button className="relative size-6 2lg:mx-4 xl:mx-5 2xl:mx-6">
    //                 <NextImg
    //                   src="/assets/icons/search.svg"
    //                   alt="search icon"
    //                   objectFit="contain"
    //                 />
    //               </button>

    //               <div className="hidden items-center 2lg:flex">
    //                 <div className="h-9 w-[1px] bg-white"></div>
    //                 <button
    //                   onClick={() => changeLanguage('vi')}
    //                   className={`${language == 'vi' ? 'text-white' : 'text-white/60'} font-manche text-sm font-medium uppercase 2lg:p-[12px_16px] xl:p-[12px_20px] 2xl:p-[12px_24px]`}
    //                 >
    //                   VN
    //                 </button>
    //                 <div className="h-4 w-[1px] bg-white"></div>
    //                 <button
    //                   // onClick={() => changeLanguage('en')}
    //                   className={`${language == 'en' ? 'text-white' : 'text-white/60'} cursor-not-allowed font-manche text-sm font-medium uppercase 2lg:p-[12px_16px] xl:p-[12px_20px] 2xl:p-[12px_24px]`}
    //                 >
    //                   EN
    //                 </button>
    //               </div>

                  
    //             </div>
    //           </div>
    //         </div>
    //       </div>

    //       <div
    //         className="perspective-[2000px] absolute left-0 top-[54px] w-full transition-all duration-300 2lg:top-[58px] 2xl:top-[60px]"
    //         style={{ left: `${leftPosition}px` }}
    //       >
    //         <NavigationMenu.Viewport className="relative h-[var(--radix-navigation-menu-viewport-height)] w-[var(--radix-navigation-menu-viewport-width)] origin-[top_center] overflow-hidden rounded-[6px] border-[1px] border-[rgba(171,130,62,0.40)] bg-[rgba(171,130,62,0.80)] transition-all duration-100 data-[state=closed]:animate-scaleOut data-[state=open]:animate-scaleIn" />
    //       </div>
    //     </NavigationMenu.Root>
    //   </div>
    // </header>
    <></>
  );
};

