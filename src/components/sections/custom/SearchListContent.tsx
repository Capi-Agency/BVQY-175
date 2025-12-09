// 'use client';

// import { getListDoctors } from '@/src/services/doctors';
// import { getListNews } from '@/src/services/news';
// import { useRouter, useSearchParams } from 'next/navigation';
// import React, { useEffect, useState } from 'react';

// type SearchListContentProps = {
//   item: any;
//   type: string;
// };

// export default function SearchListContent({
//   item,
//   type,
// }: SearchListContentProps) {
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   const [data, setData] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);

//   const pageParam = `page-${type}`;
//   const collection = item?.buttons?.[0]?.url;

//   const page = parseInt(searchParams.get(pageParam) || '1', 10);
//   const keyword = searchParams.get('s') || '';

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!keyword) return;
//       setLoading(true);

//       try {
//         let response;
//         switch (collection) {
//           case 'posts':
//           case 'activity_posts':
//           case 'for_patient_posts':
//             response = await getListNews({ collection });
//             break;
//           case 'department_groups': break
//           case 'departments':
//           case 'administration_departments':
//           case 'dependent_units':
//             response = await getServices(keyword, page);
//             break;
//           case 'doctors':
//             res = await getListDoctors();
//             break;
       
//           default:
//             res = [];
//         }
//         setData(res);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [keyword, page, type]);

//   return (
//     <div className="space-y-4 lg:space-y-5 xl:space-y-6 3xl:space-y-7 4xl:space-y-8">
//       {item?.title && (
//         <h1 className="text-[20px] font-semibold text-primary-600 md:text-[20px] lg:text-[24px] xl:text-[28px] 2xl:text-[32px] 3xl:text-[36px] 4xl:text-[40px]">
//           {item?.title}
//         </h1>
//       )}

//       <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-8 4xl:gap-10"></div>
//     </div>
//   );
// }
