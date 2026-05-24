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
    '/about-unix-time',
    '/epoch-converter',
    '/utc-time-now',
    '/iso-8601-converter',
    '/javascript-timestamp',
    '/python-timestamp',
    '/mysql-unix-timestamp',
    '/unix-time-in-milliseconds',
    '/timestamp-cheatsheet'
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '/' ? 1 : 0.8
  }));
}
