import React, { Suspense } from 'react';
import '../../styles/globals.css';

import { ThemeProvider } from '../../providers/theme-provider';
import { fnGetMetadata } from '../../services/metadata';
import { MetadataProvider } from '../../providers/MetadataProvider';
import { GsapMatchMediaProvider } from '../../providers/GsapMatchMediaProvider';
import { ScrollSmootherProvider } from '../../providers/ScrollSmootherProvider';
import TheHeader from '../../components/common/the-header';
import TheFooter from '../../components/common/the-footer';
import BackToTop from '../../components/common/back-to-top';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/src/i18n/routing';
import { LoadingComp } from '@/src/components/sections/custom';
import Loading from '../loading';
import localFont from 'next/font/local';
import LazyToastContainer from '../../components/common/lazy-toast-container';
import ReCaptchatProvider from '@/src/providers/GoogleRecaptchaProvider';

const plusJakartaSans = localFont({
  src: [
    {
      path: '../../../public/assets/fonts/Plus-Jakarta/PlusJakartaSans-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/assets/fonts/Plus-Jakarta/PlusJakartaSans-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../../public/assets/fonts/Plus-Jakarta/PlusJakartaSans-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../../public/assets/fonts/Plus-Jakarta/PlusJakartaSans-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../../public/assets/fonts/Plus-Jakarta/PlusJakartaSans-ExtraBold.woff2',
      weight: '800',
      style: 'normal',
    },
  ],
  display: 'swap',
  preload: true,
  fallback: ['Arial', 'sans-serif'],
  variable: '--font-plus-jakarta-sans',
});

export const revalidate = 300;

export function generateStaticParams() {
  return routing.locales.map((locale: string) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const metadata = await fnGetMetadata(locale);
  const messages = await getMessages({ locale });

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={plusJakartaSans.className}
    >
      <head>
        <link rel="icon" href="/assets/logo/favicon.ico" sizes="any" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/logo/favicon-16x16.png"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/logo/favicon-32x32.png"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/assets/logo/android-chrome-192x192.png"
        ></link>
        <link
          rel="apple-touch-icon"
          type="image/png"
          sizes="180x180"
          href="/assets/logo/apple-touch-icon-180x180.png"
        ></link>

        <link rel="manifest" href="/manifest.webmanifest" fetchPriority="low" />
        <link rel="dns-prefetch" href="//www.google.com" />
        <link rel="preconnect" href="//www.google.com" crossOrigin="anonymous" />
        <meta
          name="msapplication-TileImage"
          content="/assets/logo/logo-icon-270x270.png"
        ></meta>

        <meta name="robots" content="index" />
        <meta name="format-detection" content="telephone=no" />
      </head>

      <body className="antialiased">
        <LazyToastContainer
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
        <ReCaptchatProvider>
          <MetadataProvider value={metadata}>
            <NextIntlClientProvider messages={messages}>
              <ThemeProvider
                attribute="class"
                defaultTheme="light"
                enableSystem
              >
                <GsapMatchMediaProvider>
                  <ScrollSmootherProvider>
                    <Loading />
                    <TheHeader />
                    <Suspense fallback={<LoadingComp />}>
                      <BackToTop />
                      {children}
                    </Suspense>
                    <TheFooter />
                  </ScrollSmootherProvider>
                </GsapMatchMediaProvider>
              </ThemeProvider>
            </NextIntlClientProvider>
          </MetadataProvider>
        </ReCaptchatProvider>
      </body>
    </html>
  );
}
