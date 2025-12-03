import { CommonSection } from '@/src/types/pageBuilder';
import React from 'react';

export default function FaqsOneCol({ data }: CommonSection) {
  return (
    <section className="container py-[120px]">
      <div className="flex flex-col gap-6 md:grid md:grid-cols-[auto,220px] md:flex-row lg:grid-cols-[auto,260px] lg:gap-8 lg:px-6 xl:gap-11 xl:px-[60px] 2xl:gap-12 2xl:px-[100px] 3xl:gap-[60px] 3xl:px-[80px] 4xl:px-[160px]">
        <div className="space-y-8">
          {data?.title && (
            <h1 className="section-title text-primary-600">{data?.title}</h1>
          )}
        </div>
        {/* Sidebar */}
        <div className="sidebar-container relative">
            
        </div>
      </div>
    </section>
  );
}
