import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // This repository includes a legacy Vite app under `src/`.
  // Restrict Next.js routing files to App Router conventions so
  // deploy builds do not try to bundle legacy `src/pages/*`.
  pageExtensions: ['page.tsx', 'page.ts', 'route.ts', 'route.tsx'],
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },
};

export default nextConfig;
