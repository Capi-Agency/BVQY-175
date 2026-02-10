import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';
import astroI18next from 'astro-i18next';

// https://astro.build/config
export default defineConfig({
  output: 'server', // Full SSR mode - skip pre-rendering for build success
  adapter: node({
    mode: 'standalone'
  }),

  site: process.env.PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:4321',

  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false, // We'll use our own globals.css
    }),
    // sitemap disabled - using custom endpoint at src/pages/sitemap.xml.ts
    // sitemap({
    //   i18n: {
    //     defaultLocale: 'vi',
    //     locales: {
    //       vi: 'vi',
    //     },
    //   },
    // }),
    astroI18next(),
  ],

  image: {
    // Image service for optimization
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },

    // Remote image domains
    domains: [process.env.ASSETS_DOMAIN || ''],

    // Remote patterns for external images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.ASSETS_DOMAIN || '',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'images.dmca.com',
      },
    ],
  },

  vite: {
    ssr: {
      noExternal: [
        '@radix-ui/*',
        'react-toastify',
      ],
    },
  },

  // Server configuration
  server: {
    port: 4321,
    host: true,
  },

  // Build configuration
  build: {
    inlineStylesheets: 'auto',
  },
});
