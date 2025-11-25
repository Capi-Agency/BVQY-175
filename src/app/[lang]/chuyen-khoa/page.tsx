import DepartmentDetailPage from '@/src/components/departments/DepartmentDetailPage';
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

  const pageSchema = pageContent?.seo?.meta_schema;

  const departmentGroups = await getAllDepartmentGroups();
  const parentGroups = departmentGroups?.filter((d) => d.parent_group === null);

  const sections = pageContent?.sections;
  const bannerData = sections.find((s: any) => s.type === 'hero-text-overlay');
  const logoSlider = sections.find((s: any) => s.type === 'logo-slider');

  return (
    <div>
      <DepartmentDetailPage
        bannerData={bannerData}
        departmentGroups={departmentGroups as any[]}
        parentGroups={parentGroups as any[]}
      />
      <LogoSlider data={logoSlider} />
    </div>
  );
};

export default DepartmentListPageWrapper;

const LogoSliderData = {
  title: 'Đối tác bảo hiểm',
  subtitle: 'Bảo hiểm',
  contents: [
    {
      id: '99e4f062-b162-40d9-b030-3a0d014cc512',
      title: 'Wrapper',
    },
    {
      id: '2f6b5b5f-2b3b-4ac2-9a7a-7dfc0f547b9e',
      title: 'Wrapper (1)',
    },
    {
      id: '8e51e805-a75c-4ba9-8ebd-c736283ca8ba',
      title: 'Wrapper (2)',
    },
    {
      id: '1c1c0ea2-d1d4-4840-a4cb-664f044559ff',
      title: 'Wrapper (3)',
    },
    {
      id: 'cbeacab4-34b1-46a2-960f-93e84a3d5bcd',
      title: 'Wrapper (4)',
    },
  ],
  type: 'logo-slider',
};
