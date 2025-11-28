import DepartmentDetailPage from '@/src/components/departments/DepartmentDetailPage';
import DoctorList from '@/src/components/doctors/DoctorList';
import { BreadcrumbBasic } from '@/src/components/sections/breadcrumb';
import LogoSlider from '@/src/components/sections/slider/LogoSlider';
import { getAllDepartmentGroups } from '@/src/services/department';
import { fnGetPageBySlug } from '@/src/services/page';
import { createSeoData } from '@/src/utils/metadata';
import { ResolvingMetadata, Metadata } from 'next';
import { cookies } from 'next/headers';

type Props = {};

async function getLangSlug(): Promise<string> {
  const cookieStore = await cookies();
  const lang = cookieStore.get('language')?.value ?? 'vi';
  return lang === 'en' ? 'doi-ngu-bac-si-en' : 'doi-ngu-bac-si';
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

const DoctorListPage = async () => {
  const langSlug = await getLangSlug();
  const pageContent = await fnGetPageBySlug(langSlug);
  const sections = pageContent?.sections || [];
  const breadcrumbData = sections.find(
    (s: any) => s.type === 'breadcrumb-basic',
  );
  const bannerData = sections.find((s: any) => s.type === 'hero-text-overlay');
  const departmentGroups = await getAllDepartmentGroups();

  return (
    <div className="padding-top-body">
      <BreadcrumbBasic type="breadcrumb-basic" data={breadcrumbData} />
      <DoctorList data={bannerData} departmentGroups={departmentGroups} />
    </div>
  );
};

export default DoctorListPage;
