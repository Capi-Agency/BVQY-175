import {
  BannerOne,
  BannerThree,
  BannerTwo,
} from '@/src/components/sections/banner';
import { BoxOne, BoxTwo } from '@/src/components/sections/boxed-banner';
import {
  MapEmbedOne,
  YoutubeEmbedOne,
} from '@/src/components/sections/embed-code';
import { ContactForm, FormOne, FormTwo } from '@/src/components/sections/form';
import { GalleryOne, GalleryTwo } from '@/src/components/sections/gallery';
import {
  ListFive,
  ListFour,
  ListOne,
  ListThree,
  ListTwo,
} from '@/src/components/sections/list';
import { LoopGridOne, LoopGridTwo } from '@/src/components/sections/loop-grid';
import { MarqueeOne, MarqueeTwo } from '@/src/components/sections/marquee';
import {
  SliderOne,
  SliderThree,
  SliderTwo,
} from '@/src/components/sections/slider';
import {
  SubNavigationOne,
  SubNavigationTwo,
} from '@/src/components/sections/sub-navigation';
import { TabsOne, TabsThree, TabsTwo } from '@/src/components/sections/tabs';
import {
  TextBlockOne,
  TextBlockTwo,
} from '@/src/components/sections/text-block-with-image';
import { PageContent, Section, SectionMap } from '@/src/types/pageBuilder';

const sectionMap: SectionMap = {
  'banner-1': BannerOne,
  'banner-2': BannerTwo,
  'banner-3': BannerThree,

  'box-1': BoxOne,
  'box-2': BoxTwo,

  'contact-form': ContactForm,
  'form-1': FormOne,
  'form-2': FormTwo,

  'gallery-1': GalleryOne,
  'gallery-2': GalleryTwo,

  'map-embed-1': MapEmbedOne,
  'youtube-embed-1': YoutubeEmbedOne,

  'list-1': ListOne,
  'list-2': ListTwo,
  'list-3': ListThree,
  'list-4': ListFour,
  'list-5': ListFive,

  'loop-grid-1': LoopGridOne,
  'loop-grid-2': LoopGridTwo,

  'marquee-1': MarqueeOne,
  'marquee-2': MarqueeTwo,

  'slider-1': SliderOne,
  'slider-2': SliderTwo,
  'slider-3': SliderThree,

  'sub-nav-1': SubNavigationOne,
  'sub-nav-2': SubNavigationTwo,

  'tabs-1': TabsOne,
  'tabs-2': TabsTwo,
  'tabs-3': TabsThree,

  'text-block-1': TextBlockOne,
  'text-block-2': TextBlockTwo,
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
    return null;
  }
  const sections = pageContent.sections;
  return (
    <>
      {sections.map((section: Section, index: number) => {
        const SectionComp = sectionMap[section.type];
        if (!SectionComp) return null;

        return <SectionComp key={'section_' + index} data={section} />;
      })}
    </>
  );
};

export default PageBuilder;
