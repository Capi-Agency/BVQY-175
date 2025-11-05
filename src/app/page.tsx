import PageBuilder from '@/src/page-builder';
import { fnGetPageBySlug } from '@/src/services/page';

export default async function Home() {
  const pageContent = await fnGetPageBySlug('trang-chu');
  return <PageBuilder pageContent={pageContent} />;
}
