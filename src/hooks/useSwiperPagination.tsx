"use client"
import { useId, useMemo } from 'react';
import type { PaginationOptions } from 'swiper/types';

// The class must be known on the first render (server included): components
// render their slider only once `paginationClass` is set, so a value produced
// in useEffect left the slider out of the SSR HTML and it popped in after
// hydration, pushing everything below it down (CLS). useId is stable between
// server and client; strip the characters React puts in it (":", "«", "»")
// so it is usable as a CSS class and selector.
export default function useSwiperPagination() {
  const id = useId();

  return useMemo(() => {
    const unique = `swiper-custom-${id.replace(/[^a-zA-Z0-9_-]/g, '')}`;
    const paginationClass = `swiper-bullets-container ${unique}`;
    const paginationConfig: PaginationOptions = {
      clickable: true,
      type: 'bullets',
      el: `.swiper-bullets-container.${unique}`,
      bulletElement: 'div',
    };
    return { paginationClass, paginationConfig };
  }, [id]);
}
