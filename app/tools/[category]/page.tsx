import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import FAQSection from '@/components/FAQSection';
import ToolCard from '@/components/ToolCard';
import JsonLd from '@/components/JsonLd';
import { guidePages } from '@/lib/guides';
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildMetadata, buildWebPageJsonLd } from '@/lib/seo';
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
  return Object.keys(categoryMap).map((category) => ({ category }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const info = categoryMap[category as CategoryKey];
  if (!info) return {};
  return buildMetadata({
    title: `${info.title} - Online Developer Utility Collection`,
    description: `Explore ${info.title.toLowerCase()} with examples, FAQs, related guides, and practical workflows.`,
    path: `/tools/${category}`
  });
}

export default async function ToolCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const info = categoryMap[category as CategoryKey];
  if (!info) notFound();

  const categoryTools = tools.filter((tool) => info.categories.includes((tool.category ?? '') as never));
  const relatedGuides = guidePages.filter((guide) => {
    if (category === 'time') return guide.category.includes('Time');
    if (category === 'json') return guide.category.includes('JSON');
    if (category === 'security') return guide.category.includes('Security') || guide.slug.includes('md5') || guide.slug.includes('sha');
    if (category === 'encoding') return guide.category.includes('Encoding') || guide.slug.includes('base64');
    return guide.category.includes('Developer');
  });

  const faq = [
    { q: `What are ${info.title}?`, a: `${info.title} are focused utilities for common developer transformations and validations.` },
    { q: `Which ${info.title.toLowerCase()} are most used?`, a: categoryTools.slice(0, 3).map((tool) => tool.title).join(', ') },
    { q: 'How should I choose a tool?', a: 'Start with your input format and output goal, then pick conversion, validation, or formatting tools accordingly.' },
    { q: 'Can these tools help API debugging?', a: 'Yes. They are built for practical workflows across API payloads, logs, config, and data checks.' },
    { q: 'Are outputs copy-ready?', a: 'Yes. Most tools provide direct copy actions for quick use in code and docs.' }
  ];

  return (
    <article className="space-y-8">
      <JsonLd data={buildWebPageJsonLd({ name: info.title, path: `/tools/${category}`, description: `Category page for ${info.title.toLowerCase()}.` })} />
      <JsonLd data={buildFaqJsonLd(faq)} />
      <JsonLd data={buildBreadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Tools', path: '/tools' }, { name: info.title, path: `/tools/${category}` }])} />

      <header className="card">
        <h1 className="text-3xl font-bold">{info.title}</h1>
        <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
          This category groups related utilities into one workflow-oriented index. Use it to discover the right tool quickly, reduce context switching, and move from conversion to validation with stronger internal linking.
        </p>
      </header>

      <section className="card">
        <h2 className="text-2xl font-semibold">Tool Grid</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categoryTools.map((tool) => <ToolCard key={tool.href} tool={tool} />)}
        </div>
      </section>

      <section className="card space-y-4">
        <h2 className="text-2xl font-semibold">Common Workflows</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700 dark:text-slate-300">
          <li>Validate incoming payloads before conversion.</li>
          <li>Transform to target format required by APIs or storage.</li>
          <li>Compare, debug, and document output for team handoff.</li>
        </ul>
      </section>

      <section className="card">
        <h2 className="text-2xl font-semibold">Related Guides</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {relatedGuides.map((guide) => (
            <li key={guide.slug}>
              <Link href={`/guides/${guide.slug}`} className="text-brand-700 hover:underline dark:text-brand-100">{guide.title}</Link>
            </li>
          ))}
        </ul>
      </section>

      <FAQSection items={faq} />
    </article>
  );
}

