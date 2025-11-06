'use client';
import { CommonSection, PageContent, SectionMap } from '@/src/types/pageBuilder';



const headerMap: SectionMap = {
};

const footerMap: SectionMap = {
};

const sectionMap: SectionMap = {
  // Home page

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

  const headerSlug = pageContent?.top_navigation?.slug;
  const HeaderComp = headerSlug ? headerMap[headerSlug] : null;

  const footerSlug = pageContent?.bottom_navigation?.slug;
  const FooterComp = footerSlug ? footerMap[footerSlug] : null;

  return (
    <>
      {HeaderComp && <HeaderComp data={pageContent?.top_navigation} />}

      {sections.map((section: CommonSection, index: number) => {
        const SectionComp = sectionMap[section.type];
        if (!SectionComp) return null;

        return <SectionComp key={'section_' + index} data={section} />;
      })}

      {FooterComp && <FooterComp data={pageContent?.bottom_navigation} />}
    </>
  );
};

export default PageBuilder;
