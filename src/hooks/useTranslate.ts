// lib/useTranslate.ts
import useStoreLanguage from '../store/store';
import { locales } from '../utils/language';

export const useTranslate = () => {
  const language = useStoreLanguage((state: any) => state.language);

  const trans = (key: keyof typeof locales | string) => {
    const entry = locales[key as keyof typeof locales];
    if (!entry) return key; // fallback nếu key không tồn tại
    return entry[language] || key; // fallback nếu language không tồn tại
  };

  return { trans };
};
