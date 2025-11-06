import React from 'react';
import '../styles/globals.css';
import '../styles/swiper-custom.css';

import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from '../providers/theme-provider';
import { fnGetMetadata } from '../services/metadata';
import { MetadataProvider } from '../providers/MetadataProvider';
import 'react-toastify/dist/ReactToastify.css';
import TheHeader from '@/src/components/common/the-header';
import TheFooter from '@/src/components/common/the-footer';
import { Plus_Jakarta_Sans } from 'next/font/google';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['vietnamese', 'latin'],
  display: 'swap',
  preload: true,
  style: ['normal', 'italic'],
  variable: '--font-plus-jakarta-san',
  weight: ['300', '400', '500', '600', '700', '800'],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const metadata = await fnGetMetadata();

  return (
    <html
      lang="vi"
      suppressHydrationWarning
      className={plusJakartaSans.className}
    >
      <head>
        <link rel="icon" href="/assets/logo/favicon.ico" sizes="any" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/logo/logo-icon-32x32.png"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/assets/logo/logo-icon-192x192.png"
        ></link>
        <link
          rel="apple-touch-icon"
          type="image/png"
          sizes="180x180"
          href="/assets/logo/logo-apple-touch-icon-180x180.png"
        ></link>
        <link rel="manifest" href="/manifest.json" />

        <meta
          name="msapplication-TileImage"
          content="/assets/logo/logo-icon-270x270.png"
        ></meta>

        <meta name="robots" content="index" />
      </head>

      <body className="antialiased">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={true}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          closeButton={false}
          className={'z-[99999] text-sm'}
        />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <MetadataProvider value={metadata}>
            {children}
          </MetadataProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
