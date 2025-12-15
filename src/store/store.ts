import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';
import { defaultLanguage, langs, LanguageCode } from '../utils/language';

type LanguageStore = {
  language: LanguageCode;
  updateLanguage: (newLanguage: LanguageCode) => void;
};

const getInitialLanguage = (): LanguageCode => {
  if (typeof document !== 'undefined') {
    const cookieLang = document.cookie
      .split('; ')
      .find((row) => row.startsWith('language='))
      ?.split('=')[1] as LanguageCode | undefined;

    if (cookieLang && langs.includes(cookieLang)) {
      return cookieLang;
    }
  }
  return defaultLanguage;
};

const useStoreLanguage = create<LanguageStore>()(
  persist(
    (set) => ({
      language: getInitialLanguage(),
      updateLanguage: (newLanguage) => {
        set({ language: newLanguage });
        if (typeof document !== 'undefined') {
          document.cookie = `language=${newLanguage}; path=/;`;
        }
      },
    }),
    {
      name: 'language-storage',
      merge: (
        persistedState: Partial<LanguageStore>,
        currentState: LanguageStore,
      ) => ({
        ...currentState,
        ...persistedState,
      }),
    } as PersistOptions<LanguageStore>,
  ),
);

export default useStoreLanguage;
