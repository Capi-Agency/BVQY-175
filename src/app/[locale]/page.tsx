import JsonLDProvider from '@/src/components/common/the-json-ld';
import { getLangSlug, routing } from '@/src/i18n/routing';
import PageBuilder from '@/src/page-builder';
import { fnGetPageBySlug } from '@/src/services/page';
import { createSeoData } from '@/src/utils/metadata';
import { getAssetUrlById } from '@/src/utils/image';
import { Metadata, ResolvingMetadata } from 'next';
import { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import ViewTracker from '@/src/components/ViewTracker';
import { getImageProps } from 'next/image';

export const revalidate = 300;

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale: string) => ({ locale }));
}

export async function generateMetadata(
  { params }: Props,
  _parent: ResolvingMetadata,
): Promise<Metadata> {
  const { locale } = await params;
  if (locale.startsWith('sitemap') || locale.startsWith('favicon') || locale.startsWith('manifest') || locale.startsWith('robots.txt')) {
    const { notFound } = require('next/navigation');
    return notFound();
  }
  const langSlug = await getLangSlug(locale, 'trang-chu');

  const data = await fnGetPageBySlug(langSlug);
  const seo = createSeoData(data?.seo, locale) ?? {};
  return seo;
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  if (locale.startsWith('sitemap') || locale.startsWith('favicon') || locale.startsWith('manifest') || locale.startsWith('robots.txt')) {
    const { notFound } = require('next/navigation');
    return notFound();
  }
  setRequestLocale(locale as Locale);

  const langSlug = await getLangSlug(locale, 'trang-chu');
  const pageContent = await fnGetPageBySlug(langSlug);
  const pageSchema = pageContent?.seo?.meta_schema;

  // ─── LCP preload ───────────────────────────────────────────────────────────
  // Extract the first hero slide's image so we can emit <link rel="preload">
  // from the server – the client-side react-dom preload() runs too late (after
  // JS parse + hydration) and causes the 1,740 ms "element render delay".
  const heroSection = pageContent?.sections?.find(
    (s: any) => s.type === 'hero-with-top-big-image',
  );
  const firstSlide = heroSection?.items?.[0];
  const mobileSrc = firstSlide?.content?.id
    ? getAssetUrlById(firstSlide.content.id)
    : firstSlide?.cover?.id
      ? getAssetUrlById(firstSlide.cover.id)
      : null;
  const desktopSrc = firstSlide?.cover?.id
    ? getAssetUrlById(firstSlide.cover.id)
    : mobileSrc;

  let mobilePreload: { srcSet?: string; src?: string } = {};
  let desktopPreload: { srcSet?: string; src?: string } = {};
  if (mobileSrc) {
    const { props } = getImageProps({
      src: mobileSrc,
      alt: '',
      fill: true,
      sizes: '100vw',
      quality: 75,
    });
    mobilePreload = { srcSet: props.srcSet, src: props.src };
  }
  if (desktopSrc && desktopSrc !== mobileSrc) {
    const { props } = getImageProps({
      src: desktopSrc,
      alt: '',
      fill: true,
      sizes: '100vw',
      quality: 75,
    });
    desktopPreload = { srcSet: props.srcSet, src: props.src };
  } else if (desktopSrc) {
    desktopPreload = mobilePreload;
  }
  // ───────────────────────────────────────────────────────────────────────────

  return (
    <>
      {/* Server-side preload for LCP hero image – beats client-side react-dom/preload */}
      {mobilePreload.srcSet && (
        <link
          rel="preload"
          as="image"
          imageSrcSet={mobilePreload.srcSet}
          imageSizes="100vw"
          fetchPriority="high"
          media="(max-width: 767px)"
        />
      )}
      {desktopPreload.srcSet && (
        <link
          rel="preload"
          as="image"
          imageSrcSet={desktopPreload.srcSet}
          imageSizes="100vw"
          fetchPriority="high"
          media="(min-width: 768px)"
        />
      )}
      <JsonLDProvider pageSchema={pageSchema} />
      <ViewTracker collection="pages" slug={langSlug} />
      <PageBuilder pageContent={pageContent} />
    </>
  );
}
