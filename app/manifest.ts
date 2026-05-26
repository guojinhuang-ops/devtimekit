import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'DevTimeKit',
    short_name: 'DevTimeKit',
    description: 'Developer time, timezone, and JSON tools optimized for mobile and desktop.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f172a',
    theme_color: '#0f172a',
    icons: [
      { src: '/logo-devtimekit-icon.svg', sizes: '192x192', type: 'image/svg+xml' },
      { src: '/logo-devtimekit-icon.svg', sizes: '512x512', type: 'image/svg+xml' }
    ]
  };
}
