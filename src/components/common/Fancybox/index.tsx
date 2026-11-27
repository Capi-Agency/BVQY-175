"use client"
import React, { useRef, useEffect, PropsWithChildren } from 'react';

import type { OptionsType } from '@fancyapps/ui/types/Fancybox/options';

interface Props {
  options?: Partial<OptionsType>;
  delegate?: string;
  className?: string;
}

type NativeFancybox = typeof import('@fancyapps/ui').Fancybox;

// Fancybox (JS + ~22 KB CSS) was in the shared bundle and the inline CSS of every page, while
// it is only needed once someone opens an image/video. It now loads on intent: hovering,
// touching or focusing the gallery warms it up, and a click that comes before it is ready is
// held, then replayed once Fancybox is bound.
let loader: Promise<NativeFancybox> | null = null;
const loadFancybox = () =>
  (loader ??= Promise.all([
    import('@fancyapps/ui'),
    // @ts-expect-error -- side-effect CSS chunk, no type declarations
    import('@fancyapps/ui/dist/fancybox/fancybox.css'),
  ]).then(([m]) => m.Fancybox));

function Fancybox(props: PropsWithChildren<Props>) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const delegate = props.delegate || '[data-fancybox]';
    const options = props.options || {};

    let scrollY = 0;
    let disposed = false;
    let native: NativeFancybox | null = null;

    const handleBeforeShow = () => {
      scrollY = window.scrollY;
    };

    const handleAfterClose = () => {
      // Xoá hash khỏi URL
      history.replaceState(
        null,
        '',
        window.location.pathname + window.location.search,
      );
      // Trả về vị trí scroll cũ
      window.scrollTo({ top: scrollY });
    };

    const bind = () =>
      loadFancybox().then((F) => {
        if (disposed || native) return;
        native = F;
        F.bind(container, delegate, {
          ...options,
          Hash: false,
          hideScrollbar: false,
        });
      });

    const warm = () => {
      void bind();
    };

    const holdClick = (e: MouseEvent) => {
      if (native) return; // bound: Fancybox's own listener handles it
      const el = (e.target as Element | null)?.closest?.(delegate) as HTMLElement | null;
      if (!el || !container.contains(el)) return;
      e.preventDefault();
      e.stopPropagation();
      bind().then(() => {
        if (native) el.click();
      });
    };

    const intent = ['pointerenter', 'touchstart', 'focusin'] as const;
    intent.forEach((ev) => container.addEventListener(ev, warm, { once: true, passive: true }));
    container.addEventListener('click', holdClick, true);

    // Lắng nghe sự kiện Fancybox
    document.addEventListener('beforeShow.fb', handleBeforeShow);
    document.addEventListener('afterClose.fb', handleAfterClose);

    return () => {
      disposed = true;
      intent.forEach((ev) => container.removeEventListener(ev, warm));
      container.removeEventListener('click', holdClick, true);
      if (native) {
        native.unbind(container);
        native.close();
      }
      document.removeEventListener('beforeShow.fb', handleBeforeShow);
      document.removeEventListener('afterClose.fb', handleAfterClose);
    };
  }, []);

  return (
    <div className={`${props?.className}`} ref={containerRef}>
      {props.children}
    </div>
  );
}

export default Fancybox;
