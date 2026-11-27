'use client';

import { useEffect, useState } from 'react';
import type {
  ToastContainer as ToastContainerType,
  ToastContainerProps,
} from 'react-toastify';
import { onToastifyLoaded, toastContainerMounted } from '@/src/lib/toast';

export default function LazyToastContainer(props: ToastContainerProps) {
  const [Container, setContainer] = useState<typeof ToastContainerType | null>(
    null,
  );

  useEffect(
    () => onToastifyLoaded((m) => setContainer(() => m.ToastContainer)),
    [],
  );

  useEffect(() => {
    if (Container) toastContainerMounted();
  }, [Container]);

  if (!Container) return null;

  return <Container {...props} />;
}
