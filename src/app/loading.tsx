'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Progress } from 'radix-ui';
import NextImg from '../components/common/next-img';

export default function Loading() {
  const [loading, setLoading] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const pathname = usePathname();

  useEffect(() => {
    const progressTimer = setTimeout(() => {
      setProgress(100);
    }, 500);

    // Loading completion
    const loadingTimer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => {
      clearTimeout(progressTimer);
      clearTimeout(loadingTimer);
    };
  }, [pathname]);

  return (
    <div
      className={`fixed left-0 top-0 z-[9999] h-screen w-full bg-primary-500 ${
        loading ? 'block' : 'hidden'
      }`}
    >
      <div className="flex h-full flex-col items-center justify-center gap-8 md:gap-10 lg:gap-12 lg:pb-12 md:pb-10 2xl:gap-14 pb-8 2xl:pb-14">
        <div className="relative h-[72px] w-[295px] lg:h-[88px] lg:w-[361px] 2xl:h-[108px] 2xl:w-[443px] 4xl:h-[132px] 4xl:w-[542px]">
          <img
            src="/assets/logo/secondary_logo.svg"
            alt="175 hospital logo"
            fetchPriority="high"
            loading="eager"
            className='absolute size-full'
          />
        </div>

        <div>
          <Progress.Root
            className="bg-blackA6 relative h-[2px] w-[320px] md:w-[650px] lg:w-[800px] xl:w-[1000px] 2xl:w-[1100px] 4xl:w-[1200px] overflow-hidden rounded-full"
            style={{
              transform: 'translateZ(0)',
            }}
            value={progress}
          >
            <Progress.Indicator
              className="ease-[cubic-bezier(0.65, 0, 0, 0.35, 1)] size-full bg-white transition-transform duration-500"
              style={{ transform: `translateX(-${100 - progress}%)` }}
            />
          </Progress.Root>
        </div>
      </div>
    </div>
  );
}
