'use client';
import { useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import useStoreLanguage from '@/src/store/store';
import { LanguageCode } from '../utils/language';

export default function useChangeLanguage() {
  const router = useRouter();
  const pathname = usePathname();
  const updateLanguage = useStoreLanguage((state) => state.updateLanguage);

  const changeLanguage = useCallback(
    (value: string) => {
      // Cắt path ra theo segment
      const segments = pathname.split('/').filter(Boolean); // ['vi', 'chuyen-khoa', 'abc']

      // Nếu chưa có lang ở đầu → thêm
      if (!segments[0]) {
        segments.unshift(value);
      } else {
        // Thay segment đầu
        segments[0] = value;
      }

      const newPath = '/' + segments.join('/');
      router.push(newPath);
      updateLanguage(value as LanguageCode);
    },
    [pathname, router, updateLanguage],
  );

  return { changeLanguage };
}
