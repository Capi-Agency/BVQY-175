// Simple navigation shim for Astro conversion
import { routing } from './routing';

export type Locale = string;

// For use in .astro components - simple href builder
export function getLocalizedPath(
  path: string,
  locale: string = routing.defaultLocale,
): string {
  // For now, we only support 'vi' locale
  return path.startsWith('/') ? path : `/${path}`;
}

// Placeholder exports for React islands that still use these
export const Link = 'a';

export const usePathname = () => {
  if (typeof window !== 'undefined') {
    return window.location.pathname;
  }
  return '/';
};

export const useRouter = () => ({
  push: (path: string) => {
    if (typeof window !== 'undefined') {
      window.location.href = path;
    }
  },
  replace: (path: string) => {
    if (typeof window !== 'undefined') {
      window.location.replace(path);
    }
  },
  back: () => {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  },
});

export const useSearchParams = () => {
  if (typeof window !== 'undefined') {
    return new URLSearchParams(window.location.search);
  }
  return new URLSearchParams();
};

export const useParams = () => {
  // In Astro client-side, we might need to parse the URL or use a global store
  // For now, we return an empty object as a safe fallback
  return {};
};

export const useLocale = () => {
  // We can try to get locale from pathname or a global state
  // Minimal implementation:
  if (typeof window !== 'undefined') {
    const parts = window.location.pathname.split('/');
    if (routing.locales.includes(parts[1])) return parts[1];
  }
  return routing.defaultLocale;
};

import { translate } from './messages';

export const useTranslations = (namespace?: string) => {
  const locale = useLocale();

  const t = (key: string, values?: any) => {
    let message = translate(locale, key, namespace);
    if (typeof message !== 'string') return key;

    if (values) {
      Object.entries(values).forEach(([k, v]) => {
        message = (message as string).replace(
          new RegExp(`{${k}}`, 'g'),
          String(v),
        );
      });
    }
    return message;
  };

  t.rich = (key: string, values?: any) => {
    let message = translate(locale, key, namespace);
    if (typeof message !== 'string') return key;

    if (values) {
      Object.entries(values).forEach(([k, v]) => {
        if (typeof v !== 'function') {
          message = (message as string).replace(
            new RegExp(`{${k}}`, 'g'),
            String(v),
          );
        }
      });
    }
    return message;
  };

  t.markup = (key: string, values?: any) => t(key, values);
  t.raw = (key: string) => translate(locale, key, namespace);

  return t;
};

export const getPathname = (params: any) => params.pathname || '/';

export const redirect = (path: string) => {
  if (typeof window !== 'undefined') {
    window.location.href = path;
  }
};
