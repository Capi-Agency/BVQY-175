'use client';

import { useEffect, useState } from 'react';
import { ToastContainer, ToastContainerProps } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LazyToastContainer(props: ToastContainerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <ToastContainer {...props} />;
}
