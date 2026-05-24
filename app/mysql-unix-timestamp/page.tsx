import type { Metadata } from 'next';
import CodeBlock from '@/components/CodeBlock';
import FAQSection from '@/components/FAQSection';
import JsonLd from '@/components/JsonLd';
import RelatedTools from '@/components/RelatedTools';
import SEOSection from '@/components/SEOSection';
import TableOfContents from '@/components/TableOfContents';
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildMetadata, buildWebApplicationJsonLd } from '@/lib/seo';

const faqItems = [
  { q: 'What is UNIX_TIMESTAMP in MySQL?', a: 'It returns a Unix timestamp value, commonly in seconds, from a datetime expression or current time.' },
  { q: 'How do I convert Unix time back to date in MySQL?', a: 'Use FROM_UNIXTIME to produce a readable datetime representation.' }
];

export const metadata: Metadata = buildMetadata({
  title: 'MySQL Unix Timestamp Guide',
  description: 'Use UNIX_TIMESTAMP and FROM_UNIXTIME in MySQL with practical query examples.',
  path: '/mysql-unix-timestamp'
});

export default function MysqlUnixTimestampPage() {
  const sql = `-- current unix timestamp\nSELECT UNIX_TIMESTAMP();\n\n-- convert datetime to unix\nSELECT UNIX_TIMESTAMP('2026-05-24 12:00:00');\n\n-- convert unix to datetime\nSELECT FROM_UNIXTIME(1779595200);`;

  return (
    <article>
      <JsonLd data={buildWebApplicationJsonLd({ name: 'MySQL Unix Timestamp Guide', path: '/mysql-unix-timestamp', description: metadata.description as string })} />
      <JsonLd data={buildFaqJsonLd(faqItems)} />
      <JsonLd data={buildBreadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'MySQL Unix Timestamp', path: '/mysql-unix-timestamp' }])} />
      <header className="card"><h1 className="text-3xl font-bold">MySQL Unix Timestamp</h1><p className="mt-2 text-sm text-slate-700 dark:text-slate-300">Database-focused Unix timestamp conversions for MySQL query workflows.</p></header>
      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]"><TableOfContents items={[{ id: 'what', label: 'What is this tool?' }, { id: 'how', label: 'How to use it' }, { id: 'examples', label: 'Examples' }, { id: 'use-cases', label: 'Common use cases' }, { id: 'faq', label: 'FAQ' }]} /><div className="space-y-6">
        <SEOSection id="what" title="What is this tool?" content="This page explains MySQL timestamp conversion functions with practical SQL snippets that developers can copy into query editors." />
        <SEOSection id="how" title="How to use it" content="Use UNIX_TIMESTAMP for numeric output and FROM_UNIXTIME for readable output. Keep UTC strategy consistent across your application and database layers." />
        <section id="examples" className="card"><h2 className="text-xl font-semibold">Examples</h2><div className="mt-4"><CodeBlock title="MySQL" language="sql" code={sql} /></div></section>
        <section id="use-cases" className="card"><h2 className="text-xl font-semibold">Common use cases</h2><ul className="mt-3 list-disc pl-5 text-sm leading-7"><li>Building date filters for reports.</li><li>Converting audit logs for analysis.</li><li>Normalizing imported integration data.</li></ul></section>
        <FAQSection items={faqItems} />
      </div></div>
      <RelatedTools currentPath="/mysql-unix-timestamp" />
    </article>
  );
}
