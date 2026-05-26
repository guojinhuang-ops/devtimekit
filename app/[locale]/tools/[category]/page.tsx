import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { buildMetadata } from '@/lib/seo';
import { localePrefix, locales, type Locale } from '@/lib/i18n';
import { tools } from '@/lib/tools';

const categoryMap = {
  time: { title: 'Time Tools', categories: ['Time'] },
  json: { title: 'JSON Tools', categories: ['JSON', 'Developer'] },
  security: { title: 'Security Tools', categories: ['Security', 'Hash'] },
  encoding: { title: 'Encoding Tools', categories: ['Encoding'] },
  developer: { title: 'Developer Tools', categories: ['Developer'] }
} as const;

type CategoryKey = keyof typeof categoryMap;

export function generateStaticParams() {
  return locales.flatMap((locale) => Object.keys(categoryMap).map((category) => ({ locale, category })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale; category: string }> }): Promise<Metadata> {
  const { locale, category } = await params;
  const prefix = localePrefix(locale);
  const info = categoryMap[category as CategoryKey];
  if (!info) return {};
  return buildMetadata({ title: info.title, description: `Browse ${info.title.toLowerCase()} category.`, path: `${prefix}/tools/${category}` });
}

export default async function LocalizedCategoryPage({ params }: { params: Promise<{ locale: Locale; category: string }> }) {
  const { locale, category } = await params;
  const prefix = localePrefix(locale);
  const info = categoryMap[category as CategoryKey];
  if (!info) notFound();
  const categoryTools = tools.filter((tool) => info.categories.includes((tool.category ?? '') as never));

  return (
    <article className="card">
      <h1 className="text-3xl font-bold">{info.title}</h1>
      <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
        {categoryTools.map((tool) => (
          <li key={tool.href}><Link href={`${prefix}${tool.href}`} className="text-brand-700 hover:underline dark:text-brand-100">{tool.title}</Link></li>
        ))}
      </ul>
    </article>
  );
}
