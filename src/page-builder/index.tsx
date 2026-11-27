
import dynamic from 'next/dynamic';
import {
  CommonSection,
  PageContent,
  SectionMap,
} from '@/src/types/pageBuilder';
import { notFound } from 'next/navigation';

const sectionMap: SectionMap = {
  // Home
  'hero-with-top-big-image': dynamic(() =>
    import('../components/sections/hero/HeroWithTopImage'),
  ),
  'feature-with-image-4-col': dynamic(() =>
    import('../components/sections/feature/FeatureWithImage4Col'),
  ),
  'team-slider-5-col': dynamic(() =>
    import('../components/sections/team/TeamSlider5Col'),
  ),
  'logo-slider': dynamic(() =>
    import('../components/sections/slider/LogoSlider'),
  ),
  'posts-3-col': dynamic(() =>
    import('../components/sections/post-grid/Posts3Col'),
  ),
  'feature-4-col': dynamic(() =>
    import('../components/sections/feature/Feature4Col'),
  ),
  'number-none': dynamic(() =>
    import('../components/sections/number/NumberNone'),
  ),
  'number-grid': dynamic(() =>
    import('../components/sections/number/NumberGrid'),
  ),
  'gallery-with-text': dynamic(() =>
    import('../components/sections/gallery/GalleryWithText'),
  ),
  'review-split-with-text': dynamic(() =>
    import('../components/sections/review/ReviewSplitWithText'),
  ),

  // About us
  'hero-background-focus-2': dynamic(() =>
    import('../components/sections/hero/HeroBackgroundFocus2'),
  ),
  'info-basic': dynamic(() =>
    import('../components/sections/information/InfoBasic'),
  ),
  'card-2-col': dynamic(() =>
    import('../components/sections/card/Card2Col'),
  ),
  'card-slider': dynamic(() =>
    import('../components/sections/card/CardSlider'),
  ),
  'info-split-with-features-image': dynamic(() =>
    import('../components/sections/information/InfoWithFeaturesImage'),
  ),
  'info-center-block': dynamic(() =>
    import('../components/sections/information/InfoCenterBlock'),
  ),
  'info-basic-r': dynamic(() =>
    import('../components/sections/information/InfoBasicR'),
  ),
  'team-4-col': dynamic(() =>
    import('../components/sections/team/Team4Col'),
  ),
  'card-slider-with-l-r-button': dynamic(() =>
    import('../components/sections/card/CardSliderWithLeftRightButton'),
  ),

  // Hospital leader
  'card-slider-with-blurb': dynamic(() =>
    import('../components/sections/card/CardSliderWithBlurb'),
  ),
  'team-grid': dynamic(() =>
    import('../components/sections/team/TeamGrid'),
  ),
  'gallery-alternate': dynamic(() =>
    import('../components/sections/gallery/GalleryAlternate'),
  ),
  'team-3-col': dynamic(() =>
    import('../components/sections/team/Team3Col'),
  ),

  // News
  'info-news': dynamic(() =>
    import('../components/sections/news/HotNewsHero'),
  ),
  'posts-small-image-3-col': dynamic(() =>
    import('../components/sections/news/NewsListCard'),
  ),

  // News detail
  'breadcrumb-basic': dynamic(() =>
    import('../components/sections/breadcrumb/BreadcrumbBasic'),
  ),

  'post-detail-with-sidebar-right': dynamic(() =>
    import('../components/sections/news/NewsDetail'),
  ),

  'posts-slider': dynamic(() =>
    import('../components/sections/post-grid/RelatedPost'),
  ),

  'sidebar-right-basic': dynamic(() =>
    import('../components/sections/custom/SideBarRightBasic'),
  ),

  // Department detail
  'hero-with-bottom-big-image': dynamic(() =>
    import('../components/sections/hero/HeroWithBottomBigImage'),
  ),
  'info-with-left-image-top-title': dynamic(() =>
    import('../components/sections/information/InfoWithLeftImageTopTitle'),
  ),
  'info-with-right-image-top-title': dynamic(() =>
    import('../components/sections/information/InfoWithRightImageTopTitle'),
  ),
  'team-slider-4-col': dynamic(() =>
    import('../components/sections/team/TeamSlider4Col'),
  ),
  'card-2-col-with-blurb': dynamic(() =>
    import('../components/sections/card/Card2ColWithBlurb'),
  ),
  'number-with-text': dynamic(() =>
    import('../components/sections/number/NumberWithText'),
  ),
  'number-split': dynamic(() =>
    import('../components/sections/number/NumberSplit'),
  ),
  'info-with-right-image': dynamic(() =>
    import('../components/sections/information/InfoWithRightImage'),
  ),
  'info-with-left-image': dynamic(() =>
    import('../components/sections/information/InfoWithLeftImage'),
  ),
  'cta-basic': dynamic(() =>
    import('../components/sections/cta/CtaBasic'),
  ),

  // Doctor detail
  'post-detail-with-sidebar-left': dynamic(() =>
    import('../components/doctors/DoctorDetail'),
  ),

  // FAQs
  'hero-background-focus': dynamic(() =>
    import('../components/sections/hero/HeroBackgroundsFocus'),
  ),

  'faqs-1-col': dynamic(() =>
    import('../components/sections/faq/FaqsOneCol'),
  ),

  // Dành cho người bệnh
  'content-danh-cho-nguoi-benh': dynamic(() =>
    import('../components/sections/custom/ContentDanhChoNguoiBenh'),
  ),
  'faqs-detail-split': dynamic(() =>
    import('../components/sections/faq/FaqsDetailSplit'),
  ),

  // Milestone
  'card-1-col': dynamic(() =>
    import('../components/sections/card/Card1Col'),
  ),

  // Khối cơ quan hành chính
  'card-4-col': dynamic(() =>
    import('../components/sections/card/Card4Col'),
  ),

  // Cơ sở vật chất
  'gallery-slider-tall': dynamic(() =>
    import('../components/sections/gallery/GallerySliderTall'),
  ),

  // Search
  custom: dynamic(() =>
    import('../components/sections/custom/CustomSearch'),
  ),

  // PDF view
  'pdf-viewer': dynamic(() =>
    import('../components/sections/custom/PDFViewer'),
  ),

  'fancybox-viewer': dynamic(() =>
    import('../components/sections/custom/FancyboxViewer'),
  ),

  // Thanh tich
  'posts-2-col': dynamic(() =>
    import('../components/sections/post-grid/Posts2Col'),
  ),

  // Contact
  'cta-background-image': dynamic(() =>
    import('../components/sections/cta/CtaBackgroundImage'),
  ),
  'card-3-col': dynamic(() =>
    import('../components/sections/card/Card3Col'),
  ),
  'cta-with-field': dynamic(() =>
    import('../components/sections/cta/CtaWithField'),
  ),
  'embedded-map': dynamic(() =>
    import('../components/sections/custom/EmbeddedMap'),
  ),

  // Danh sách bác sĩ
  'hero-text-overlay': dynamic(() =>
    import('../components/sections/hero/HeroTextOverlay'),
  ),
  'team-split-with-filter': dynamic(() =>
    import('../components/doctors/DoctorList'),
  ),

  // Chuyên khoa
  'feature-with-image-3-col': dynamic(() =>
    import('../components/departments/DepartmentListPage'),
  ),
  // Chi tiết khối cơ quan
  'team-2-col': dynamic(() =>
    import('../components/sections/team/Team2Col'),
  ),

  'custom-full-size': dynamic(() =>
    import('../components/sections/custom/ContentFullSize'),
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
