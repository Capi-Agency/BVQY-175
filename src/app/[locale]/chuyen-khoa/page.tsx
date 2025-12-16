import DepartmentListPage from '@/src/components/departments/DepartmentListPage';
import LogoSlider from '@/src/components/sections/slider/LogoSlider';
import { getLangSlug } from '@/src/i18n/routing';
import { getAllDepartmentGroups } from '@/src/services/department';
import { fnGetPageBySlug } from '@/src/services/page';
import { createSeoData } from '@/src/utils/metadata';
import { ResolvingMetadata, Metadata } from 'next';

type Props = {
  params: Promise<{ locale: string; }>;
};

export async function generateMetadata(
  { params }: Props,
  _parent: ResolvingMetadata,
): Promise<Metadata> {
  const { locale } = await params;
  const langSlug = await getLangSlug(locale, "chuyen-khoa");

  const data = await fnGetPageBySlug(langSlug);
  const seo = createSeoData(data?.seo) ?? {};
  return seo;
}

const DepartmentListPageWrapper = async ({ params }: Props) => {
  const { locale } = await params;
  const langSlug = await getLangSlug(locale, "chuyen-khoa");
  const pageContent = await fnGetPageBySlug(langSlug);

  const departmentGroups = await getAllDepartmentGroups();
  const parentGroups = departmentGroups?.filter((d) => d.parent_group === null);

  const sections = pageContent?.sections;
  const bannerData = sections?.find((s: any) => s.type === 'hero-text-overlay');

  return (
    <div>
      <DepartmentListPage
        bannerData={bannerData}
        departmentGroups={departmentGroups as any[]}
        parentGroups={parentGroups as any[]}
      />
      {/* <LogoSlider data={logoSlider} /> */}
    </div>
  );
};

export default DepartmentListPageWrapper;
