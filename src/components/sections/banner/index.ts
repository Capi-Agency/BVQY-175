import { HeroSection } from '@/src/types/pageBuilder';

export { default as BannerOne } from './BannerOne';
export { default as BannerTwo } from './BannerTwo';
export { default as BannerThree } from './BannerThree';

export type BannerProps = {
  data: HeroSection;
};
