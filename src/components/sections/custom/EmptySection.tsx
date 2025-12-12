"use client"
import useTranslation from '@/src/hooks/use-translation';
import React from 'react';

export default function EmptySection() {
  const { trans } = useTranslation();

  return (
    <section className="padding-top-body">
      <div className="section-title container py-[100px] text-center">
        {trans('empty-page')}
      </div>
    </section>
  );
}
