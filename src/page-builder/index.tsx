'use client';
import {
  CommonSection,
  PageContent,
  SectionMap,
} from '@/src/types/pageBuilder';
import TheHeader from '../components/common/the-header';
import TheFooter from '../components/common/the-footer';
import TeamSlider5Col from '../components/sections/team/TeamSlider5Col';
import LogoSlider from '@/src/components/sections/slider/LogoSlider';
import Posts3Col from '@/src/components/sections/post-grid/Posts3Col';
import Feature4Col from '../components/sections/feature/Feature4Col';
import NumberNone from '../components/sections/number/NumberNone';
import GalleryWithText from '../components/sections/gallery/GalleryWithText';
import HeroWithTopImage from '../components/sections/hero/HeroWithTopImage';
import HeroBackgroundsFocus from '../components/sections/hero/HeroBackgroundsFocus';
import InfoBasic from '../components/sections/information/InfoBasic';
import Card2Col from '../components/sections/card/Card2Col';
import EmptySection from '../components/sections/custom/EmptySection';
import CardSlider from '@/src/components/sections/card/CardSlider';
import InforWIthFeatureImage from '@/src/components/sections/information/InforWIthFeatureImage';
import InfoCenterBlock from '../components/sections/information/InfoCenterBlock';
import InfoBasicR from '../components/sections/information/InfoBasicR';
import Team4Col from '../components/sections/team/Team4Col';
import CardSliderWithLeftRightButton from '../components/sections/card/CardSliderWithLeftRightButton';
import CardSliderWithBlurb from '../components/sections/card/CardSliderWithBlurb';

const headerMap: SectionMap = {
  'top-nav': TheHeader,
};

const footerMap: SectionMap = {
  'bottom-nav': TheFooter,
};

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
  'info-split-with-features-image': InforWIthFeatureImage,
  'info-center-block': InfoCenterBlock,
  'info-basic-r': InfoBasicR,
  'team-4-col': Team4Col,
  'card-slider-with-l-r-button': CardSliderWithLeftRightButton,

  // Hospital leader
  'card-slider-with-blurb': CardSliderWithBlurb
};

type PageBuilderProps = {
  pageContent: PageContent;
};

const PageBuilder = ({ pageContent }: PageBuilderProps) => {
  if (
    !pageContent ||
    !pageContent?.sections ||
    pageContent.sections.length === 0
  ) {
    return <EmptySection />;
  }
  const sections = pageContent.sections;

  // const headerSlug = pageContent?.top_navigation?.slug;
  // const HeaderComp = headerSlug ? headerMap[headerSlug] : null;

  // const footerSlug = pageContent?.bottom_navigation?.slug;
  // const FooterComp = footerSlug ? footerMap[footerSlug] : null;

  return (
    <>
      {/* {HeaderComp && <HeaderComp data={pageContent?.top_navigation} />} */}

      <div className="padding-top-body">
        {sections.map((section: CommonSection, index: number) => {
          const SectionComp = sectionMap[section.type];
          if (!SectionComp) return null;

          return <SectionComp key={'section_' + index} data={section} />;
        })}
      </div>

      {/* {FooterComp && <FooterComp data={pageContent?.bottom_navigation} />} */}
    </>
  );
};

export default PageBuilder;
