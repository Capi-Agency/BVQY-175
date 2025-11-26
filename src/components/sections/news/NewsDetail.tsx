'use client';
import NextImg from '@/src/components/common/next-img';
import useStoreLanguage from '@/src/store/store';
import { getAssetUrlById } from '@/src/utils/image';
import { formatDate } from '@/src/utils/validate';
import RegisterFollowNews from './RegisterFollowNews';
import { CommonSection } from '@/src/types/pageBuilder';

export default function NewsDetail({ data, dataDetail }: CommonSection) {
  const language = useStoreLanguage((state: any) => state.language);
  // Helper để chọn nội dung theo ngôn ngữ
  const t = (vi: string, en: string) => (language === 'en' ? en : vi);

  return (
    <section className="container my-10 lg:my-12 2xl:my-[72px] 3xl:my-20">
      {/* Cover */}
      <div className="relative h-[200px] w-full md:h-[230px] lg:h-[360px] 2xl:h-[386px] 3xl:h-[426px] 4xl:h-[480px]">
        <NextImg
          src={getAssetUrlById(dataDetail?.thumbnail)}
          alt={`${dataDetail?.title}`}
          objectFit="cover"
        />
      </div>

      <div className="mt-6 flex flex-col gap-6 md:grid md:grid-cols-[auto,260px] md:flex-row lg:mx-auto lg:mt-10 lg:max-w-[902px] lg:gap-11 xl:max-w-[960px] 2xl:gap-12 3xl:max-w-[1120px] 3xl:gap-[60px] 4xl:mt-[60px]">
        {/* Main content */}
        <div className="space-y-4 md:space-y-6">
          <div className="space-y-2 lg:space-y-3">
            {/* Date published */}
            <div className="flex items-center gap-1.5 text-sm text-black lg:text-base 2xl:gap-2 2xl:text-lg 4xl:text-xl">
              <div className="relative size-5 lg:size-6">
                <NextImg
                  src="/assets/icons/calendar_black.svg"
                  alt="calendar"
                />
              </div>
              {formatDate(dataDetail?.date_published)}
            </div>

            {/* title */}
            <h1
              className="mb-5 text-lg font-bold !leading-normal text-primary-600 lg:mb-6 lg:text-2xl xl:mb-7 xl:text-[28px] 3xl:mb-8 3xl:text-[30px] 4xl:text-[32px]"
              dangerouslySetInnerHTML={{
                __html: t(dataDetail?.title, dataDetail?.title_en),
              }}
            ></h1>
          </div>

          {/* Blurb */}
          <div
            className="text-sm font-bold text-gray-950 lg:text-base 3xl:text-lg"
            dangerouslySetInnerHTML={{
              __html: t(dataDetail?.blurb, dataDetail?.blurb_en),
            }}
          ></div>

          {/* content */}
          <div
            className="content-wrapper !text-sm font-normal text-gray-950 lg:!text-base 3xl:!text-lg"
            dangerouslySetInnerHTML={{
              __html: t(dataDetail?.content, dataDetail?.content_en),
            }}
          ></div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6 lg:space-y-8 3xl:space-y-10">
          {/*  Tags  */}
          <div>
            <h3 className="mb-2 text-base font-semibold text-gray-950 lg:mb-4 lg:text-lg 3xl:mb-5">
              {data?.buttons?.[0]?.title}
            </h3>
            <p className="border-b border-gray-200 py-2.5 text-sm font-medium text-gray-700 lg:py-3 lg:text-base">
              Tin nổi bật
            </p>
            <p className="border-b border-gray-200 py-2.5 text-sm font-medium text-gray-700 lg:py-3 lg:text-base">
              Tin nổi bật
            </p>
          </div>

          {/* Form */}
          <RegisterFollowNews />

          {/* Banner */}
          <div className="flex flex-col items-center gap-3 rounded-[6px] border-[.5px] border-primary-600 px-3 py-5 xl:gap-4 xl:rounded-xl xl:px-4 xl:py-6">
            <div
              className="mx-auto w-full max-w-[220px] text-center text-sm font-semibold text-black"
              dangerouslySetInnerHTML={{
                __html: data?.contents,
              }}
            ></div>
            <div className="relative aspect-[2/3] w-full">
              <NextImg src={getAssetUrlById(data?.cover?.id)} alt="doctor" />
            </div>
            <div className="text-center">
              <p className="text-xs font-normal text-gray-700 2xl:text-sm 3xl:text-base">
                {data?.subtitle}
              </p>
              <p className="text-lg font-bold text-primary-500 2xl:text-xl 3xl:text-2xl">
                {data?.title}
              </p>
              <p className="text-xs font-medium text-gray-700 2xl:text-sm 3xl:text-base">
                {data?.blurb}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
