import DepartmentListPage from '@/src/components/departments/DepartmentListPage';
import { getAllDepartmentGroups } from '@/src/services/department';
import { fnGetPageBySlug } from '@/src/services/page';
import { createSeoData } from '@/src/utils/metadata';
import { ResolvingMetadata, Metadata } from 'next';
import { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata(
  { params }: Props,
  _parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;

  const data = await fnGetPageBySlug(slug);
  const seo = createSeoData(data?.seo) ?? {};
  return seo;
}

const DepartmentListPageWrapper = async ({ params }: Props) => {
  const { locale, slug } = await params;
  setRequestLocale(locale as Locale);

  const pageContent = await fnGetPageBySlug(slug);

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
