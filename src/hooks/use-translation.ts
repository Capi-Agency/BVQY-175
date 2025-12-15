import useStoreLanguage from '../store/store';
import { langs, locales } from '../utils/language';

export default function useTranslation() {
  const language = useStoreLanguage((state) => state.language);

  const trans = (...args: string[]) => {
    if (args.length === 1) {
      const key = args[0];
      const entry = locales[key];
      if (!entry) return key;
      return entry[language] || key;
    }

    const index = langs.indexOf(language);
    return args[index] || args[0] || '';
  };

  return { trans };
}

