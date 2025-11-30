import DepartmentListPage from '@/src/components/departments/DepartmentListPage';
import LogoSlider from '@/src/components/sections/slider/LogoSlider';
import { getAllDepartmentGroups } from '@/src/services/department';
import { fnGetPageBySlug } from '@/src/services/page';
import { createSeoData } from '@/src/utils/metadata';
import { ResolvingMetadata, Metadata } from 'next';
import { cookies } from 'next/headers';

async function getLangSlug(): Promise<string> {
  const cookieStore = await cookies();
  const lang = cookieStore.get('language')?.value ?? 'vi';
  return lang === 'en' ? 'chuyen-khoa-en' : 'chuyen-khoa';
}

export async function generateMetadata(
  _props: any,
  _parent: ResolvingMetadata,
): Promise<Metadata> {
  const langSlug = await getLangSlug();
  const data = await fnGetPageBySlug(langSlug);
  const seo = createSeoData(data?.seo) ?? {};
  return seo;
}

const DepartmentListPageWrapper = async () => {
  const langSlug = await getLangSlug();
  const pageContent = await fnGetPageBySlug(langSlug);

  const departmentGroups = await getAllDepartmentGroups();
  const parentGroups = departmentGroups?.filter((d) => d.parent_group === null);

  const sections = pageContent?.sections;
  const bannerData = sections.find((s: any) => s.type === 'hero-text-overlay');
  const logoSlider = sections.find((s: any) => s.type === 'logo-slider');

  return (
    <div>
      <DepartmentListPage
        bannerData={bannerData}
        departmentGroups={departmentGroups as any[]}
        parentGroups={parentGroups as any[]}
      />
      <LogoSlider data={logoSlider} />
    </div>
  );
};

export default DepartmentListPageWrapper;