import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: `${process.env.ASSETS_DOMAIN}`,
        pathname: '/**',
      },
      {
        // local docker stack (http://bv175.localhost)
        protocol: 'http',
        hostname: `${process.env.ASSETS_DOMAIN}`,
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.dmca.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        pathname: '/**',
      },
    ],
    minimumCacheTTL: 60 * 60 * 24,
    dangerouslyAllowSVG: true,
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_FILES_URL: process.env.NEXT_PUBLIC_FILES_URL,
    NEXT_PUBLIC_ASSETS_URL: process.env.NEXT_PUBLIC_ASSETS_URL,
  },
  experimental: {
    scrollRestoration: true,
    cssChunking: true,
    // No inlineCss: Next 15 puts the CSS both in a <style> and again in the RSC payload
    // (+250 KB raw HTML on the home page), which cost more than the blocking stylesheet saved.
  },
  compiler: {
    styledComponents: true,
  },
  compress: true,
  devIndicators: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
