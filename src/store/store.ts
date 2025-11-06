import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

type LanguageStore = {
  language: string;
  updateLanguage: (newLanguage: string) => void;
};

const getInitialLanguage = () => {
  if (typeof document !== 'undefined') {
    const cookieLang = document.cookie
      .split('; ')
      .find(row => row.startsWith('language='))
      ?.split('=')[1];
    if (cookieLang) return cookieLang;
  }
  return 'vi';
};

const useStoreLanguage = create<LanguageStore>()(
  persist(
    (set) => ({
      language: getInitialLanguage(),
      updateLanguage: (newLanguage: string) => {
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
        currentState: LanguageStore
      ) => ({
        ...currentState,
        ...persistedState,
      }),
    } as PersistOptions<LanguageStore>,
  ),
);

export default useStoreLanguage;


