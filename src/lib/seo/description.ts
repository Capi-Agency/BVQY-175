// Meta title / description for content pages.
// Order: the SEO record an editor filled (seo.meta_*) -> the blurb -> an excerpt of the body.
// Most posts (about 4 in 5) have no blurb, so without the excerpt they shipped no meta description
// at all and search engines picked a random snippet.
export const DESCRIPTION_MAX = 160;

const ENTITIES: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };

/** Plain text from HTML: tags dropped, common entities decoded, whitespace collapsed. */
export function toPlainText(html: string | null | undefined): string {
  if (!html) return '';
  return html
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&(#\d+|#x[0-9a-f]+|[a-z]+);/gi, (m, e: string) => {
      if (e[0] === '#') {
        const code = e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
        return Number.isFinite(code) ? String.fromCodePoint(code) : m;
      }
      return ENTITIES[e.toLowerCase()] ?? m;
    })
    .replace(/\s+/g, ' ')
    .trim();
}

/** Cut at a word boundary, at most `max` characters including the ellipsis. */
export function excerpt(text: string, max = DESCRIPTION_MAX): string {
  const t = text.trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  const space = cut.lastIndexOf(' ');
  return (space > max * 0.6 ? cut.slice(0, space) : cut).replace(/[\s,.;:–-]+$/, '') + '…';
}

type SeoRecord = { meta_title?: string | null; meta_description?: string | null } | null | undefined;

export function metaTitle(seo: SeoRecord, title: string | null | undefined): string {
  return (seo?.meta_title || '').trim() || (title || '').trim();
}

export function metaDescription(
  seo: SeoRecord,
  blurb: string | null | undefined,
  body: { plain?: string | null; html?: string | null },
): string {
  const fromSeo = (seo?.meta_description || '').trim();
  if (fromSeo) return excerpt(toPlainText(fromSeo));
  const fromBlurb = toPlainText(blurb);
  if (fromBlurb) return excerpt(fromBlurb);
  return excerpt(toPlainText(body.plain) || toPlainText(body.html));
}
