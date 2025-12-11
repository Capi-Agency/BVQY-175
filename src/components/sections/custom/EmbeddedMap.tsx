'use client';
import { useTranslate } from '@/src/hooks/useTranslate';
import { CommonSection } from '@/src/types/pageBuilder';
import React from 'react';

export default function EmbeddedMap({ data }: CommonSection) {
  return (
    <div
      className="3xl:py-[100px container py-10 md:py-6 lg:py-10 xl:py-[60px] 2xl:py-[80px] 3xl:py-[100px]"
      dangerouslySetInnerHTML={{
        __html: data?.blurb,
      }}
    ></div>
  );
}
