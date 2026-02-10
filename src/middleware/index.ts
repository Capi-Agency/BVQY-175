import { defineMiddleware } from "astro:middleware";
import { i18next } from "astro-i18next";

export const onRequest = defineMiddleware(async (context, next) => {
  // Initialize i18next if not already done
  if (!i18next.isInitialized) {
    await i18next.init({
      lng: 'vi',
      fallbackLng: 'vi',
      ns: ['common'],
      defaultNS: 'common',
    });
  }
  
  // Get locale from URL or default to 'vi'
  const locale = context.params.locale || 'vi';
  
  // Change language for current request
  await i18next.changeLanguage(locale);
  
  // Store locale in locals for use in components
  context.locals.locale = locale;
  
  return next();
});
