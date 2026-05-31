import Link from 'next/link';
import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import FAQSection from '@/components/FAQSection';
import JsonLd from '@/components/JsonLd';
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildMetadata,
  buildSoftwareApplicationJsonLd,
  buildWebPageJsonLd
} from '@/lib/seo';

type HubLink = { href: string; label: string; description: string };

export function buildHubMetadata(title: string, description: string, path: string, keywords: string[]): Metadata {
  return buildMetadata({ title, description, path, keywords });
}

export default function ToolHubPage({
  title,
  description,
  path,
  links
}: {
  title: string;
  description: string;
  path: string;
  links: HubLink[];
}) {
  const faq = [
    { q: `What is included in ${title}?`, a: `This hub links related ${title.toLowerCase()} with examples and practical developer workflows.` },
    { q: 'Are these tools free?', a: 'Yes. DevTimeKit tools are free browser-based utilities.' },
    { q: 'Do I need an account?', a: 'No account is required for core tool usage.' }
  ];

  return (
    <article>
      <JsonLd data={buildSoftwareApplicationJsonLd({ name: title, path, description })} />
      <JsonLd data={buildWebPageJsonLd({ name: title, path, description })} />
      <JsonLd data={buildFaqJsonLd(faq)} />
      <JsonLd data={buildBreadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: title, path }])} />
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: title, href: path }]} />
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-normal">{title}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700 dark:text-slate-300">{description}</p>
      </header>
      <section className="card">
        <h2 className="text-2xl font-semibold">All Tools</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {links.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-lg border border-slate-200 p-4 hover:border-brand-400 dark:border-slate-800">
              <h3 className="text-base font-semibold">{item.label}</h3>
              <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">{item.description}</p>
            </Link>
          ))}
        </div>
      </section>
      <FAQSection items={faq} />
    </article>
  );
}

