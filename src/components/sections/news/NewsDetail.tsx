'use client';
import NextImg from '@/src/components/common/next-img';
import { getAssetUrlById } from '@/src/utils/image';
import { formatDate } from '@/src/utils/validate';
import { CommonSection } from '@/src/types/pageBuilder';
import useTranslation from '@/src/hooks/use-translation';

export default function NewsDetail({ data, dataDetail }: CommonSection) {
  const trans = useTranslation();
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

      <div className="mt-6 flex flex-col gap-6 md:grid md:grid-cols-[auto,220px] md:flex-row lg:mt-10 lg:grid-cols-[auto,260px] lg:gap-8 lg:px-6 xl:gap-11 xl:px-[60px] 2xl:gap-12 2xl:px-[100px] 3xl:gap-[60px] 3xl:px-[80px] 4xl:mt-[60px] 4xl:px-[160px]">
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
                __html: trans(dataDetail?.title, dataDetail?.title_en),
              }}
            ></h1>
          </div>

          {/* Blurb */}
          <div
            className="text-sm font-bold text-gray-950 lg:text-base 3xl:text-lg"
            dangerouslySetInnerHTML={{
              __html: trans(dataDetail?.blurb, dataDetail?.blurb_en),
            }}
          ></div>

          {/* content */}
          <div
            className="content-wrapper !text-sm font-normal text-gray-950 lg:!text-base 3xl:!text-lg"
            dangerouslySetInnerHTML={{
              __html: trans(dataDetail?.content, dataDetail?.content_en),
            }}
          ></div>
        </div>

        {/* Sidebar */}
        <div className="sidebar-container relative"></div>
      </div>
    </section>
  );
}
