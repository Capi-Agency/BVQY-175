import { useRouter } from 'next/router';

export const useTranslation = () => {
  const { locale } = useRouter();

  const t = (viContent: any, enContent: any) => {
    if (!enContent) return viContent;
    return locale === 'en' ? enContent : viContent;
  };

  return {
    t,
  };
};
