// Where Live Preview of a page lands (shared by /api/draft and its tests).
import { SEO_LOCALE } from '@/src/lib/seo/primary-category';

// detail templates have no URL of their own: preview opens the list their items are reached from
const TEMPLATE_PREVIEW: Record<string, string> = {
  'trang-chu': '',
  'chi-tiet-bai-viet': 'bai-viet',
  'chi-tiet-chuyen-khoa': 'chuyen-khoa',
  'chi-tiet-bac-si': 'doi-ngu-bac-si',
  'chi-tiet-don-vi-truc-thuoc': 'don-vi-truc-thuoc',
  'chi-tiet-khoi-co-quan-hanh-chinh': 'khoi-co-quan-hanh-chinh',
  'chi-tiet-trung-tam': 'chuyen-khoa',
  'chi-tiet-vien': 'chuyen-khoa',
};

export function pagePreviewPath(slug: string, locale = SEO_LOCALE) {
  const base = slug.replace(/-en$/, '');
  if (base in TEMPLATE_PREVIEW) return TEMPLATE_PREVIEW[base] ? `/${locale}/${TEMPLATE_PREVIEW[base]}` : `/${locale}`;
  return `/${locale}/${slug}`;
}
