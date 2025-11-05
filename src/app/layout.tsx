import { METADATA } from '@/src/utils/const';
import type { Metadata } from 'next';
import React from 'react';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: METADATA.DEFAULT_META_TITLE,
  description: METADATA.DEFAULT_META_DESCRIPTION,
  keywords: METADATA.DEFAULT_META_KEYWORDS,
  openGraph: {
    title: METADATA.DEFAULT_OG_TITLE,
    description: METADATA.DEFAULT_OG_DESCRIPTION,
    images: METADATA.DEFAULT_OG_IMAGE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="antialiased">{children}</body>
    </html>
  );
}
