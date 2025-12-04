'use client';
import React, { useRef } from 'react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import { useGSAP } from '@gsap/react';
import { usePathname } from 'next/navigation';
import NextImg from '../next-img';

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin);

export default function BackToTop() {
  const containerRef = useRef<any>(null);
  const backToTopRef = useRef<any>(null);
  const pathname = usePathname();

  const { contextSafe } = useGSAP(
    () => {
      if (!containerRef.current || !backToTopRef.current) return;
      gsap.set(backToTopRef.current, {
        xPercent: 200,
        opacity: 1,
      });

      ScrollTrigger.create({
        start: 100,
        onEnter: () => {
          gsap.to(backToTopRef.current, {
            xPercent: 0,
            duration: 0.5,
            ease: 'power2.out',
          });
        },

        onLeaveBack: () => {
          gsap.to(backToTopRef.current, {
            xPercent: 200,
            duration: 0.5,
            ease: 'power2.out',
          });
        },
      });
    },
    { scope: containerRef, dependencies: [pathname] },
  );

  const handleScrollTo = contextSafe(() => {
    gsap.to(backToTopRef.current, {
      keyframes: {
        scale: [0.9, 1],
      },
      ease: 'bounce',
      duration: 1.5,
    });
    gsap.to(window, {
      scrollTo: {
        y: 0,
        autoKill: false,
      },
      duration: 1.5,
      ease: 'power3.out',
    });
  });

  return (
    <div ref={containerRef}>
      <div
        ref={backToTopRef}
        onClick={() => handleScrollTo()}
        className="fixed bottom-3 right-3 md:right-5 md:bottom-5 z-50 flex size-10 cursor-pointer items-center justify-center rounded-full bg-white opacity-0 hover:bg-primary-100 lg:size-11 xl:size-12 3xl:size-14"
        style={{
          boxShadow:
            '0 10px 12.5px -2.5px rgba(18, 26, 43, 0.05), 0 3.333px 5px -2.5px rgba(18, 26, 43, 0.05)',
        }}
      >
        <div className="relative size-5 -rotate-90 lg:size-6">
          <NextImg
            src="/assets/icons/arrow_right_black.svg"
            alt="arrow_right_black"
          />
        </div>
      </div>
    </div>
  );
}
