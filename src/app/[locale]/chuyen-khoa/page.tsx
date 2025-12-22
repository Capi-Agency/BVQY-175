import DepartmentListPage from '@/src/components/departments/DepartmentListPage';
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
  const data = await fnGetPageBySlug('chuyen-khoa');
  const seo = createSeoData(data?.seo) ?? {};
  return seo;
}

const DepartmentListPageWrapper = async () => {
  const pageContent = await fnGetPageBySlug('chuyen-khoa');

  const departmentGroups = await getAllDepartmentGroups();
  const parentGroups = departmentGroups?.filter((d) => d.parent_group === null);

  const sections = pageContent?.sections;
  const bannerData = sections.find((s: any) => s.type === 'hero-text-overlay');

  return (
    <div>
      <Suspense fallback={<LoadingComp />}>
        <DepartmentListPage
          bannerData={bannerData}
          departmentGroups={departmentGroups as any[]}
          parentGroups={parentGroups as any[]}
        />
      </Suspense>
    </div>
  );
};

export default DepartmentListPageWrapper;
