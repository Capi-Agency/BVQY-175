'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getListDoctorPreview, getListDoctors, getTotalDoctorCount } from '@/src/services/doctors';
import { getListNews, getTotalNewsCount } from '@/src/services/news';
import { fnGetAdminDepartments, getTotalAdminDepartmentCount } from '@/src/services/adminDepartment';
import { NewsCard } from '../news';
import DoctorCard from '../../common/doctor-card';
import PaginationPrimary from '../pagination/PaginationPrimary';
import NextImg from '../../common/next-img';
import useTranslation from '@/src/hooks/use-translation';
import DepartmentCard from '../../departments/DepartmentCard';

type SearchListContentProps = {
    collection: any;
    type: string;
    limit?: number;
    url?: string;
    title?: string
    setTotalAll: React.Dispatch<React.SetStateAction<number>>
};

export default function SearchListContent({ collection, type, limit = 6, url = "/", title = "", setTotalAll }: SearchListContentProps) {
    const trans = useTranslation()
    const searchParams = useSearchParams();

    const [data, setData] = useState<any>([]);
    const [length, setLength] = useState<number>(0);
    const [loading, setLoading] = useState(false);

    // lấy các thông tin search
    const pageParam = `page-${type}`;
    const currentPage = Number(searchParams.get(pageParam) || 1);
    const keyword = searchParams.get('s') || '';

    // Map component, hàm gọi api và total, props card theo collection
    const cardRegistry: Record<
        string,
        {
            Component: React.ComponentType<any>;
            getList: (params: any) => Promise<any>;
            getCount: (params: any) => Promise<number>;
            getProps: (item: any) => Record<string, any>;
        }
    > = {
        posts: {
            Component: NewsCard,
            getList: getListNews,
            getCount: getTotalNewsCount,
            getProps: (itemData) => ({ item: itemData, url }),
        },
        activity_posts: {
            Component: NewsCard,
            getList: getListNews,
            getCount: getTotalNewsCount,
            getProps: (itemData) => ({ item: itemData, url }),
        },
        for_patient_posts: {
            Component: NewsCard,
            getList: getListNews,
            getCount: getTotalNewsCount,
            getProps: (itemData) => ({ item: itemData, url }),
        },
        doctors: {
            Component: DoctorCard,
            getList: getListDoctorPreview,
            getCount: getTotalDoctorCount,
            getProps: (itemData) => ({ item: itemData, url, avatarType: "avatar" }),
        },
        departments: {
            Component: DepartmentCard,
            getList: fnGetAdminDepartments,
            getCount: getTotalAdminDepartmentCount,
            getProps: (itemData) => ({ item: itemData, url }),
        },
        administration_departments: {
            Component: DepartmentCard,
            getList: fnGetAdminDepartments,
            getCount: getTotalAdminDepartmentCount,
            getProps: (itemData) => ({ item: itemData, url }),
        },
        department_groups: {
            Component: DepartmentCard,
            getList: fnGetAdminDepartments,
            getCount: getTotalAdminDepartmentCount,
            getProps: (itemData) => ({ item: itemData, url }),
        },
        dependent_units: {
            Component: DepartmentCard,
            getList: fnGetAdminDepartments,
            getCount: getTotalAdminDepartmentCount,
            getProps: (itemData) => ({ item: itemData, url }),
        },
    };

    const registry = cardRegistry[collection];
    const CardComponent = registry?.Component;

    const totalPage: number = useMemo(() => (length ? Math.ceil(length / limit) : 0), [length, limit]);

    // gọi danh sách
    useEffect(() => {
        if (!registry) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await registry.getList({ collection, keyword, limit, page: currentPage })
                setData(response || []);
            } catch (error) {
                console.error('Fetch error:', error);
                setData([]);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [keyword, currentPage, type]);

    // gọi total
    useEffect(() => {
        if (!registry) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await registry.getCount({ collection, keyword })

                setLength(response || 0);
                setTotalAll((prev: number) => prev + Number(response || 0));
            } catch (error) {
                console.error('Fetch error:', error);
                setLength(0);
                setTotalAll((prev: number) => prev + 0)
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [keyword, type]);

    return (
        <div
            id={collection}
            className="space-y-4 lg:space-y-5 xl:space-y-6 3xl:space-y-7 4xl:space-y-8"
        >
            <h1 className="text-[20px] font-semibold text-primary-600 md:text-[20px] lg:text-[24px] xl:text-[28px] 2xl:text-[32px] 3xl:text-[36px] 4xl:text-[40px]">
                {title}
            </h1>

            {loading ? (
                <div className="flex h-10 items-center justify-center">
                    <div className="relative size-8 animate-spin">
                        <NextImg
                            src="/assets/icons/loading_spin_primary.svg"
                            alt="loading spin"
                        />
                    </div>
                </div>
            ) : (
                <>
                    {CardComponent && data?.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 md:gap-4">
                            {data?.map((el: any, i: number) => <CardComponent key={i} {...registry.getProps(el)} />)}
                        </div>
                    ) : (
                        <div className="text-normal flex h-[calc(100vh/3)] items-center justify-center text-sm font-medium text-black lg:text-base xl:text-lg">
                            {trans('Không có dữ liệu', 'No data available')}
                        </div>
                    )}
                </>
            )}

            {totalPage > 1 && (
                <PaginationPrimary
                    currentPage={currentPage}
                    totalPage={totalPage}
                    idSection={collection}
                    pageName={pageParam}
                />
            )}
        </div>
    );
}
