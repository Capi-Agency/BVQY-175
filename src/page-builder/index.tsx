import {
  CommonSection,
  PageContent,
  SectionMap,
} from '@/src/types/pageBuilder';
import {
  useMetadata,
  MetadataProvider,
} from '@/src/providers/MetadataProvider';

// Direct imports instead of dynamic for Astro compatibility
import {
  HeroWithTopImage,
  HeroBackgroundFocus2,
  HeroBackgroundsFocus,
  HeroWithBottomBigImage,
  HeroTextOverlay,
} from '../components/sections/hero';
import {
  FeatureWithImage4Col,
  Feature4Col,
} from '../components/sections/feature';
import {
  TeamSlider5Col,
  Team4Col,
  TeamGrid,
  Team3Col,
  TeamSlider4Col,
  Team2Col,
} from '../components/sections/team';
import { LogoSlider } from '../components/sections/slider';
import {
  Posts3Col,
  RelatedPost,
  Posts2Col,
} from '../components/sections/post-grid';
import {
  NumberNone,
  NumberGrid,
  NumberWithText,
  NumberSplit,
} from '../components/sections/number';
import {
  GalleryWithText,
  GalleryAlternate,
  GallerySliderTall,
} from '../components/sections/gallery';
import { ReviewSplitWithText } from '../components/sections/review';
import {
  InfoBasic,
  InfoWithFeaturesImage,
  InfoCenterBlock,
  InfoBasicR,
  InfoWithLeftImageTopTitle,
  InfoWithRightImageTopTitle,
  InfoWithRightImage,
  InfoWithLeftImage,
} from '../components/sections/information';
import {
  Card2Col,
  CardSlider,
  CardSliderWithLeftRightButton,
  CardSliderWithBlurb,
  Card2ColWithBlurb,
  Card1Col,
  Card4Col,
  Card3Col,
} from '../components/sections/card';
import { BreadcrumbBasic } from '../components/sections/breadcrumb';
import {
  HotNewsHero,
  NewsListCard,
  NewsDetail,
} from '../components/sections/news';
import {
  CustomSearch,
  SideBarRightBasic,
  ContentDanhChoNguoiBenh,
  PDFViewer,
  FancyboxViewer,
  EmbeddedMap,
  ContentFullSize,
} from '../components/sections/custom';
import { DoctorDetail } from '../components/doctors';
import { FaqsOneCol, FaqsDetailSplit } from '../components/sections/faq';
import {
  CtaBasic,
  CtaBackgroundImage,
  CtaWithField,
} from '../components/sections/cta';
import { DoctorList } from '../components/doctors';
import { DepartmentListPage } from '../components/departments';

const sectionMap: SectionMap = {
  // Home
  'hero-with-top-big-image': HeroWithTopImage,
  'feature-with-image-4-col': FeatureWithImage4Col,
  'team-slider-5-col': TeamSlider5Col,
  'logo-slider': LogoSlider,
  'posts-3-col': Posts3Col,
  'feature-4-col': Feature4Col,
  'number-none': NumberNone,
  'number-grid': NumberGrid,
  'gallery-with-text': GalleryWithText,
  'review-split-with-text': ReviewSplitWithText,

  // About us
  'hero-background-focus-2': HeroBackgroundFocus2,
  'info-basic': InfoBasic,
  'card-2-col': Card2Col,
  'card-slider': CardSlider,
  'info-split-with-features-image': InfoWithFeaturesImage,
  'info-center-block': InfoCenterBlock,
  'info-basic-r': InfoBasicR,
  'team-4-col': Team4Col,
  'card-slider-with-l-r-button': CardSliderWithLeftRightButton,

  // Hospital leader
  'card-slider-with-blurb': CardSliderWithBlurb,
  'team-grid': TeamGrid,
  'gallery-alternate': GalleryAlternate,
  'team-3-col': Team3Col,

  // News
  'info-news': HotNewsHero,
  'posts-small-image-3-col': NewsListCard,

  // News detail
  'breadcrumb-basic': BreadcrumbBasic,
  'post-detail-with-sidebar-right': NewsDetail,
  'posts-slider': RelatedPost,
  'sidebar-right-basic': SideBarRightBasic,

  // Department detail
  'hero-with-bottom-big-image': HeroWithBottomBigImage,
  'info-with-left-image-top-title': InfoWithLeftImageTopTitle,
  'info-with-right-image-top-title': InfoWithRightImageTopTitle,
  'team-slider-4-col': TeamSlider4Col,
  'card-2-col-with-blurb': Card2ColWithBlurb,
  'number-with-text': NumberWithText,
  'number-split': NumberSplit,
  'info-with-right-image': InfoWithRightImage,
  'info-with-left-image': InfoWithLeftImage,
  'cta-basic': CtaBasic,

  // Doctor detail
  'post-detail-with-sidebar-left': DoctorDetail,

  // FAQs
  'hero-background-focus': HeroBackgroundsFocus,
  'faqs-1-col': FaqsOneCol,

  // Dành cho người bệnh
  'content-danh-cho-nguoi-benh': ContentDanhChoNguoiBenh,
  'faqs-detail-split': FaqsDetailSplit,

  // Milestone
  'card-1-col': Card1Col,

  // Khối cơ quan hành chính
  'card-4-col': Card4Col,

  // Cơ sở vật chất
  'gallery-slider-tall': GallerySliderTall,

  // Search
  custom: CustomSearch,

  // PDF view
  'pdf-viewer': PDFViewer,
  'fancybox-viewer': FancyboxViewer,

  // Thanh tich
  'posts-2-col': Posts2Col,

  // Contact
  'cta-background-image': CtaBackgroundImage,
  'card-3-col': Card3Col,
  'cta-with-field': CtaWithField,
  'embedded-map': EmbeddedMap,

  // Danh sách bác sĩ
  'hero-text-overlay': HeroTextOverlay,
  'team-split-with-filter': DoctorList,

  // Chuyên khoa
  'feature-with-image-3-col': DepartmentListPage,

  // Chi tiết khối cơ quan
  'team-2-col': Team2Col,
  'custom-full-size': ContentFullSize,
};

type PageBuilderProps = {
  pageContent: PageContent;
  pageDetail?: any;
  metadata?: any;
};

const PageBuilder = ({
  pageContent,
  pageDetail,
  metadata: propMetadata,
}: PageBuilderProps) => {
  const contextMetadata = useMetadata();
  const metadata = propMetadata || contextMetadata;

  if (
    !pageContent ||
    !pageContent?.sections ||
    pageContent.sections.length === 0
  ) {
    // In Astro, we can't use Next.js notFound(), just return null or throw
    return null;
  }
  const sections = pageContent.sections;

  return (
    <MetadataProvider value={metadata}>
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
    </MetadataProvider>
  );
};

export default PageBuilder;
