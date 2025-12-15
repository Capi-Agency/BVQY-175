import JsonLDProvider from '@/src/components/common/the-json-ld';
import PageBuilder from '@/src/page-builder';
import { fnGetPageBySlug } from '@/src/services/page';
import { defaultLanguage } from '@/src/utils/language';
import { createSeoData } from '@/src/utils/metadata';
import { checkValueNull } from '@/src/utils/validate';
import { Metadata, ResolvingMetadata } from 'next';
import { cookies } from 'next/headers';

type Props = { 
    params: Promise<{ lang: string }>; 
};

async function getLangSlugHome(): Promise<string> {
    const cookieStore = await cookies();
    const lang = cookieStore.get('language')?.value ?? true;
    return lang === defaultLanguage ? 'trang-chu' : `trang-chu-${lang}`;

} export async function generateMetadata(
    _props: any,
    _parent: ResolvingMetadata,
): Promise<Metadata> {
    const langSlug = await getLangSlugHome();
    const data = await fnGetPageBySlug(langSlug);
    const seo = createSeoData(data?.seo) ?? {}; return seo;
}

export default async function HomePage() {
    const langSlug = await getLangSlugHome();
    const pageContent = await fnGetPageBySlug(langSlug);
    const pageSchema = pageContent?.seo?.meta_schema;
    return (<>
        <JsonLDProvider pageSchema={pageSchema} />
        <PageBuilder pageContent={pageContent} />
    </>
    );
}