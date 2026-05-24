import type { Metadata } from 'next';
import CodeBlock from '@/components/CodeBlock';
import FAQSection from '@/components/FAQSection';
import JsonLd from '@/components/JsonLd';
import RelatedTools from '@/components/RelatedTools';
import TableOfContents from '@/components/TableOfContents';
import CurrentNowPanel from '@/components/CurrentNowPanel';
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildMetadata, buildWebApplicationJsonLd } from '@/lib/seo';

const faqItems = [
  { q: 'How often does milliseconds timestamp refresh?', a: 'Every second in this lightweight static-page implementation.' },
  { q: 'Can I use this for API testing?', a: 'Yes, copy the live value and use it in API payloads or query parameters.' }
];

export const metadata: Metadata = buildMetadata({
  title: 'Current Timestamp Milliseconds Converter',
  description: 'Get live millisecond timestamp values and convert to UTC and ISO in your browser.',
  path: '/current-timestamp-milliseconds'
});

export default function CurrentTimestampMillisecondsPage() {
  const jsCode = `// current timestamp in milliseconds\nconst ms = Date.now();\n\n// convert milliseconds to ISO\nconst iso = new Date(ms).toISOString();`;

  return (
    <article>
      <JsonLd data={buildWebApplicationJsonLd({ name: 'Current Timestamp Milliseconds', path: '/current-timestamp-milliseconds', description: metadata.description as string })} />
      <JsonLd data={buildFaqJsonLd(faqItems)} />
      <JsonLd data={buildBreadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Current Timestamp Milliseconds', path: '/current-timestamp-milliseconds' }])} />

      <header className="card">
        <h1 className="text-3xl font-bold">Current Timestamp Milliseconds</h1>
        <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">Live milliseconds timestamp, UTC conversion, ISO output, and JavaScript examples.</p>
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
        <TableOfContents items={[{ id: 'snapshot', label: 'Live Snapshot' }, { id: 'examples', label: 'JavaScript Examples' }, { id: 'faq', label: 'FAQ' }]} />
        <div className="space-y-6">
          <section id="snapshot">
            <CurrentNowPanel />
          </section>
          <section id="examples" className="card">
            <h2 className="text-xl font-semibold">JavaScript Examples</h2>
            <div className="mt-4">
              <CodeBlock title="JavaScript" language="js" code={jsCode} />
            </div>
          </section>
          <FAQSection items={faqItems} />
        </div>
      </div>

      <RelatedTools currentPath="/current-timestamp-milliseconds" />
    </article>
  );
}