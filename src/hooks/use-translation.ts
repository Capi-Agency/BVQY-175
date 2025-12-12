// import useStoreLanguage from "../store/store";
// export default function useTranslation() {
//   const language = useStoreLanguage((state) => state.language);

//   const trans = (...values: string[]) => {
//     const langs = ['vi', 'en'];
//     const index = langs.indexOf(language);

//     return values[index] || values[0] || '';
//   };

//   return trans;
// }

// import useStoreLanguage from '../store/store';
// import { locales } from '../utils/language';

// export const useTranslate = () => {
//   const language = useStoreLanguage((state: any) => state.language);

//   const trans = (key: keyof typeof locales | string) => {
//     const entry = locales[key as keyof typeof locales];
//     if (!entry) return key; // fallback nếu key không tồn tại
//     return entry[language] || key; // fallback nếu language không tồn tại
//   };

//   return { trans };
// };

import useStoreLanguage from '../store/store';
import { locales } from '../utils/language';

export default function useTranslation() {
  const language = useStoreLanguage((state: any) => state.language);

  const trans = (...args: string[]) => {
    // truyen
    if (args.length === 1) {
      const key = args[0];
      const entry = locales[key as keyof typeof locales];
      if (!entry) return key; // fallback nếu key không tồn tại
      return entry[language] || key; // fallback nếu ngôn ngữ chưa có
    }

    // 🟦 Trường hợp 2: truyền nhiều chuỗi => dùng giá trị trực tiếp theo thứ tự ngôn ngữ
    const langs = Object.keys(locales[Object.keys(locales)[0]] || {});
    // ví dụ: ['vi', 'en']
    const index = langs.indexOf(language);
    return args[index] || args[0] || '';
  };

  return { trans };
}
