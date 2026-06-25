'use client';

import { Link } from '@/src/i18n/navigation';
import { useTranslations } from 'next-intl';
import React, { useEffect } from 'react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('Common');

  useEffect(() => {
    console.error(error);
  }, [error]);

  let errorTitle = t('error-500-title'); // Default
  let errorSubtitle = t('error-500-subtitle');
  let is5xx = true;
  if (error.message.includes('403')) {
    errorTitle = t('error-403-title');
    errorSubtitle = t('error-403-subtitle');
    is5xx = false;
  } else if (error.message.includes('503')) {
    errorTitle = t('error-503-title');
    errorSubtitle = t('error-503-subtitle');
  } else if (error.message.includes('429')) {
    errorTitle = t('error-429-title');
    errorSubtitle = t('error-429-subtitle');
    is5xx = false;
  } else if (error.message.includes('404')) {
    errorTitle = t('error-404-title');
    errorSubtitle = t('error-404-subtitle');
    is5xx = false;
  }

  return (
    <section className="padding-top-body">
      <div className="section-title container py-[150px] text-center flex flex-col items-center gap-3 lg:gap-4 xl:gap-5 3xl:gap-6">
        <h2>{errorTitle}</h2>
        <p className="text-gray-500 text-base md:text-lg max-w-2xl">{errorSubtitle}</p>
        {!is5xx && (
          <Link href={"/" as any} className="btn-danger mt-2">
            {t('return-home')}
          </Link>
        )}
      </div>
    </section>
  );
}
