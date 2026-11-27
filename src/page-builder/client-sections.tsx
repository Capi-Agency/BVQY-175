'use client';
import dynamic from 'next/dynamic';

// One chunk per section (see page-builder/index.tsx).
const sections: Record<string, any> = {
  'hero-with-top-big-image': dynamic(() => import('../components/sections/hero/HeroWithTopImage')),
  'logo-slider': dynamic(() => import('../components/sections/slider/LogoSlider')),
  'gallery-with-text': dynamic(() => import('../components/sections/gallery/GalleryWithText')),
  'review-split-with-text': dynamic(() => import('../components/sections/review/ReviewSplitWithText')),
  'card-2-col': dynamic(() => import('../components/sections/card/Card2Col')),
  'card-slider': dynamic(() => import('../components/sections/card/CardSlider')),
  'info-split-with-features-image': dynamic(() => import('../components/sections/information/InfoWithFeaturesImage')),
  'info-basic-r': dynamic(() => import('../components/sections/information/InfoBasicR')),
  'card-slider-with-l-r-button': dynamic(() => import('../components/sections/card/CardSliderWithLeftRightButton')),
  'card-slider-with-blurb': dynamic(() => import('../components/sections/card/CardSliderWithBlurb')),
  'team-grid': dynamic(() => import('../components/sections/team/TeamGrid')),
  'gallery-alternate': dynamic(() => import('../components/sections/gallery/GalleryAlternate')),
  'info-news': dynamic(() => import('../components/sections/news/HotNewsHero')),
  'posts-small-image-3-col': dynamic(() => import('../components/sections/news/NewsListCard')),
  'breadcrumb-basic': dynamic(() => import('../components/sections/breadcrumb/BreadcrumbBasic')),
  'post-detail-with-sidebar-right': dynamic(() => import('../components/sections/news/NewsDetail')),
  'posts-slider': dynamic(() => import('../components/sections/post-grid/RelatedPost')),
  'sidebar-right-basic': dynamic(() => import('../components/sections/custom/SideBarRightBasic')),
  'info-with-left-image-top-title': dynamic(() => import('../components/sections/information/InfoWithLeftImageTopTitle')),
  'info-with-right-image-top-title': dynamic(() => import('../components/sections/information/InfoWithRightImageTopTitle')),
  'team-slider-4-col': dynamic(() => import('../components/sections/team/TeamSlider4Col')),
  'number-split': dynamic(() => import('../components/sections/number/NumberSplit')),
  'info-with-right-image': dynamic(() => import('../components/sections/information/InfoWithRightImage')),
  'info-with-left-image': dynamic(() => import('../components/sections/information/InfoWithLeftImage')),
  'cta-basic': dynamic(() => import('../components/sections/cta/CtaBasic')),
  'faqs-1-col': dynamic(() => import('../components/sections/faq/FaqsOneCol')),
  'content-danh-cho-nguoi-benh': dynamic(() => import('../components/sections/custom/ContentDanhChoNguoiBenh')),
  'faqs-detail-split': dynamic(() => import('../components/sections/faq/FaqsDetailSplit')),
  'card-1-col': dynamic(() => import('../components/sections/card/Card1Col')),
  'card-4-col': dynamic(() => import('../components/sections/card/Card4Col')),
  'gallery-slider-tall': dynamic(() => import('../components/sections/gallery/GallerySliderTall')),
  'custom': dynamic(() => import('../components/sections/custom/CustomSearch')),
  'fancybox-viewer': dynamic(() => import('../components/sections/custom/FancyboxViewer')),
  'posts-2-col': dynamic(() => import('../components/sections/post-grid/Posts2Col')),
  'cta-background-image': dynamic(() => import('../components/sections/cta/CtaBackgroundImage')),
  'hero-text-overlay': dynamic(() => import('../components/sections/hero/HeroTextOverlay')),
  'team-split-with-filter': dynamic(() => import('../components/doctors/DoctorList')),
  'feature-with-image-3-col': dynamic(() => import('../components/departments/DepartmentListPage')),
  'team-2-col': dynamic(() => import('../components/sections/team/Team2Col')),
};

export default function ClientSection({ type, ...props }: { type: string } & Record<string, any>) {
  const Section = sections[type];
  return Section ? <Section {...props} /> : null;
}
