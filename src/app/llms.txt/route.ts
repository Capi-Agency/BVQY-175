// /llms.txt (https://llmstxt.org): a short Markdown guide to the site for LLMs / AI agents.
// Lighthouse "Agentic Browsing" checks it: 200, an H1, at least one Markdown link.
// Links are built from SITE_URL so the test site and prod each point to themselves.
// Paths with a dot skip the middleware, so this static segment answers before [locale].

const PAGES: { title: string; items: [string, string, string?][] }[] = [
  {
    title: 'Giới thiệu',
    items: [
      ['Tổng quan Bệnh viện', '/vi/tong-quan-benh-vien', 'lịch sử, chức năng, nhiệm vụ'],
      ['Những cột mốc đáng nhớ', '/vi/nhung-cot-moc-dang-nho'],
      ['Cơ sở vật chất', '/vi/co-so-vat-chat'],
      ['Các danh hiệu cao quý', '/vi/cac-danh-hieu-cao-quy'],
    ],
  },
  {
    title: 'Khám chữa bệnh',
    items: [
      ['Chuyên khoa', '/vi/chuyen-khoa', 'danh sách khoa, trung tâm, viện'],
      ['Đội ngũ Bác sĩ', '/vi/doi-ngu-bac-si'],
      ['Lịch khám bệnh', '/vi/lich-kham-benh'],
      ['Quy trình khám bệnh', '/vi/quy-trinh-kham-benh'],
      ['Bảng giá dịch vụ', '/vi/bang-gia-dich-vu'],
    ],
  },
  {
    title: 'Tin tức',
    items: [
      ['Tin tức – Sự kiện', '/vi/bai-viet'],
      ['Nghiên cứu khoa học', '/vi/bai-viet/nghien-cuu-khoa-hoc'],
      ['Đào tạo – Chỉ đạo tuyến', '/vi/bai-viet/huan-luyen-dao-tao-and-chi-dao-tuyen'],
      ['Tuyển dụng', '/vi/bai-viet/tin-tuyen-dung'],
      ['Tin mời thầu', '/vi/bai-viet/tin-moi-thau'],
    ],
  },
  {
    title: 'Liên hệ',
    items: [
      ['Liên hệ', '/vi/lien-he', 'địa chỉ, điện thoại, form liên hệ'],
      ['Xem bản đồ', '/vi/xem-ban-do'],
    ],
  },
  {
    title: 'Optional',
    items: [
      ['Sitemap', '/sitemap.xml', 'toàn bộ trang và bài viết'],
      ['Chính sách bảo mật thông tin', '/vi/chinh-sach-va-bao-mat'],
      ['Điều khoản sử dụng', '/vi/dieu-khoan-va-dich-vu'],
    ],
  },
];

export function GET() {
  const origin = (process.env.SITE_URL || '').replace(/\/+$/, '');
  const body = [
    '# Bệnh viện Quân y 175',
    '',
    '> Website chính thức của Bệnh viện Quân y 175 (Bộ Quốc phòng), TP. Hồ Chí Minh: giới thiệu bệnh viện, chuyên khoa, đội ngũ bác sĩ, lịch khám, bảng giá dịch vụ, tin tức và thông tin liên hệ. Nội dung tiếng Việt.',
    '',
    ...PAGES.flatMap(({ title, items }) => [
      `## ${title}`,
      '',
      ...items.map(([name, path, note]) => `- [${name}](${origin}${path})${note ? `: ${note}` : ''}`),
      '',
    ]),
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
