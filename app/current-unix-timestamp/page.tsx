import type { Metadata } from 'next';
import FAQSection from '@/components/FAQSection';
import JsonLd from '@/components/JsonLd';
import RelatedTools from '@/components/RelatedTools';
import TableOfContents from '@/components/TableOfContents';
import CurrentNowPanel from '@/components/CurrentNowPanel';
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildMetadata, buildWebApplicationJsonLd } from '@/lib/seo';

const faqItems = [
  { q: 'Is this value UTC-based?', a: 'Yes, Unix timestamp is UTC-based and timezone neutral.' },
  { q: 'How often does it refresh?', a: 'The display updates every second.' }
];

export const metadata: Metadata = buildMetadata({
  title: 'Current Unix Timestamp',
  description: 'Live Unix timestamp with seconds, milliseconds, UTC, local time, ISO 8601, and RFC 2822 output.',
  path: '/current-unix-timestamp'
});

export default function CurrentUnixTimestampPage() {
  return (
    <article>
      <JsonLd data={buildWebApplicationJsonLd({ name: 'Current Unix Timestamp', path: '/current-unix-timestamp', description: metadata.description as string })} />
      <JsonLd data={buildFaqJsonLd(faqItems)} />
      <JsonLd data={buildBreadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Current Unix Timestamp', path: '/current-unix-timestamp' }])} />

      <header className="card">
        <h1 className="text-3xl font-bold">Current Unix Timestamp</h1>
        <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">Live epoch values with multiple standardized date representations.</p>
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
        <TableOfContents items={[{ id: 'live', label: 'Live Timestamp Data' }, { id: 'faq', label: 'FAQ' }]} />
        <div className="space-y-6">
          <section id="live">
            <CurrentNowPanel />
          </section>
          <FAQSection items={faqItems} />
        </div>
      </div>

      <RelatedTools currentPath="/current-unix-timestamp" />
    </article>
  );
}