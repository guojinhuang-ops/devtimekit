import type { Metadata } from 'next';
import { BASE_URL, SITE_DESCRIPTION, SITE_NAME } from '@/lib/site';

const alternateLanguageCodes = ['zh', 'zh-TW', 'ja', 'es', 'vi', 'ko', 'ar', 'hi'];

export function absoluteUrl(path: string): string {
  return `${BASE_URL}${path}`;
}

export function buildMetadata({
  title,
  description,
  path,
  keywords = [],
  languages
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  languages?: Record<string, string>;
}): Metadata {
  const normalizedTitle =
    path !== '/' && !title.includes(' - ') ? `${title} - Online Developer Tool` : title;
  const normalizedDescription =
    description.length < 120
      ? `${description} Practical browser-based workflow for validation, conversion, and copy-ready developer output.`
      : description;
  const url = absoluteUrl(path);
  const defaultLanguages =
    languages ??
    alternateLanguageCodes.reduce<Record<string, string>>(
      (acc, locale) => {
        acc[locale] = absoluteUrl(`/${locale}${path === '/' ? '' : path}`);
        return acc;
      },
      {
        en: absoluteUrl(path),
        'x-default': absoluteUrl(path)
      }
    );

  return {
    title: normalizedTitle,
    description: normalizedDescription,
    keywords,
    alternates: {
      canonical: url,
      languages: defaultLanguages
    },
    openGraph: {
      title: normalizedTitle,
      description: normalizedDescription,
      url,
      siteName: SITE_NAME,
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: normalizedTitle,
      description: normalizedDescription
    }
  };
}

export function buildSoftwareApplicationJsonLd({
  name,
  path,
  description
}: {
  name: string;
  path: string;
  description: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    url: absoluteUrl(path),
    isAccessibleForFree: true,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  };
}

export const buildWebApplicationJsonLd = buildSoftwareApplicationJsonLd;

export function buildWebPageJsonLd({
  name,
  path,
  description,
  inLanguage
}: {
  name: string;
  path: string;
  description: string;
  inLanguage?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url: absoluteUrl(path),
    inLanguage: inLanguage ?? 'en'
  };
}

export function buildFaqJsonLd(items: Array<{ q: string; a: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a
      }
    }))
  };
}

export function buildBreadcrumbJsonLd(
  items: Array<{ name: string; path: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  };
}

export const defaultSiteMeta = {
  title: `${SITE_NAME} | Unix Timestamp Converter & Epoch Tools`,
  description: SITE_DESCRIPTION
};
