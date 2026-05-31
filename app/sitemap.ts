import type { MetadataRoute } from 'next';
import { allLanguageCodes, localizedPath } from '@/lib/i18n';
import { guidePages } from '@/lib/guides';
import { promptPages } from '@/lib/prompt-pages';
import { BASE_URL } from '@/lib/site';
import { tools } from '@/lib/tools';
import { utilityPages } from '@/lib/utility-pages';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date().toISOString().slice(0, 10);
  const guideRoutes = ['/guides', ...guidePages.map((guide) => `/guides/${guide.slug}`)];
  const staticRoutes = ['/about', '/privacy', '/terms', '/contact', '/timezone-converter'];
  const toolHubRoutes = ['/tools', '/tools/time', '/tools/json', '/tools/security', '/tools/encoding', '/tools/developer'];
  const seoHubRoutes = ['/ai-tools', '/network-tools', '/json-tools', '/time-tools', '/developer-tools'];
  const utilityRoutes = Object.keys(utilityPages);
  const promptRoutes = Object.keys(promptPages);
  const localizedGuideRoutes = ['/guides', ...guidePages.map((guide) => `/guides/${guide.slug}`)];
  const localizedRoutes = ['/', ...tools.map((tool) => tool.href), ...toolHubRoutes, ...localizedGuideRoutes];
  const routes = [
    ...allLanguageCodes.flatMap((locale) => localizedRoutes.map((route) => localizedPath(route, locale))),
    ...guideRoutes,
    ...staticRoutes,
    ...toolHubRoutes,
    ...seoHubRoutes,
    ...utilityRoutes,
    ...promptRoutes
  ];

  return Array.from(new Set(routes)).map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: today,
    changeFrequency: 'weekly',
    priority: route === '/' ? 1 : 0.8
  }));
}
