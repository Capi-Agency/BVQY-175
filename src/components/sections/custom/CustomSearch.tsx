'use client';
import React, { useCallback, useEffect, useState } from 'react';
import NextImg from '../../common/next-img';
import { CommonSection } from '@/src/types/pageBuilder';
import { useRouter, useSearchParams } from 'next/navigation';
import useTranslation from '@/src/hooks/use-translation';
import SearchListContent from './SearchListContent';

export default function CustomSearch({ data }: CommonSection) {
    const trans = useTranslation();
    const searchParams = useSearchParams();
    const router = useRouter();

    const subnet = searchParams.get('subnet');
    const keyword = searchParams.get('s') || '';

    const [searchText, setSearchText] = useState<string>(keyword);
    const [totalAll, setTotalAll] = useState<number>(0);

    // re render để cập nhật total
    useEffect(() => {
    }, [keyword, subnet]);

    const updateParam = useCallback(
        (key: string, value: string) => {
            const params = new URLSearchParams(searchParams);

            // Cập nhật giá trị param
            if (value && value.trim() !== '') {
                params.set(key, value.trim());
            } else {
                // 🔹 Nếu không có → xoá param
                params.delete(key);
            }
            // Xoá toàn bộ các tham số phân trang
            Array.from(params.keys()).forEach((k) => {
                if (k.startsWith('page-')) params.delete(k);
            });
            router.push(`?${params.toString()}`);
        },
        [router, searchParams],
    );

    return (
        <section className="container py-8 lg:py-12 xl:py-[60px] 2xl:py-[80px] 3xl:py-[100px] 4xl:py-[120px]">
            <div className="flex flex-col gap-5 md:grid md:grid-cols-[auto,180px] md:flex-row lg:grid-cols-[auto,180px] lg:gap-6 xl:gap-7 2xl:gap-8 3xl:gap-10">
                <div className="space-y-4 xl:space-y-8">
                    {data?.title && (
                        <h1 className="section-title text-primary-600">{data?.title}</h1>
                    )}
                    <div className="relative flex items-center gap-2 rounded-[6px] bg-gray-100 px-2 shadow-md lg:px-3">
                        <button
                            onClick={() => {
                                updateParam("s", searchText);
                            }}
                            className="relative size-5"
                        >
                            <NextImg src="/assets/icons/search_gray.svg" alt="search_gray" />
                        </button>

                        <input
                            type="text"
                            id="search"
                            name="search"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className="flex-1 border-none bg-transparent bg-none py-2 text-base text-gray-950 outline-none placeholder:text-gray-500 lg:py-3 lg:text-base"
                            placeholder={trans('Tìm kiếm', 'Search')}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    updateParam("s", searchText);
                                }
                            }}
                        />
                    </div>

                    <div className='section-content'>
                        {`${totalAll} ${trans("Kết quả tìm kiếm", "Search results")}`}
                    </div>

                    <div className="w-full space-y-10">
                        {data?.buttons?.map((button: any, index: number) => {
                            const collection = button?.icon;

                            if (subnet && subnet !== collection) return null;
                            return (
                                <SearchListContent
                                    key={index}
                                    collection={collection}
                                    title={button?.title}
                                    type={button?.blurb}
                                    limit={data?.collection_items_limit}
                                    url={button?.url}
                                    setTotalAll={setTotalAll}
                                />
                            )
                        })}
                    </div>
                </div>

                {/* Sidebar */}
                <div>
                    <h3 className="mb-2 text-base font-semibold text-gray-950 lg:mb-4 lg:text-lg 3xl:mb-5">
                        {data?.subtitle}
                    </h3>

                    <div
                        onClick={() => updateParam("subnet", "")}
                        className="block cursor-pointer border-b border-gray-200 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:text-primary-600 lg:py-3 lg:text-base"
                    >
                        {trans("Tất cả", "All")}
                    </div>
                    {data?.buttons?.map((button: any, index: number) => (
                        <div
                            onClick={() => updateParam("subnet", button?.icon)}
                            key={index}
                            className="block cursor-pointer border-b border-gray-200 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:text-primary-600 lg:py-3 lg:text-base"
                        >
                            {button?.title}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
