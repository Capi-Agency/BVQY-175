'use client';
// react-toastify (JS + ~8 KB CSS) is only needed after a form is sent. It was in the shared
// bundle and in the inline CSS of every page; now it loads on the first toast.
// Same call shape as react-toastify for what the site uses: toast.success / toast.error.
import type { ToastContent, ToastOptions } from 'react-toastify';

type Toastify = typeof import('react-toastify');

let mod: Promise<Toastify> | null = null;
let loaded: Toastify | null = null;
const listeners = new Set<(m: Toastify) => void>();

let markReady: () => void = () => {};
const containerReady = new Promise<void>((resolve) => {
  markReady = resolve;
});

export function loadToastify(): Promise<Toastify> {
  mod ??= Promise.all([
    import('react-toastify'),
    // @ts-expect-error -- side-effect CSS chunk, no type declarations
    import('react-toastify/dist/ReactToastify.css'),
  ]).then(([m]) => {
    loaded = m;
    listeners.forEach((l) => l(m));
    return m;
  });
  return mod;
}

/** For LazyToastContainer: called with the module once it is loaded. */
export function onToastifyLoaded(cb: (m: Toastify) => void): () => void {
  if (loaded) cb(loaded);
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

/** LazyToastContainer calls it once <ToastContainer> is mounted. */
export function toastContainerMounted() {
  markReady();
}

async function show(kind: 'success' | 'error', content: ToastContent, options?: ToastOptions) {
  const m = await loadToastify();
  await containerReady;
  m.toast[kind](content, options);
}

export const toast = {
  success: (content: ToastContent, options?: ToastOptions) => void show('success', content, options),
  error: (content: ToastContent, options?: ToastOptions) => void show('error', content, options),
};
