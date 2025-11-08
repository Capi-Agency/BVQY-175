'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export const AnimatedLink = ({
  href,
  children,
  className,
  ...props
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const { contextSafe } = useGSAP(() => {});
  
  const handleClick = contextSafe((e: React.MouseEvent) => {
    e.preventDefault();
    if (href === pathname) {
      // router.push(href);
    } else {
      gsap.to('.header-primary', {
        yPercent: -100,
        opacity: 0,
        duration: 0.3,
        ease: 'power1.inOut',
        onStart: () => router.push(href),
      });
    }
  });

  return (
    <Link href={href} className={className} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
};
