import dynamic from 'next/dynamic';
import {
  CommonSection,
  PageContent,
  SectionMap,
} from '@/src/types/pageBuilder';
import { notFound } from 'next/navigation';
import ClientSection from './client-sections';

const clientSection = (type: string) => {
  const Section = (props: any) => <ClientSection type={type} {...props} />;
  Section.displayName = `ClientSection(${type})`;
  return Section;
};

const sectionMap: SectionMap = {
  // Home
  'hero-with-top-big-image': clientSection('hero-with-top-big-image'),
  'feature-with-image-4-col': dynamic(
    () => import('../components/sections/feature/FeatureWithImage4Col'),
  ),
  'team-slider-5-col': dynamic(
    () => import('../components/sections/team/TeamSlider5Col'),
  ),
  'logo-slider': clientSection('logo-slider'),
  'posts-3-col': dynamic(
    () => import('../components/sections/post-grid/Posts3Col'),
  ),
  'feature-4-col': dynamic(
    () => import('../components/sections/feature/Feature4Col'),
  ),
  'number-none': dynamic(
    () => import('../components/sections/number/NumberNone'),
  ),
  'number-grid': dynamic(
    () => import('../components/sections/number/NumberGrid'),
  ),
  'gallery-with-text': clientSection('gallery-with-text'),
  'review-split-with-text': clientSection('review-split-with-text'),

  // About us
  'hero-background-focus-2': dynamic(
    () => import('../components/sections/hero/HeroBackgroundFocus2'),
  ),
  'info-basic': dynamic(
    () => import('../components/sections/information/InfoBasic'),
  ),
  'card-2-col': clientSection('card-2-col'),
  'card-slider': clientSection('card-slider'),
  'info-split-with-features-image': clientSection(
    'info-split-with-features-image',
  ),
  'info-center-block': dynamic(
    () => import('../components/sections/information/InfoCenterBlock'),
  ),
  'info-basic-r': clientSection('info-basic-r'),
  'team-4-col': dynamic(() => import('../components/sections/team/Team4Col')),
  'card-slider-with-l-r-button': clientSection('card-slider-with-l-r-button'),

  // Hospital leader
  'card-slider-with-blurb': clientSection('card-slider-with-blurb'),
  'team-grid': clientSection('team-grid'),
  'gallery-alternate': clientSection('gallery-alternate'),
  'team-3-col': dynamic(() => import('../components/sections/team/Team3Col')),

  // News
  'info-news': clientSection('info-news'),
  'posts-small-image-3-col': clientSection('posts-small-image-3-col'),

  // News detail
  'breadcrumb-basic': clientSection('breadcrumb-basic'),

  'post-detail-with-sidebar-right': clientSection(
    'post-detail-with-sidebar-right',
  ),

  'posts-slider': clientSection('posts-slider'),

  'sidebar-right-basic': clientSection('sidebar-right-basic'),

  // Department detail
  'hero-with-bottom-big-image': dynamic(
    () => import('../components/sections/hero/HeroWithBottomBigImage'),
  ),
  'info-with-left-image-top-title': clientSection(
    'info-with-left-image-top-title',
  ),
  'info-with-right-image-top-title': clientSection(
    'info-with-right-image-top-title',
  ),
  'team-slider-4-col': clientSection('team-slider-4-col'),
  'card-2-col-with-blurb': dynamic(
    () => import('../components/sections/card/Card2ColWithBlurb'),
  ),
  'number-with-text': dynamic(
    () => import('../components/sections/number/NumberWithText'),
  ),
  'number-split': clientSection('number-split'),
  'info-with-right-image': clientSection('info-with-right-image'),
  'info-with-left-image': clientSection('info-with-left-image'),
  'cta-basic': clientSection('cta-basic'),

  // Doctor detail
  'post-detail-with-sidebar-left': dynamic(
    () => import('../components/doctors/DoctorDetail'),
  ),

  // FAQs
  'hero-background-focus': dynamic(
    () => import('../components/sections/hero/HeroBackgroundsFocus'),
  ),

  'faqs-1-col': clientSection('faqs-1-col'),

  // Dành cho người bệnh
  'content-danh-cho-nguoi-benh': clientSection('content-danh-cho-nguoi-benh'),
  'faqs-detail-split': clientSection('faqs-detail-split'),

  // Milestone
  'card-1-col': clientSection('card-1-col'),

  // Khối cơ quan hành chính
  'card-4-col': clientSection('card-4-col'),

  // Cơ sở vật chất
  'gallery-slider-tall': clientSection('gallery-slider-tall'),

  // Search
  custom: clientSection('custom'),

  // PDF view
  'pdf-viewer': dynamic(
    () => import('../components/sections/custom/PDFViewer'),
  ),

  'fancybox-viewer': clientSection('fancybox-viewer'),

  // Thanh tich
  'posts-2-col': clientSection('posts-2-col'),

  // Contact
  'cta-background-image': clientSection('cta-background-image'),
  'card-3-col': dynamic(() => import('../components/sections/card/Card3Col')),
  'cta-with-field': dynamic(
    () => import('../components/sections/cta/CtaWithField'),
  ),
  'embedded-map': dynamic(
    () => import('../components/sections/custom/EmbeddedMap'),
  ),

  // Danh sách bác sĩ
  'hero-text-overlay': clientSection('hero-text-overlay'),
  'team-split-with-filter': clientSection('team-split-with-filter'),

  // Chuyên khoa
  'feature-with-image-3-col': clientSection('feature-with-image-3-col'),
  // Chi tiết khối cơ quan
  'team-2-col': clientSection('team-2-col'),

  'custom-full-size': dynamic(
    () => import('../components/sections/custom/ContentFullSize'),
  ),
};

type PageBuilderProps = {
  pageContent: PageContent;
  pageDetail?: any;
};

const PageBuilder = ({ pageContent, pageDetail }: PageBuilderProps) => {
  if (
    !pageContent ||
    !pageContent?.sections ||
    pageContent.sections.length === 0
  ) {
    notFound();
  }
  const sections = pageContent.sections;

  return (
    <>
      <main className="padding-top-body">
        {sections.map((section: CommonSection, index: number) => {
          const SectionComp = sectionMap[section.type];
          if (!SectionComp) return null;

          return (
            <SectionComp
              key={'section_' + index}
              data={section}
              {...(pageDetail ? { dataDetail: pageDetail } : {})}
            />
          );
        })}
      </main>
    </>
  );
};

export default PageBuilder;
