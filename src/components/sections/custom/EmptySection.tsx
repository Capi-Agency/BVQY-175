"use client"
import { useTranslate } from '@/src/hooks/useTranslate';
import React from 'react';

export default function EmptySection() {
  const { trans } = useTranslate();

  return (
    <section className="padding-top-body">
      <div className="section-title container py-[100px] text-center">
        {trans('empty-page')}
      </div>
      ;
    </section>
  );
}
