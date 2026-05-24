import type { MetadataRoute } from 'next';
import { allLanguageCodes, localizedPath } from '@/lib/i18n';
import { guidePages } from '@/lib/guides';
import { BASE_URL } from '@/lib/site';
import { tools } from '@/lib/tools';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const guideRoutes = guidePages.map((guide) => `/guides/${guide.slug}`);
  const staticRoutes = ['/about', '/privacy', '/terms', '/contact'];
  const localizedRoutes = ['/', ...tools.map((tool) => tool.href)];
  const routes = [
    ...allLanguageCodes.flatMap((locale) => localizedRoutes.map((route) => localizedPath(route, locale))),
    ...guideRoutes,
    ...staticRoutes
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '/' ? 1 : 0.8
  }));
}
