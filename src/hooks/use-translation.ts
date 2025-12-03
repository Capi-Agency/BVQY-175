// import { useRouter } from 'next/router';

import useStoreLanguage from "../store/store";

// export const useTranslation = () => {
//   const { locale } = useRouter();

//   const t = (viContent: any, enContent: any) => {
//     if (!enContent) return viContent;
//     return locale === 'en' ? enContent : viContent;
//   };

//   return {
//     t,
//   };
// };

// src/hooks/useTrans.ts

export default function useTranslation() {
  const language = useStoreLanguage((state) => state.language);

  const trans = (...values: string[]) => {
    const langs = ['vi', 'en'];
    const index = langs.indexOf(language);

    return values[index] || values[0] || '';
  };

  return trans;
}

