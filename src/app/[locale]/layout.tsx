import React, { Suspense } from 'react';
import '../../styles/globals.css';
import '../../styles/swiper-custom.css';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from '../../providers/theme-provider';
import { fnGetMetadata } from '../../services/metadata';
import { MetadataProvider } from '../../providers/MetadataProvider';
import 'react-toastify/dist/ReactToastify.css';
import { GsapMatchMediaProvider } from '../../providers/GsapMatchMediaProvider';
import { ScrollSmootherProvider } from '../../providers/ScrollSmootherProvider';
import ScrollSmoothWrapper from '../../components/animation/ScrollSmoothWrapper';
import TheHeader from '../../components/common/the-header';
import TheFooter from '../../components/common/the-footer';
import BackToTop from '../../components/common/back-to-top';
import ReCaptchatProvider from '@/src/providers/GoogleRecaptchaProvider';
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/src/i18n/routing';

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
  const metadata = await fnGetMetadata();
  const messages = await getMessages({ locale });


  return (
    <html lang={locale} suppressHydrationWarning>
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

        <link rel="manifest" href="/manifest.json" />
        <meta
          name="msapplication-TileImage"
          content="/assets/logo/logo-icon-270x270.png"
        ></meta>

        <meta name="robots" content="index" />
        <meta name="format-detection" content="telephone=no" />
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
        <ReCaptchatProvider>
          <NextIntlClientProvider messages={messages}>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
              <MetadataProvider value={metadata}>
                <GsapMatchMediaProvider>
                  <ScrollSmootherProvider>
                    <Suspense fallback={<></>}>
                      <TheHeader />
                    </Suspense>
                    <BackToTop />
                    {/* <ScrollSmoothWrapper> */}
                    {children}
                    <TheFooter />
                    {/* </ScrollSmoothWrapper> */}
                  </ScrollSmootherProvider>
                </GsapMatchMediaProvider>
              </MetadataProvider>
            </ThemeProvider>
          </NextIntlClientProvider>
        </ReCaptchatProvider>
      </body>
    </html>
  );
}
