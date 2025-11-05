import { EmbedSection } from '@/src/types/pageBuilder';

export { default as MapEmbedOne } from './MapEmbedOne'
export { default as YoutubeEmbedOne } from './YoutubeEmbedOne'

export type EmbedCodeProps = {
  data: EmbedSection;
};
