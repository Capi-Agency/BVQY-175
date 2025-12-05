'use client';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import Link from 'next/link';
import React from 'react';
import useStoreLanguage from '@/src/store/store';

interface CustomLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  asNavigationLink?: boolean;
  className?: string;
}

const CustomLink = React.forwardRef<HTMLAnchorElement, CustomLinkProps>(
  ({ href = '', children, className = '', asNavigationLink = false, ...props }, ref) => {
    const language = useStoreLanguage((state) => state.language);
    const isExternal = href.startsWith('http');
    const localizedHref = isExternal
      ? href
      : `/${language}${href.startsWith('/') ? href : `/${href}`}`;

    const Wrapper = asNavigationLink ? NavigationMenu.Link : React.Fragment;
    const wrapperProps = asNavigationLink ? { asChild: true } : {};

    return (
      <Wrapper {...wrapperProps}>
        <Link
          href={localizedHref}
          target={isExternal ? '_blank' : "_parent"}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className={className}
          ref={ref}
          {...props}
        >
          {children}
        </Link>
      </Wrapper>
    );
  }
);

CustomLink.displayName = 'CustomLink';
export default CustomLink;
