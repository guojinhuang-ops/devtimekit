import type { Metadata } from 'next';
import Link from 'next/link';
import { guidePages } from '@/lib/guides';
import { buildMetadata } from '@/lib/seo';
import { localePrefix, locales, type Locale } from '@/lib/i18n';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const prefix = localePrefix(locale);
  return buildMetadata({ title: 'Developer Guides', description: 'Browse developer guides and best practices.', path: `${prefix}/guides` });
}

export default async function LocalizedGuidesPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const prefix = localePrefix(locale);
  return (
    <article className="card">
      <h1 className="text-3xl font-bold">Guides</h1>
      <ul className="mt-4 space-y-2 text-sm">
        {guidePages.map((guide) => (
          <li key={guide.slug}><Link href={`${prefix}/guides/${guide.slug}`} className="text-brand-700 hover:underline dark:text-brand-100">{guide.title}</Link></li>
        ))}
      </ul>
    </article>
  );
}
