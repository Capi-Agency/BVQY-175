'use client';
import { useEffect } from 'react';

export default function ViewTracker({
  collection,
  slug,
}: {
  collection: string;
  slug: string;
}) {
  useEffect(() => {
    const viewedKey = `viewed_${collection}_${slug}`;
    
    // Kiểm tra xem user đã xem bài viết này chưa bằng localStorage
    if (typeof window !== 'undefined' && window.localStorage.getItem(viewedKey)) {
      return;
    }

    // Lấy URL public của Directus từ biến môi trường
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://benhvien175.vn/cms/';
    const fetchUrl = `${apiUrl}increment-views/${collection}/${slug}`;

    fetch(fetchUrl, { method: 'PATCH' })
      .then((res) => {
        if (res.ok) {
          // Lưu lại vào localStorage để không đếm lại ở lần sau
          window.localStorage.setItem(viewedKey, '1');
        }
      })
      .catch(() => {});
  }, [collection, slug]);

  return null;
}
