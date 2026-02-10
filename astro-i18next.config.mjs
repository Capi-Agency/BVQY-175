/** @type {import("astro-i18next").AstroI18nextConfig} */
export default {
  defaultLocale: "vi",
  locales: ["vi"],
  routes: {
    vi: {
      "bai-viet": "bai-viet",
      "chuyen-khoa": "chuyen-khoa",
      "doi-ngu-bac-si": "doi-ngu-bac-si",
      "don-vi-truc-thuoc": "don-vi-truc-thuoc",
      "khoi-co-quan-hanh-chinh": "khoi-co-quan-hanh-chinh",
      "trung-tam": "trung-tam",
      "vien": "vien",
    },
  },
  namespaces: ["common"],
  defaultNamespace: "common",
  showDefaultLocale: false,
  load: ["server", "client"],
  i18nextServer: {
    debug: false,
  },
  i18nextClientPlugins: {},
};
