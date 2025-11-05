// page-level fields
type PageContent = {
  tile: string;
  slug: string;
  meta_title?: string | null | undefined;
  meta_keywords?: string[] | null | undefined;
  meta_description?: string | null | undefined;
  meta_image?: Asset;
  sections: Section[];
};


// section-level fields
type SectionMap = {
  [key: string]: any
}

type CommonFields = {
  type: string;
  title?: string;
  html_id?: string;
  sub_title?: string;
  blurb?: string;
  content?: string;
  props?: JSON;
}

type SubNavSection = CommonFields & {
  subnav_items?: SubNavItem[];
  subnav_image?: Asset[];
};

type HeroSection = CommonFields & {
  hero_image?: Asset;
  hero_background_image?: Asset;
  hero_content?: string;
  hero_cta_label?: string;
  hero_cta_url?: string;
};

type HeroVideoSection = CommonFields & {
  hero_video_file?: Asset;
};

type GallerySection = CommonFields & {
  gallery_files?: Asset[];
  gallery_texts?: string[];
};

type CustomCodeSection = CommonFields & {
  raw_html?: string;
};

type FormSection = CommonFields & {
  [key: string]: any;
}

type LoopGridSection = CommonFields & {
  loop_grid_collection?: string;
  loop_grid_limit?: number;
  loop_grid_sort?: string;
  loop_grid_page?: number;
  loop_grid_has_pagination?: boolean;
  loop_grid_has_navigation?: boolean;
  loop_grid_filter?: JSON;
};

type SliderSection = CommonFields & {
  slider_items?: SliderItem[];
  slider_background_image?: Asset;
  slider_has_navigation?: boolean;
  slider_has_pagination?: boolean;
};

type EmbedSection = CommonFields & {
  embed_url?: string;
};

type SingleImageSection = CommonFields & {
  single_image?: Asset;
};


type Section =
  | SubNavSection
  | HeroSection
  | HeroVideoSection
  | GallerySection
  | CustomCodeSection
  | LoopGridSection
  | SliderSection
  | EmbedSection
  | FormSection
  | SingleImageSection;


// input-level fields
type Asset = string | {
  id: string
} | {
  directus_files_id: {
    id: string
  }
}

type SubNavItem = {
  label: string;
  url: string;
  icon: Asset;
}

type SliderItem = {
  title: string;
  blurb?: string;
  content?: string;
  image?: Asset;
  cta_label?: string;
  cta_url?: string;
  cta_open_new_tab?: boolean
}


export type {
  Asset,
  CommonFields,
  CustomCodeSection,
  FormSection,
  EmbedSection,
  GallerySection,
  HeroSection,
  HeroVideoSection,
  LoopGridSection,
  PageContent,
  Section,
  SectionMap,
  SingleImageSection,
  SliderItem,
  SliderSection,
  SubNavItem,
  SubNavSection,
};
