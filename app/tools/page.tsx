import type { Metadata } from 'next';
import Link from 'next/link';
import ToolCard from '@/components/ToolCard';
import JsonLd from '@/components/JsonLd';
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildMetadata, buildWebPageJsonLd } from '@/lib/seo';
import { tools } from '@/lib/tools';

const categories = [
  { slug: 'time', title: 'Time Tools', categories: ['Time'] },
  { slug: 'json', title: 'JSON Tools', categories: ['JSON', 'Developer'] },
  { slug: 'encoding', title: 'Encoding Tools', categories: ['Encoding'] },
  { slug: 'security', title: 'Security Tools', categories: ['Security', 'Hash'] },
  { slug: 'developer', title: 'Developer Tools', categories: ['Developer'] }
];

export const metadata: Metadata = buildMetadata({
  title: 'Developer Tools Directory - Time, JSON, Security, Encoding',
  description: 'Browse all DevTimeKit tools by category. Find timestamp, JSON, security, encoding, and developer utilities.',
  path: '/tools'
});

export default function ToolsHubPage() {
  const faq = [
    { q: 'What is DevTimeKit tools directory?', a: 'It is a categorized index of developer utilities for time, JSON, encoding, and security workflows.' },
    { q: 'How do I find the right tool quickly?', a: 'Use category pages and search to jump directly to the transformation or validation workflow you need.' },
    { q: 'Are these tools browser-based?', a: 'Most tools run in-browser and provide copy-ready output for debugging and documentation.' }
  ];

  return (
    <article className="space-y-8">
      <JsonLd data={buildWebPageJsonLd({ name: 'Developer Tools Directory', path: '/tools', description: 'Browse all DevTimeKit categories and utilities.' })} />
      <JsonLd data={buildFaqJsonLd(faq)} />
      <JsonLd data={buildBreadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Tools', path: '/tools' }])} />

      <header className="card">
        <h1 className="text-3xl font-bold">Developer Utility Hub</h1>
        <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
          Explore all DevTimeKit utilities by category. This hub is designed for fast discovery, deeper crawl paths, and developer workflows that move between formatting, validation, conversion, and security checks.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((item) => (
          <Link key={item.slug} href={`/tools/${item.slug}`} className="card transition hover:-translate-y-0.5">
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">View all {item.title.toLowerCase()} with examples, FAQs, and guides.</p>
          </Link>
        ))}
      </section>

      <section className="card">
        <h2 className="text-2xl font-semibold">Popular Tools</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tools.slice(0, 12).map((tool) => <ToolCard key={tool.href} tool={tool} />)}
        </div>
      </section>
    </article>
  );
}

