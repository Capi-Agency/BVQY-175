'use client';
import { useTranslations } from 'next-intl';
import React from 'react';

export default function EmptySection() {
  const t = useTranslations('Common');

  return (
    <section className="padding-top-body">
      <div className="section-title container py-[100px] text-center">
        {t('empty-page')}
      </div>
    </section>
  );
}
