'use client';
import { useEffect, useState } from 'react';
import { Progress } from 'radix-ui';

export default function Loading() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const alreadyLoaded = sessionStorage.getItem('hasLoaded');
    if (alreadyLoaded) return; // không hiển thị nữa

    setLoading(true);
    sessionStorage.setItem('hasLoaded', 'true');

    const timer1 = setTimeout(() => setProgress(100), 500);
    const timer2 = setTimeout(() => setLoading(false), 1000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div
      className={`fixed left-0 top-0 z-[9999] h-screen w-full bg-primary-500 ${
        loading ? 'block' : 'hidden'
      }`}
    >
      <div className="flex h-full flex-col items-center justify-center gap-8 pb-8 md:gap-10 md:pb-10 lg:gap-12 lg:pb-12 2xl:gap-14 2xl:pb-14">
        <div className="relative h-[72px] w-[295px] lg:h-[88px] lg:w-[361px] 2xl:h-[108px] 2xl:w-[443px] 4xl:h-[132px] 4xl:w-[542px]">
          <img
            src="/assets/logo/secondary_logo.svg"
            alt="175 hospital logo"
            fetchPriority="high"
            loading="eager"
            className="absolute size-full"
          />
        </div>

        <div className="container">
          <Progress.Root
            className="relative h-[2px] w-full overflow-hidden rounded-full"
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
