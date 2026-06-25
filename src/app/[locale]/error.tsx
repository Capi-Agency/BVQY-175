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
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  let errorMessage = t('error-500'); // Default
  if (error.message === '403') {
    errorMessage = t('error-403');
  } else if (error.message === '503') {
    errorMessage = t('error-503');
  } else if (error.message === '404') {
    errorMessage = t('error-404');
  }

  return (
    <section className="padding-top-body">
      <div className="section-title container py-[150px] text-center flex flex-col items-center gap-3 lg:gap-4 xl:gap-5 3xl:gap-6">
        <h2>{errorMessage}</h2>
        <Link href={"/" as any} className="btn-danger">
          {t('return-home')}
        </Link>
      </div>
    </section>
  );
}
