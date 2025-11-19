'use client';
import React, { useEffect, useMemo, useState } from 'react';
import NextImg from '../../common/next-img';
import NewsCard from './NewsCard';
import { getListItemByEndpoint, getListNews, getTotalNewsCount } from '@/src/services/news';
import { CommonSection } from '@/src/types/pageBuilder';
import { getPaginatedPages } from '@/src/utils/pagination';

export default function NewsListCard({ data }: CommonSection) {
  const [dataNews, setDataNews] = useState<any>([]);
  const [length, setLength] = useState<number>(0);

  const currentPage: number = 1;

  const totalPage = useMemo(() => {
    return length
      ? Math.ceil(Number(length) / data?.collection_items_limit)
      : 0;
  }, [length]);

  const pagination = useMemo(() => {
    const result = getPaginatedPages(totalPage, currentPage);
    return result
  }, [totalPage]);

  // console.log(dataNews);
  //   useEffect(() => {
  //     (async () => {
  //       try {
  //         console.log(data?.url)
  //         const response = await getListItemByEndpoint(data?.url);
  //         setDataNews(response);
  //       } catch (error) {
  //         console.log('Error:', error);
  //       }
  //     })();
  //   }, [data]);


  useEffect(() => {
    (async () => {
      try {
        const response = await getListNews({
          collection: data?.collections,
          // limit: data?.collection_items_limit,
          limit: 12
        });
        setDataNews(response);
      } catch (error) {
        console.log('Error:', error);
      }
    })();
  }, [data]);

  useEffect(() => {
    (async () => {
      try {
        const response = await getTotalNewsCount({
          collection: data?.collections,
        });
        console.log(response);
        setLength(response);
      } catch (error) {
        console.log('Error:', error);
      }
    })();
  }, [data]);

  return (
    <section className="p-[24px_0_44px] lg:p-[28px_0_52px] xl:p-[32px_0_64px] 3xl:p-[32px_0_72px] 4xl:p-[40px_0_80px]">
      <div className="container space-y-8 lg:space-y-10 xl:space-y-12 3xl:space-y-[52px] 4xl:space-y-[60px]">
        <h2
          className="section-title text-primary-950"
          dangerouslySetInnerHTML={{
            __html: data?.title,
          }}
        ></h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-8 4xl:gap-10">
          {dataNews?.length > 0 &&
            dataNews?.map((item: any, index: number) => (
              <NewsCard key={index} item={item} url={data?.buttons?.[0]?.url} />
            ))}

          <div className="col-span-full flex justify-center">
            {pagination}
          </div>
        </div>
      </div>
    </section>
  );
}
