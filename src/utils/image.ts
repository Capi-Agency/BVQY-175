import { SETTINGS } from '@/src/utils/const';

const getAssetUrlById = (id: string, optionalString?: string) => {
  if (!id) return SETTINGS.DEFAULT_UNAVAILABLE_IMAGE_URL;

  const assetsUrl =
    import.meta.env.PUBLIC_ASSETS_URL ||
    import.meta.env.NEXT_PUBLIC_ASSETS_URL ||
    'https://admin175.minhkhang.net/assets/';
  const imgUrl = assetsUrl + id;
  if (optionalString) return imgUrl + optionalString;
  return imgUrl;
};

export { getAssetUrlById };
