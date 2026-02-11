'use client';
import NextImg from '@/src/components/common/next-img';
import { CommonSection } from '@/src/types/pageBuilder';
import { getAssetUrlById } from '@/src/utils/image';
import { formatDate, formatFileSize } from '@/src/utils/validate';
import { Download } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEffect } from 'react';
import Fancybox from '../../common/Fancybox';

export default function NewsDetail({ data, dataDetail }: CommonSection) {
  const t = useTranslations('Format');
  const tCommon = useTranslations('Common');
  const transContent = dataDetail?.translations?.[0];

  useEffect(() => {
    const container = document.querySelector(
      '.content-wrapper.content-fancybox',
    );
    if (!container) return;

    const images = container.querySelectorAll('img');
    images.forEach((img, index) => {
      if (!img.hasAttribute('data-fancybox')) {
        img.setAttribute('data-fancybox', 'gallery');
        img.setAttribute('data-src', img.getAttribute('src') || '');
        img.style.cursor = 'pointer';
      }
    });

    const links = container.querySelectorAll('a');
    links.forEach((a) => {
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener');
    });
  }, [dataDetail]);

  return (
    <section className="container my-10 lg:my-12 2xl:my-[72px] 3xl:my-20">
      <div className="mt-6 flex flex-col gap-6 md:grid md:grid-cols-[auto,220px] md:flex-row lg:mt-10 lg:grid-cols-[auto,260px] lg:gap-8 lg:px-6 xl:gap-11 xl:px-[60px] 2xl:gap-12 2xl:px-[100px] 3xl:gap-[60px] 3xl:px-[80px] 4xl:mt-[60px] 4xl:px-[160px]">
        {/* Main content */}
        <div className="space-y-4 md:space-y-6">
          {/* Cover */}
          <div className="relative aspect-video w-full">
            <NextImg
              src={getAssetUrlById(transContent?.cover)}
              alt={`${transContent?.title}`}
              objectFit="cover"
            />
          </div>

          <div className="space-y-2 lg:space-y-3">
            {/* Date published */}
            <div className="flex items-center gap-1.5 text-sm text-black lg:text-base 2xl:gap-2 2xl:text-lg 4xl:text-xl">
              <div className="relative size-5 lg:size-6">
                <NextImg
                  src="/assets/icons/calendar_black.svg"
                  alt="calendar"
                />
              </div>
              {formatDate(dataDetail?.date_published, t('date'))}
            </div>

            {/* title */}
            <h1
              className="mb-5 text-lg font-bold !leading-normal text-primary-600 lg:mb-6 lg:text-2xl xl:mb-7 xl:text-[28px] 3xl:mb-8 3xl:text-[30px] 4xl:text-[32px]"
              dangerouslySetInnerHTML={{
                __html: transContent?.title,
              }}
            ></h1>
          </div>

          {/* Blurb */}
          <div
            className="text-sm font-bold text-gray-950 lg:text-base 3xl:text-lg"
            dangerouslySetInnerHTML={{
              __html: transContent?.blurb,
            }}
          ></div>

          {/* content */}
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
            <div
              className="content-wrapper content-fancybox !text-sm font-normal text-gray-950 lg:!text-base 3xl:!text-lg"
              dangerouslySetInnerHTML={{
                __html: transContent?.content,
              }}
            ></div>
          </Fancybox>

          {/* Documents */}
          {dataDetail?.documents && dataDetail?.documents?.length > 0 && (
            <div className="mt-8 space-y-4">
              <h3 className="text-lg font-bold text-primary-600 lg:text-xl">
                {tCommon('documents')}
              </h3>
              <div className="sm:grid-cols-2 grid grid-cols-1 gap-4">
                {dataDetail?.documents?.map((item: any, index: number) => {
                  const fileId =
                    item?.directus_files_id?.id || item?.directus_files_id;
                  const title =
                    item?.directus_files_id?.title ||
                    item?.directus_files_id?.filename_download ||
                    `${tCommon('documents')} ${index + 1}`;
                  const fileSize = item?.directus_files_id?.filesize;

                  return (
                    <Link
                      key={index}
                      href={getAssetUrlById(fileId) + '?download=true'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:border-primary-200 hover:shadow-md"
                    >
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 transition-colors group-hover:bg-primary-100">
                        <Download className="size-6 text-primary-600" />
                      </div>
                      <div className="flex flex-col overflow-hidden">
                        <span className="truncate text-sm font-semibold text-gray-900 lg:text-base">
                          {title}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-primary-600">
                            {tCommon('download')}
                          </span>
                          {fileSize && (
                            <>
                              <span className="size-1 rounded-full bg-gray-300"></span>
                              <span className="text-xs font-medium text-gray-500">
                                {formatFileSize(fileSize)}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {dataDetail?.files && dataDetail?.files?.length > 0 && (
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
              <div className="mt-2 grid grid-cols-2 gap-3 md:mt-3 xl:mt-4 xl:gap-4 2xl:mt-5 2xl:grid-cols-3">
                {dataDetail?.files?.map((item: any, index: number) => (
                  <Link
                    key={index}
                    href={getAssetUrlById(item?.directus_files_id)}
                    data-fancybox="gallery"
                    className="relative block aspect-square overflow-hidden"
                  >
                    <NextImg
                      src={getAssetUrlById(item?.directus_files_id)}
                      alt="gallery"
                      objectFit="cover"
                    />
                  </Link>
                ))}
              </div>
            </Fancybox>
          )}
        </div>

        {/* Sidebar */}
        <div className="sidebar-container relative"></div>
      </div>
    </section>
  );
}
