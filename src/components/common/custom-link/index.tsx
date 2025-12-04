'use client';

import Link from 'next/link';
import React from 'react';
import useStoreLanguage from '@/src/store/store';

interface CustomLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const CustomLink = React.forwardRef<HTMLAnchorElement, CustomLinkProps>(
  ({ href = '', children, className = '', ...props }, ref) => {
    const language = useStoreLanguage((state) => state.language);

    if (href.startsWith('http')) {
      return (
        <Link
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
          ref={ref}
          {...props}
        >
          {children}
        </Link>
      );
    }

    const localizedHref = `/${language}${href.startsWith('/') ? href : `/${href}`}`;

    return (
      <Link href={localizedHref} ref={ref} className={className} {...props}>
        {children}
      </Link>
    );
  },
);

CustomLink.displayName = 'CustomLink';
export default CustomLink;
