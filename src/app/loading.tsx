import React from 'react';
import NextImg from '../components/common/next-img';

export default function Loading() {
  return (
    <div className="fixed left-0 top-0 z-[9998] flex h-screen w-full items-center justify-center bg-white/20">
      <div className="relative size-6 animate-spin md:size-7 xl:size-9 3xl:size-10">
        <NextImg src="/assets/icons/loading_spin.svg" alt="loading spin" />
      </div>
    </div>
  );
}
