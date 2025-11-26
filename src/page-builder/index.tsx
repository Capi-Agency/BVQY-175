'use client';
import {
  CommonSection,
  PageContent,
  SectionMap,
} from '@/src/types/pageBuilder';


import {
  Card2Col,
  Card2ColWithBlurb,
  CardSlider,
  CardSliderWithBlurb,
  CardSliderWithLeftRightButton,
} from '../components/sections/card';
import { EmptySection } from '../components/sections/custom';
import { CtaBasic } from '../components/sections/cta';
import { Feature4Col } from '../components/sections/feature';
import {
  GalleryAlternate,
  GalleryWithText,
} from '../components/sections/gallery';
import {
  HeroBackgroundsFocus,
  HeroWithBottomBigImage,
  HeroWithTopImage,
} from '../components/sections/hero';
import {
  InfoBasic,
  InfoBasicR,
  InfoCenterBlock,
  InfoWithFeaturesImage,
  InfoWithLeftImage,
  InfoWithLeftImageTopTitle,
  InfoWithRightImage,
} from '../components/sections/information';
import {
  HotNewsHero,
  NewsDetail,
  NewsListCard,
} from '../components/sections/news';
import {
  NumberNone,
  NumberSplit,
  NumberWithText,
} from '../components/sections/number';
import { Posts3Col } from '../components/sections/post-grid';
import RelatedPosts from '../components/sections/post-grid/RelatedPost';
import { LogoSlider } from '../components/sections/slider';
import { Team4Col, TeamGrid, TeamSlider4Col, TeamSlider5Col } from '../components/sections/team';
import { BreadcrumbBasic } from '../components/sections/breadcrumb';

const sectionMap: SectionMap = {
  // Home page
  'hero-with-top-big-image': HeroWithTopImage,
  'team-slider-5-col': TeamSlider5Col,
  'logo-slider': LogoSlider,
  'posts-3-col': Posts3Col,
  'feature-4-col': Feature4Col,
  'number-none': NumberNone,
  'gallery-with-text': GalleryWithText,

  // About us
  'hero-background-focus': HeroBackgroundsFocus,
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

  // News
  'info-news': HotNewsHero,
  'posts-small-image-3-col': NewsListCard,

  // News detail
  'breadcrumb-basic': BreadcrumbBasic,
  'post-detail-with-sidebar-right': NewsDetail,
  'posts-slider': RelatedPosts,

  // Department detail
  'hero-with-bottom-big-image': HeroWithBottomBigImage,
  'info-with-left-image-top-title': InfoWithLeftImageTopTitle,
  'team-slider-4-col': TeamSlider4Col,
  'card-2-col-with-blurb': Card2ColWithBlurb,
  'number-with-text': NumberWithText,
  'number-split': NumberSplit,
  'info-with-right-image': InfoWithRightImage,
  'info-with-left-image': InfoWithLeftImage,
  'cta-basic': CtaBasic,
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
    return <EmptySection />;
  }
  const sections = pageContent.sections;

  return (
    <>
      <div className="padding-top-body">
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
      </div>
    </>
  );
};

export default PageBuilder;
