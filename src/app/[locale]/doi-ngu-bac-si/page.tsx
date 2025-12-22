import DoctorList from '@/src/components/doctors/DoctorList';
import { BreadcrumbBasic } from '@/src/components/sections/breadcrumb';
import { LoadingComp } from '@/src/components/sections/custom';
import { getAllDepartmentGroups } from '@/src/services/department';
import { fnGetPageBySlug } from '@/src/services/page';
import { createSeoData } from '@/src/utils/metadata';
import { ResolvingMetadata, Metadata } from 'next';
import { Suspense } from 'react';

export async function generateMetadata(
  _props: any,
  _parent: ResolvingMetadata,
): Promise<Metadata> {
  const data = await fnGetPageBySlug('doi-ngu-bac-si');
  const seo = createSeoData(data?.seo) ?? {};
  return seo;
}

const DoctorListPage = async () => {
  const pageContent = await fnGetPageBySlug('doi-ngu-bac-si');
  const sections = pageContent?.sections || [];
  const breadcrumbData = sections.find(
    (s: any) => s.type === 'breadcrumb-basic',
  );

  const bannerData = sections.find((s: any) => s.type === 'hero-text-overlay');
  const departmentGroups = await getAllDepartmentGroups();

  return (
    <div className="padding-top-body">
      <BreadcrumbBasic type="breadcrumb-basic" data={breadcrumbData} />
      <Suspense fallback={<LoadingComp />}>
        <DoctorList data={bannerData} departmentGroups={departmentGroups} />
      </Suspense>
    </div>
  );
};

export default DoctorListPage;
