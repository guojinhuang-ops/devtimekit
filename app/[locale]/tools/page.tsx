import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { getDictionary, localePrefix, locales, type Locale } from '@/lib/i18n';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const prefix = localePrefix(locale);
  return buildMetadata({
    title: 'Developer Tools Directory',
    description: 'Browse all DevTimeKit tools by category.',
    path: `${prefix}/tools`
  });
}

export default async function LocalizedToolsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dictionary = getDictionary(locale);
  const prefix = localePrefix(locale);

  return (
    <article className="card">
      <h1 className="text-3xl font-bold">{dictionary.ui.toolsByCategory}</h1>
      <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">Browse category hubs for structured developer workflows.</p>
      <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
        <li><Link href={`${prefix}/tools/time`} className="text-brand-700 hover:underline dark:text-brand-100">Time Tools</Link></li>
        <li><Link href={`${prefix}/tools/json`} className="text-brand-700 hover:underline dark:text-brand-100">JSON Tools</Link></li>
        <li><Link href={`${prefix}/tools/security`} className="text-brand-700 hover:underline dark:text-brand-100">Security Tools</Link></li>
        <li><Link href={`${prefix}/tools/encoding`} className="text-brand-700 hover:underline dark:text-brand-100">Encoding Tools</Link></li>
        <li><Link href={`${prefix}/tools/developer`} className="text-brand-700 hover:underline dark:text-brand-100">Developer Tools</Link></li>
      </ul>
    </article>
  );
}
