import type { MetadataRoute } from 'next';
import { BASE_URL } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '/',
    '/unix-timestamp-converter',
    '/current-unix-timestamp',
    '/current-timestamp-milliseconds',
    '/timestamp-to-date',
    '/date-to-timestamp',
    '/about-unix-time'
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '/' ? 1 : 0.8
  }));
}