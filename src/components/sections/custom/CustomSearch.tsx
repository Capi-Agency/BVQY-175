// 'use client';
// import React, { useCallback, useEffect, useState } from 'react';
// import NextImg from '../../common/next-img';
// import { CommonSection } from '@/src/types/pageBuilder';
// import { useRouter, useSearchParams } from 'next/navigation';
// import useTranslation from '@/src/hooks/use-translation';
// import SearchListContent from './SearchListContent';

// export default function CustomSearch({ data }: CommonSection) {
//   const trans = useTranslation();
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const [searchText, setSearchText] = useState<string>('');

//   const [loading, setLoading] = useState(false);

//   const subnet = searchParams.get('subnet');

//   const handleSearch = useCallback(
//     (searchText: string) => {
//       const params = new URLSearchParams(searchParams);
//       params.set('s', searchText.trim());
//       router.push(`?${params.toString()}`);
//     },
//     [router, searchParams],
//   );

//   const handleSelectCate = useCallback(
//     (collection_url: string) => {
//       const params = new URLSearchParams(searchParams);
//       params.set('subnet', collection_url.trim());
//       router.push(`?${params.toString()}`);
//     },
//     [router, searchParams],
//   );

//   return (
//     <section className="container py-8 lg:py-12 xl:py-[60px] 2xl:py-[80px] 3xl:py-[100px] 4xl:py-[120px]">
//       <div className="flex flex-col gap-6 md:grid md:grid-cols-[auto,220px] md:flex-row lg:grid-cols-[auto,260px] lg:gap-8 xl:gap-11 2xl:gap-12 3xl:gap-[60px]">
//         <div className="space-y-4 xl:space-y-8">
//           {data?.title && (
//             <h1 className="section-title text-primary-600">{data?.title}</h1>
//           )}
//           <div className="relative flex items-center gap-2 rounded-[6px] bg-gray-100 px-2 shadow-md lg:px-3">
//             <button
//               onClick={() => {
//                 handleSearch(searchText);
//               }}
//               className="relative size-5"
//             >
//               <NextImg src="/assets/icons/search_gray.svg" alt="search_gray" />
//             </button>

//             <input
//               type="text"
//               id="search"
//               name="search"
//               value={searchText}
//               onChange={(e) => setSearchText(e.target.value)}
//               className="flex-1 border-none bg-transparent bg-none py-2 text-base text-gray-950 outline-none placeholder:text-gray-500 lg:py-3 lg:text-base"
//               placeholder={trans('Tìm kiếm', 'Search')}
//               onKeyDown={(e) => {
//                 if (e.key === 'Enter') {
//                   e.preventDefault();
//                   handleSearch(searchText);
//                 }
//               }}
//             />
//           </div>

//           <div className="w-full">
//             {data?.items?.map((item: any, index: number) => (
//               <SearchListContent
//                 key={index}
//                 item={item}
//                 type={item?.buttons?.[0]?.blurb}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Sidebar */}
//         <div>
//           <h3 className="mb-2 text-base font-semibold text-gray-950 lg:mb-4 lg:text-lg 3xl:mb-5">
//             {data?.subtitle}
//           </h3>

//           {data?.items?.map((item: any, index: number) => (
//             <div
//               onClick={() => handleSelectCate(item?.buttons?.[0]?.url)}
//               key={index}
//               className="block cursor-pointer border-b border-gray-200 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:text-primary-600 lg:py-3 lg:text-base"
//             >
//               {item?.buttons?.[0]?.title}
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
