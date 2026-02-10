// Astro Middleware for i18n locale detection
// Migrated from Next.js next-intl middleware

import type { MiddlewareHandler } from 'astro';
import { routing } from './i18n/routing';
import { fnGetMetadata } from './services/metadata';

export const onRequest: MiddlewareHandler = async (context, next) => {
  const { pathname } = context.url;

  // Extract locale from pathname (e.g., /vi/page or /en/page)
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];

  // If already have locale and metadata from a previous pass (rewrite), just skip
  if (
    context.locals.locale &&
    context.locals.metadata &&
    !routing.locales.includes(firstSegment as any)
  ) {
    return next();
  }

  // Check if first segment is a valid locale
  const isLocale = routing.locales.includes(firstSegment as any);
  const locale = isLocale ? (firstSegment as string) : routing.defaultLocale;

  // Store locale in context.locals for access in pages/layouts
  context.locals.locale = locale;

  // Fetch and store metadata
  context.locals.metadata = await fnGetMetadata(locale as any);

  // If locale prefix is present, rewrite to the base path
  if (isLocale) {
    const newPath = '/' + segments.slice(1).join('/') || '/';
    // Use rewrite for Astro 4.x+
    return context.rewrite(newPath);
  }

  return next();
};
