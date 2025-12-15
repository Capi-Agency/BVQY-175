import DoctorList from '@/src/components/doctors/DoctorList';
import { BreadcrumbBasic } from '@/src/components/sections/breadcrumb';
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
  const langSlug = getLangSlug(locale, 'doi-ngu-bac-si');

  const data = await fnGetPageBySlug(langSlug);
  const seo = createSeoData(data?.seo) ?? {};
  return seo;
}

const DoctorListPage = async ({ params }: Props) => {
  const { locale } = await params;
  const langSlug = getLangSlug(locale, 'doi-ngu-bac-si');
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
